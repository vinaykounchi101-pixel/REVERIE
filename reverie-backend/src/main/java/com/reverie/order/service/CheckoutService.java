package com.reverie.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reverie.cart.entity.Cart;
import com.reverie.cart.entity.CartItem;
import com.reverie.cart.repository.CartItemRepository;
import com.reverie.cart.repository.CartRepository;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.inventory.service.InventoryService;
import com.reverie.order.dto.*;
import com.reverie.order.entity.*;
import com.reverie.order.repository.CheckoutSessionRepository;
import com.reverie.order.repository.OrderItemRepository;
import com.reverie.order.repository.OrderRepository;
import com.reverie.order.repository.OrderStatusHistoryRepository;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CheckoutService {

    private final CheckoutSessionRepository checkoutSessionRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderStatusHistoryRepository orderStatusHistoryRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final InventoryService inventoryService;
    private final ObjectMapper objectMapper;

    public CheckoutService(
            CheckoutSessionRepository checkoutSessionRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            OrderStatusHistoryRepository orderStatusHistoryRepository,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            UserRepository userRepository,
            InventoryService inventoryService,
            ObjectMapper objectMapper) {
        this.checkoutSessionRepository = checkoutSessionRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderStatusHistoryRepository = orderStatusHistoryRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.inventoryService = inventoryService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public CheckoutSessionDto createCheckoutSession(UUID userId, CreateCheckoutSessionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.VALIDATION_ERROR, "Shopping bag is empty"));

        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());
        if (items.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Shopping bag is empty");
        }

        // Reserve stock atomically for each line item
        for (CartItem item : items) {
            inventoryService.reserveStock(
                    item.getVariant().getId(),
                    item.getQuantity(),
                    "CHECKOUT_SESSION_RESERVATION",
                    userId
            );
        }

        CheckoutSession session = new CheckoutSession();
        session.setUser(user);
        session.setSource(request.getSource() != null ? request.getSource() : "CART");
        session.setStatus("ACTIVE");
        session.setCouponCode(request.getCouponCode());
        session.setWalletAmountPaise(request.getWalletAmountPaise() != null ? request.getWalletAmountPaise() : 0L);
        session.setExpiresAt(Instant.now().plus(15, ChronoUnit.MINUTES));

        try {
            if (request.getShippingAddress() != null) {
                session.setAddressSnapshotJson(objectMapper.writeValueAsString(request.getShippingAddress()));
            }

            long subtotal = 0L;
            List<CheckoutLineSnapshot> lineSnapshots = new ArrayList<>();
            for (CartItem item : items) {
                ProductVariant v = item.getVariant();
                long unitPrice = v.getSalePricePaise() != null ? v.getSalePricePaise() : v.getPricePaise();
                long lineTotal = unitPrice * item.getQuantity();
                subtotal += lineTotal;

                lineSnapshots.add(new CheckoutLineSnapshot(
                        v.getId(),
                        v.getSku(),
                        v.getName(),
                        item.getQuantity(),
                        unitPrice,
                        lineTotal
                ));
            }

            long tax = Math.round(subtotal * 0.18);
            long shipping = 0L;
            long total = subtotal + tax + shipping - session.getWalletAmountPaise();

            session.setLineSnapshotJson(objectMapper.writeValueAsString(lineSnapshots));
            session.setTotalsSnapshotJson(objectMapper.writeValueAsString(new TotalsSnapshot(subtotal, tax, shipping, total)));
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_ERROR, "Failed to serialize checkout snapshots: " + e.getMessage());
        }

        session = checkoutSessionRepository.save(session);
        return CheckoutSessionDto.fromEntity(session);
    }

    @Transactional
    public OrderDto createOrder(UUID userId, CreateOrderRequest request) {
        CheckoutSession session = checkoutSessionRepository.findByIdAndUserId(request.getCheckoutSessionId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Checkout session not found"));

        if (!"ACTIVE".equalsIgnoreCase(session.getStatus()) || session.isExpired()) {
            throw new BusinessException(ErrorCode.CHECKOUT_EXPIRED, "Checkout session is expired or inactive");
        }

        User user = session.getUser();
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.VALIDATION_ERROR, "Shopping bag is empty"));

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        if (cartItems.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "No items to order in shopping bag");
        }

        long subtotal = 0L;
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = new Order();
        String orderNumber = "REV-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        order.setOrderNumber(orderNumber);
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setIdempotencyKey(request.getIdempotencyKey());

        try {
            if (request.getShippingAddress() != null) {
                order.setAddressSnapshotJson(objectMapper.writeValueAsString(request.getShippingAddress()));
            } else if (session.getAddressSnapshotJson() != null) {
                order.setAddressSnapshotJson(session.getAddressSnapshotJson());
            } else {
                throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Shipping address is required");
            }
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_ERROR, "Address formatting error: " + e.getMessage());
        }

        for (CartItem item : cartItems) {
            ProductVariant v = item.getVariant();
            long unitPrice = v.getSalePricePaise() != null ? v.getSalePricePaise() : v.getPricePaise();
            long lineSubtotal = unitPrice * item.getQuantity();
            subtotal += lineSubtotal;

            long itemTax = Math.round(lineSubtotal * 0.18);
            OrderItem orderItem = new OrderItem(
                    order,
                    v,
                    v.getSku(),
                    v.getProduct() != null ? v.getProduct().getName() + " - " + v.getName() : v.getName(),
                    v.getDialColor() + " / " + v.getStrapType(),
                    item.getQuantity(),
                    unitPrice,
                    0L,
                    itemTax,
                    "9102"
            );
            orderItems.add(orderItem);
        }

        long tax = Math.round(subtotal * 0.18);
        long cgst = tax / 2;
        long sgst = tax - cgst;
        long total = subtotal + tax;

        order.setSubtotalPaise(subtotal);
        order.setTaxPaise(tax);
        order.setCgstPaise(cgst);
        order.setSgstPaise(sgst);
        order.setIgstPaise(0L);
        order.setShippingPaise(0L);
        order.setTotalPaise(total);
        order.setPayablePaise(total);
        order.setHighValueFlag(total >= 20000000L); // >= ₹2,00,000 threshold

        order = orderRepository.save(order);

        for (OrderItem oi : orderItems) {
            oi.setOrder(order);
            orderItemRepository.save(oi);
        }
        order.setItems(orderItems);

        // Record initial status in history
        OrderStatusHistory history = new OrderStatusHistory(order, null, OrderStatus.PENDING_PAYMENT.name(), "Order created from checkout session");
        orderStatusHistoryRepository.save(history);

        // Mark checkout session as completed
        session.setStatus("COMPLETED");
        checkoutSessionRepository.save(session);

        // Clear cart
        cartItemRepository.deleteByCartId(cart.getId());

        List<OrderItemDto> itemDtos = orderItems.stream().map(OrderItemDto::fromEntity).collect(Collectors.toList());
        List<OrderStatusHistoryDto> historyDtos = List.of(OrderStatusHistoryDto.fromEntity(history));

        return OrderDto.fromEntity(order, itemDtos, historyDtos);
    }

    public static class CheckoutLineSnapshot {
        public UUID variantId;
        public String sku;
        public String variantName;
        public Integer quantity;
        public Long unitPricePaise;
        public Long lineTotalPaise;

        public CheckoutLineSnapshot() {}

        public CheckoutLineSnapshot(UUID variantId, String sku, String variantName, Integer quantity, Long unitPricePaise, Long lineTotalPaise) {
            this.variantId = variantId;
            this.sku = sku;
            this.variantName = variantName;
            this.quantity = quantity;
            this.unitPricePaise = unitPricePaise;
            this.lineTotalPaise = lineTotalPaise;
        }
    }

    private static class TotalsSnapshot {
        public long subtotalPaise;
        public long taxPaise;
        public long shippingPaise;
        public long totalPaise;

        public TotalsSnapshot(long subtotalPaise, long taxPaise, long shippingPaise, long totalPaise) {
            this.subtotalPaise = subtotalPaise;
            this.taxPaise = taxPaise;
            this.shippingPaise = shippingPaise;
            this.totalPaise = totalPaise;
        }
    }
}
