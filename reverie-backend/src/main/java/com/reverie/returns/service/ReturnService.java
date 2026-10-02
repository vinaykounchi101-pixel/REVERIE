package com.reverie.returns.service;

import com.reverie.audit.service.AuditService;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.service.InventoryService;
import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderItem;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.repository.OrderItemRepository;
import com.reverie.order.repository.OrderRepository;
import com.reverie.order.service.OrderService;
import com.reverie.payment.entity.Payment;
import com.reverie.payment.repository.PaymentRepository;
import com.reverie.returns.dto.CreateReturnRequestDto;
import com.reverie.returns.dto.ProcessReturnDecisionDto;
import com.reverie.returns.dto.RefundDto;
import com.reverie.returns.dto.ReturnRequestDto;
import com.reverie.returns.entity.Refund;
import com.reverie.returns.entity.ReturnRequest;
import com.reverie.returns.entity.ReturnStatus;
import com.reverie.returns.repository.RefundRepository;
import com.reverie.returns.repository.ReturnRequestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ReturnService {

    private final ReturnRequestRepository returnRequestRepository;
    private final RefundRepository refundRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;
    private final OrderService orderService;
    private final InventoryService inventoryService;
    private final WalletService walletService;
    private final AuditService auditService;

    public ReturnService(
            ReturnRequestRepository returnRequestRepository,
            RefundRepository refundRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            PaymentRepository paymentRepository,
            OrderService orderService,
            InventoryService inventoryService,
            WalletService walletService,
            AuditService auditService) {
        this.returnRequestRepository = returnRequestRepository;
        this.refundRepository = refundRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.paymentRepository = paymentRepository;
        this.orderService = orderService;
        this.inventoryService = inventoryService;
        this.walletService = walletService;
        this.auditService = auditService;
    }

    @Transactional
    public ReturnRequestDto requestReturn(UUID userId, CreateReturnRequestDto request) {
        Order order = orderRepository.findByIdAndUserId(request.getOrderId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));

        if (order.getStatus() != OrderStatus.DELIVERED) {
            throw new BusinessException(ErrorCode.ORDER_INVALID_STATE, "Returns are only permissible for DELIVERED orders. Current status: " + order.getStatus());
        }

        ReturnRequest returnRequest = new ReturnRequest(order, request.getReasonCode(), request.getNotes());
        returnRequest = returnRequestRepository.save(returnRequest);

        auditService.logAction("CUSTOMER", userId, "RETURN_REQUEST", "ORDER", order.getId(), "SUCCESS", "127.0.0.1", "Reason: " + request.getReasonCode());

        return ReturnRequestDto.fromEntity(returnRequest);
    }

    @Transactional
    public ReturnRequestDto processReturnDecision(UUID returnRequestId, ProcessReturnDecisionDto decision, UUID adminId) {
        ReturnRequest returnRequest = returnRequestRepository.findById(returnRequestId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Return request not found"));

        returnRequest.setStatus(decision.getStatus());
        returnRequest.setDecidedBy(adminId);
        returnRequest.setDecisionNote(decision.getDecisionNote());
        returnRequest = returnRequestRepository.save(returnRequest);

        Order order = returnRequest.getOrder();

        if (decision.getStatus() == ReturnStatus.APPROVED) {
            // Find captured payment
            Payment payment = paymentRepository.findTopByOrderIdOrderByCreatedAtDesc(order.getId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND, "Payment record not found for refund"));

            String idempKey = "REFUND_" + returnRequest.getId() + "_" + System.currentTimeMillis();
            Refund refund = new Refund(
                    payment,
                    order,
                    null,
                    order.getTotalPaise(),
                    decision.getRefundDestination(),
                    "COMPLETED",
                    adminId,
                    idempKey
            );
            refundRepository.save(refund);

            // If destination is WALLET, credit wallet
            if ("WALLET".equalsIgnoreCase(decision.getRefundDestination())) {
                walletService.creditWallet(
                        order.getUser().getId(),
                        order.getTotalPaise(),
                        "REFUND",
                        returnRequest.getId(),
                        "Refund for return of order " + order.getOrderNumber()
                );
            }

            // Restock variants
            List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
            for (OrderItem item : items) {
                if (item.getVariant() != null) {
                    inventoryService.adjustStock(new StockAdjustmentRequest(
                            item.getVariant().getId(),
                            item.getQuantity(),
                            MovementType.RESTOCK,
                            "Approved return restock (Return #" + returnRequest.getId() + ")"
                    ), adminId);
                }
            }

            // Update order status to REFUNDED
            orderService.updateOrderStatus(order.getId(), OrderStatus.REFUNDED, "Return approved and full refund processed");

            auditService.logAction("ADMIN", adminId, "RETURN_APPROVED", "RETURN_REQUEST", returnRequest.getId(), "SUCCESS", "127.0.0.1", "Refunded paise: " + order.getTotalPaise());
        } else {
            auditService.logAction("ADMIN", adminId, "RETURN_REJECTED", "RETURN_REQUEST", returnRequest.getId(), "REJECTED", "127.0.0.1", decision.getDecisionNote());
        }

        return ReturnRequestDto.fromEntity(returnRequest);
    }

    @Transactional(readOnly = true)
    public List<ReturnRequestDto> getReturnsForOrder(UUID orderId, UUID userId) {
        orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));

        return returnRequestRepository.findByOrderId(orderId).stream()
                .map(ReturnRequestDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public Page<ReturnRequestDto> getAllReturnsAdmin(ReturnStatus status, Pageable pageable) {
        if (status != null) {
            return returnRequestRepository.findByStatus(status, pageable).map(ReturnRequestDto::fromEntity);
        }
        return returnRequestRepository.findAll(pageable).map(ReturnRequestDto::fromEntity);
    }
}
