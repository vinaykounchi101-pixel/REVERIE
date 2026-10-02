package com.reverie.order.controller;

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
import com.reverie.order.dto.CheckoutSessionDto;
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
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class CheckoutAndOrderTest {

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

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

    private User testUser;
    private ProductVariant testVariant;

    @Autowired
    private com.reverie.testutil.TestDataCleaner testDataCleaner;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        testUser = new User();
        testUser.setEmail("collector@reverie.app");
        testUser.setPasswordHash("hashed_secret");
        testUser.setFirstName("Master");
        testUser.setLastName("Collector");
        testUser.setRole(Role.CUSTOMER);
        testUser.setVerified(true);
        testUser = userRepository.save(testUser);

        Product product = new Product();
        product.setName("Grand Complication Chrono");
        product.setSlug("grand-complication-chrono");
        product.setReferenceNumber("GCC-900");
        product.setGender("Men");
        product.setBasePricePaise(35000000L); // ₹3,50,000
        product.setStatus(ProductStatus.PUBLISHED);

        ProductVariant variant = new ProductVariant(product, "GCC-900-PLATINUM", "Platinum 950 Edition", "Silver Dial", "Platinum Bracelet", 35000000L, null);
        product.setVariants(List.of(variant));
        product = productRepository.save(product);
        testVariant = product.getVariants().get(0);

        // Stock available: 3 units
        inventoryService.adjustStock(new StockAdjustmentRequest(testVariant.getId(), 3, MovementType.RESTOCK, "Initial restock"), testUser.getId());
    }

    @Test
    void shouldExecuteCheckoutSessionAndOrderCreationFlow() {
        // 1. Add item to user cart (1 unit)
        cartService.addItem(testUser.getId(), null, new AddToCartRequest(testVariant.getId(), 1, "Platinum Bracelet"));

        // 2. Create Checkout Session -> Should reserve 1 unit atomically
        CreateCheckoutSessionRequest checkoutReq = new CreateCheckoutSessionRequest();
        AddressDto address = new AddressDto(
                "Master Collector",
                "9876543210",
                "Villa 101, Luxury Heights",
                "Marine Drive",
                "Mumbai",
                "Maharashtra",
                "400020",
                "India"
        );
        checkoutReq.setShippingAddress(address);

        CheckoutSessionDto session = checkoutService.createCheckoutSession(testUser.getId(), checkoutReq);
        assertNotNull(session.getId());
        assertEquals("ACTIVE", session.getStatus());

        // Verify inventory state: available=2, reserved=1
        Inventory invAfterReserve = inventoryRepository.findByVariantId(testVariant.getId()).orElseThrow();
        assertEquals(2, invAfterReserve.getAvailable());
        assertEquals(1, invAfterReserve.getReserved());

        // 3. Create Order from Checkout Session
        CreateOrderRequest orderReq = new CreateOrderRequest(session.getId(), address, "IDEMP_ORDER_123");
        OrderDto order = checkoutService.createOrder(testUser.getId(), orderReq);

        assertNotNull(order.getId());
        assertTrue(order.getOrderNumber().startsWith("REV-"));
        assertEquals(OrderStatus.PENDING_PAYMENT, order.getStatus());
        assertEquals(35000000L, order.getSubtotalPaise());
        assertEquals(6300000L, order.getTaxPaise()); // 18% of 35000000 = 6300000
        assertEquals(3150000L, order.getCgstPaise());
        assertEquals(3150000L, order.getSgstPaise());
        assertEquals(41300000L, order.getTotalPaise());
        assertTrue(order.getHighValueFlag()); // >= ₹2,00,000 threshold
        assertEquals(1, order.getItems().size());
        assertEquals(1, order.getStatusHistory().size());

        // 4. Check Order status transition
        OrderDto updatedOrder = orderService.updateOrderStatus(order.getId(), OrderStatus.PROCESSING, "Payment confirmed");
        assertEquals(OrderStatus.PROCESSING, updatedOrder.getStatus());
        assertEquals(2, updatedOrder.getStatusHistory().size());
    }
}
