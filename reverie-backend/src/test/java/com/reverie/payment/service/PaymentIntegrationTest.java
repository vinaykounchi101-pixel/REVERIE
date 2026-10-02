package com.reverie.payment.service;

import com.reverie.cart.dto.AddToCartRequest;
import com.reverie.cart.service.CartService;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.catalog.repository.ProductVariantRepository;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.Inventory;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.repository.InventoryMovementRepository;
import com.reverie.inventory.repository.InventoryRepository;
import com.reverie.inventory.service.InventoryService;
import com.reverie.order.dto.AddressDto;
import com.reverie.order.dto.CreateCheckoutSessionRequest;
import com.reverie.order.dto.CreateOrderRequest;
import com.reverie.order.dto.OrderDto;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.repository.CheckoutSessionRepository;
import com.reverie.order.repository.OrderItemRepository;
import com.reverie.order.repository.OrderRepository;
import com.reverie.order.repository.OrderStatusHistoryRepository;
import com.reverie.order.service.CheckoutService;
import com.reverie.order.service.OrderService;
import com.reverie.payment.dto.*;
import com.reverie.payment.entity.*;
import com.reverie.payment.repository.PaymentRepository;
import com.reverie.payment.repository.PaymentTransactionRepository;
import com.reverie.payment.repository.WebhookEventRepository;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class PaymentIntegrationTest {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InventoryMovementRepository movementRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository variantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderStatusHistoryRepository statusHistoryRepository;

    @Autowired
    private CheckoutSessionRepository checkoutSessionRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    private WebhookEventRepository webhookEventRepository;

    private User testUser;
    private ProductVariant testVariant;
    private OrderDto testOrder;

    @Autowired
    private com.reverie.testutil.TestDataCleaner testDataCleaner;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        testUser = new User();
        testUser.setEmail("collector.vip@reverie.app");
        testUser.setPasswordHash("hashed_secret");
        testUser.setFirstName("VIP");
        testUser.setLastName("Horologist");
        testUser.setRole(Role.CUSTOMER);
        testUser.setVerified(true);
        testUser = userRepository.save(testUser);

        Product product = new Product();
        product.setName("Astronomical Minute Repeater");
        product.setSlug("astronomical-minute-repeater");
        product.setReferenceNumber("AMR-500");
        product.setGender("Unisex");
        product.setBasePricePaise(120000000L); // ₹12,00,000
        product.setStatus(ProductStatus.PUBLISHED);

        ProductVariant variant = new ProductVariant(product, "AMR-500-WHITEGOLD", "White Gold Edition", "Meteorite Dial", "Hand-stitched Leather", 120000000L, null);
        product.setVariants(List.of(variant));
        product = productRepository.save(product);
        testVariant = product.getVariants().get(0);

        // Stock available: 2 units
        inventoryService.adjustStock(new StockAdjustmentRequest(testVariant.getId(), 2, MovementType.RESTOCK, "Initial restock"), testUser.getId());

        // Place Order via Checkout Flow
        cartService.addItem(testUser.getId(), null, new AddToCartRequest(testVariant.getId(), 1, "Leather"));
        CreateCheckoutSessionRequest checkoutReq = new CreateCheckoutSessionRequest();
        AddressDto address = new AddressDto("VIP Horologist", "9999988888", "10 Marine Drive", null, "Mumbai", "Maharashtra", "400020", "India");
        checkoutReq.setShippingAddress(address);
        var session = checkoutService.createCheckoutSession(testUser.getId(), checkoutReq);

        testOrder = checkoutService.createOrder(testUser.getId(), new CreateOrderRequest(session.getId(), address, "IDEMP_ORD_AMR"));
    }

    @Test
    void shouldInitiateVerifyAndCommitStockOnPaymentCapture() {
        // 1. Initiate Payment
        InitiatePaymentRequest initReq = new InitiatePaymentRequest(testOrder.getId(), PaymentProviderType.MOCK);
        InitiatePaymentResponse initRes = paymentService.initiatePayment(testOrder.getId(), testUser.getId(), initReq);

        assertNotNull(initRes.getPaymentId());
        assertEquals(PaymentProviderType.MOCK, initRes.getProvider());
        assertNotNull(initRes.getProviderRef());

        // 2. Verify and Capture Payment
        PaymentVerificationRequest verifyReq = new PaymentVerificationRequest(initRes.getPaymentId(), Map.of("action", "SUCCESS"));
        PaymentDto paymentDto = paymentService.verifyAndCapturePayment(initRes.getPaymentId(), testUser.getId(), verifyReq);

        assertEquals(PaymentStatus.CAPTURED, paymentDto.getStatus());

        // 3. Verify Order status transitioned to PROCESSING
        OrderDto orderDto = orderService.getOrderById(testOrder.getId(), testUser.getId());
        assertEquals(OrderStatus.PROCESSING, orderDto.getStatus());

        // 4. Verify Inventory stock units transitioned to COMMITTED (available=1, reserved=0, sold=1)
        Inventory inventory = inventoryRepository.findByVariantId(testVariant.getId()).orElseThrow();
        assertEquals(1, inventory.getAvailable());
        assertEquals(0, inventory.getReserved());
        assertEquals(1, inventory.getSold());
    }

    @Test
    void shouldHandleWebhookIdempotencyWithoutDuplicateProcessing() {
        String eventId = "evt_razorpay_998877";
        String payload = "{\"event\":\"payment.captured\",\"id\":\"" + eventId + "\"}";

        // 1. First webhook delivery
        boolean firstDelivery = paymentService.processWebhook("MOCK", eventId, "payment.captured", payload, "mock_sig_valid");
        assertTrue(firstDelivery);
        assertEquals(1, webhookEventRepository.count());

        // 2. Duplicate webhook replay
        boolean secondDelivery = paymentService.processWebhook("MOCK", eventId, "payment.captured", payload, "mock_sig_valid");
        assertTrue(secondDelivery); // Idempotently accepted
        assertEquals(1, webhookEventRepository.count()); // No duplicate entry in webhook event ledger
    }
}
