package com.reverie.payment.service;

import com.reverie.audit.service.AuditService;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.inventory.service.InventoryService;
import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderItem;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.entity.OrderStatusHistory;
import com.reverie.order.repository.OrderItemRepository;
import com.reverie.order.repository.OrderRepository;
import com.reverie.order.repository.OrderStatusHistoryRepository;
import com.reverie.payment.dto.*;
import com.reverie.payment.entity.*;
import com.reverie.payment.provider.*;
import com.reverie.payment.repository.PaymentRepository;
import com.reverie.payment.repository.PaymentTransactionRepository;
import com.reverie.payment.repository.WebhookEventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final WebhookEventRepository webhookEventRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderStatusHistoryRepository orderStatusHistoryRepository;
    private final InventoryService inventoryService;
    private final AuditService auditService;
    private final com.reverie.auth.service.EmailService emailService;
    private final Map<PaymentProviderType, PaymentProvider> providers;

    public PaymentService(
            PaymentRepository paymentRepository,
            PaymentTransactionRepository paymentTransactionRepository,
            WebhookEventRepository webhookEventRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            OrderStatusHistoryRepository orderStatusHistoryRepository,
            InventoryService inventoryService,
            AuditService auditService,
            com.reverie.auth.service.EmailService emailService,
            List<PaymentProvider> paymentProviderList) {
        this.paymentRepository = paymentRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.webhookEventRepository = webhookEventRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderStatusHistoryRepository = orderStatusHistoryRepository;
        this.inventoryService = inventoryService;
        this.auditService = auditService;
        this.emailService = emailService;
        this.providers = paymentProviderList.stream()
                .collect(Collectors.toMap(PaymentProvider::getProviderType, p -> p));
    }

    @Transactional
    public InitiatePaymentResponse initiatePayment(UUID orderId, UUID userId, InitiatePaymentRequest request) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));

        if (order.getStatus() != OrderStatus.PENDING_PAYMENT) {
            throw new BusinessException(ErrorCode.ORDER_INVALID_STATE, "Order is not in payable state. Current status: " + order.getStatus());
        }

        PaymentProviderType providerType = request.getProvider() != null ? request.getProvider() : PaymentProviderType.MOCK;
        PaymentProvider provider = providers.get(providerType);
        if (provider == null) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Payment provider not supported: " + providerType);
        }

        int attemptNo = paymentRepository.findByOrderId(order.getId()).size() + 1;
        Payment payment = new Payment(order, providerType, order.getPayablePaise(), attemptNo);
        payment = paymentRepository.save(payment);

        PaymentInitiationResult result = provider.initiatePayment(order, payment);
        payment.setProviderRef(result.getProviderRef());
        payment = paymentRepository.save(payment);

        auditService.logAction("CUSTOMER", userId, "PAYMENT_INITIATE", "PAYMENT", payment.getId(), "SUCCESS", "127.0.0.1", null);

        return new InitiatePaymentResponse(
                payment.getId(),
                order.getId(),
                payment.getProvider(),
                payment.getProviderRef(),
                payment.getAmountPaise(),
                order.getCurrency(),
                result.getClientPayload()
        );
    }

    @Transactional
    public PaymentDto verifyAndCapturePayment(UUID paymentId, UUID userId, PaymentVerificationRequest request) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Payment record not found"));

        Order order = payment.getOrder();
        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Access denied to verify payment");
        }

        if (payment.getStatus() == PaymentStatus.CAPTURED) {
            return PaymentDto.fromEntity(payment);
        }

        PaymentProvider provider = providers.get(payment.getProvider());
        if (provider == null) {
            throw new BusinessException(ErrorCode.INTERNAL_ERROR, "Payment provider bean not found");
        }

        PaymentVerificationResult result = provider.verifyPayment(payment, request.getPayload());

        if (result.isSuccessful()) {
            payment.setStatus(PaymentStatus.CAPTURED);
            payment.setMethod("GATEWAY_CAPTURE");
            payment = paymentRepository.save(payment);

            PaymentTransaction tx = new PaymentTransaction(
                    payment,
                    "CAPTURE",
                    "SUCCESS",
                    result.getProviderTransactionId(),
                    payment.getAmountPaise(),
                    "Payment successfully authorized and captured"
            );
            paymentTransactionRepository.save(tx);

            // Update order status to PROCESSING
            order.setStatus(OrderStatus.PROCESSING);
            orderRepository.save(order);

            OrderStatusHistory history = new OrderStatusHistory(
                    order,
                    OrderStatus.PENDING_PAYMENT.name(),
                    OrderStatus.PROCESSING.name(),
                    "Payment captured successfully via " + payment.getProvider().name() + " (Txn: " + result.getProviderTransactionId() + ")"
            );
            orderStatusHistoryRepository.save(history);

            // Atomically COMMIT reserved inventory stock units
            List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
            for (OrderItem item : items) {
                if (item.getVariant() != null) {
                    inventoryService.commitSale(
                            item.getVariant().getId(),
                            item.getQuantity(),
                            "ORDER_PAID_COMMIT (" + order.getOrderNumber() + ")",
                            userId
                    );
                }
            }

            // Transmit official Order Invoice & Consignment Receipt Email
            try {
                if (order.getUser() != null && order.getUser().getEmail() != null) {
                    List<Map<String, Object>> itemMaps = items.stream().map(it -> {
                        Map<String, Object> map = new java.util.HashMap<>();
                        map.put("name", it.getNameSnapshot() != null ? it.getNameSnapshot() : "Haute Horlogerie Timepiece");
                        map.put("sku", it.getSku() != null ? it.getSku() : "R01-CALIBRE");
                        map.put("quantity", it.getQuantity());
                        map.put("unitPricePaise", it.getUnitPricePaise());
                        return map;
                    }).collect(Collectors.toList());

                    emailService.sendOrderInvoiceEmail(
                            order.getUser().getEmail(),
                            order.getUser().getFirstName(),
                            order.getOrderNumber(),
                            order.getPayablePaise(),
                            order.getCurrency() != null ? order.getCurrency() : "USD",
                            payment.getProvider() != null ? payment.getProvider().name() : "GATEWAY",
                            order.getAddressSnapshotJson() != null ? "Insured Vault Handover" : "Primary Residence",
                            itemMaps
                    );
                }
            } catch (Exception ex) {
                // Log and proceed without blocking capture
            }

            auditService.logAction("CUSTOMER", userId, "PAYMENT_CAPTURE", "ORDER", order.getId(), "SUCCESS", "127.0.0.1", null);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setFailureReason(result.getFailureMessage());
            payment = paymentRepository.save(payment);

            PaymentTransaction tx = new PaymentTransaction(
                    payment,
                    "CAPTURE",
                    "FAILED",
                    null,
                    payment.getAmountPaise(),
                    result.getFailureMessage()
            );
            paymentTransactionRepository.save(tx);

            auditService.logAction("CUSTOMER", userId, "PAYMENT_FAILED", "PAYMENT", payment.getId(), "FAILED", "127.0.0.1", result.getFailureMessage());
        }

        return PaymentDto.fromEntity(payment);
    }

    @Transactional
    public boolean processWebhook(String providerStr, String eventId, String eventType, String payloadJson, String signatureHeader) {
        PaymentProviderType providerType;
        try {
            providerType = PaymentProviderType.valueOf(providerStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            return false;
        }

        // 1. Webhook Idempotency Check: Prevent duplicate processing of replays
        if (webhookEventRepository.existsByProviderAndEventId(providerType.name(), eventId)) {
            return true; // Already processed idempotently
        }

        PaymentProvider provider = providers.get(providerType);
        if (provider == null || !provider.verifyWebhookSignature(payloadJson, signatureHeader, null)) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Invalid webhook signature");
        }

        WebhookEvent event = new WebhookEvent(providerType.name(), eventId, eventType, payloadJson);
        event = webhookEventRepository.save(event);

        try {
            event.setStatus("PROCESSED");
            event.setProcessedAt(Instant.now());
            webhookEventRepository.save(event);
            return true;
        } catch (Exception e) {
            event.setStatus("FAILED");
            webhookEventRepository.save(event);
            return false;
        }
    }

    @Transactional(readOnly = true)
    public PaymentDto getPaymentById(UUID paymentId, UUID userId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Payment record not found"));

        if (!payment.getOrder().getUser().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Access denied to payment details");
        }

        return PaymentDto.fromEntity(payment);
    }
}
