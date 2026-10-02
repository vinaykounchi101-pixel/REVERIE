package com.reverie.shipment.service;

import com.reverie.cart.dto.AddToCartRequest;
import com.reverie.cart.service.CartService;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.service.InventoryService;
import com.reverie.order.dto.AddressDto;
import com.reverie.order.dto.CreateCheckoutSessionRequest;
import com.reverie.order.dto.CreateOrderRequest;
import com.reverie.order.dto.OrderDto;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.service.CheckoutService;
import com.reverie.order.service.OrderService;
import com.reverie.shipment.dto.CreateShipmentRequest;
import com.reverie.shipment.dto.ShipmentDto;
import com.reverie.shipment.dto.UpdateShipmentStatusRequest;
import com.reverie.shipment.entity.ShipmentStatus;
import com.reverie.testutil.TestDataCleaner;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class ShipmentIntegrationTest {

    @Autowired
    private ShipmentService shipmentService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private CartService cartService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestDataCleaner testDataCleaner;

    private User customer;
    private User admin;
    private OrderDto testOrder;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        customer = new User();
        customer.setEmail("collector@reverie.app");
        customer.setPasswordHash("hashed_pass");
        customer.setFirstName("Horology");
        customer.setLastName("Connoisseur");
        customer.setRole(Role.CUSTOMER);
        customer.setVerified(true);
        customer = userRepository.save(customer);

        admin = new User();
        admin.setEmail("ops@reverie.app");
        admin.setPasswordHash("hashed_pass");
        admin.setFirstName("Operations");
        admin.setLastName("Manager");
        admin.setRole(Role.ORDER_MGR);
        admin.setVerified(true);
        admin = userRepository.save(admin);

        Product product = new Product();
        product.setName("Grand Tourbillon Perpetual");
        product.setSlug("grand-tourbillon-perpetual");
        product.setReferenceNumber("GTP-001");
        product.setGender("Unisex");
        product.setBasePricePaise(250000000L); // ₹25,00,000
        product.setStatus(ProductStatus.PUBLISHED);

        ProductVariant variant = new ProductVariant(product, "GTP-001-PLATINUM", "Platinum 950 Edition", "Openworked", "Alligator Strap", 250000000L, null);
        product.setVariants(List.of(variant));
        product = productRepository.save(product);
        ProductVariant testVariant = product.getVariants().get(0);

        inventoryService.adjustStock(new StockAdjustmentRequest(testVariant.getId(), 5, MovementType.RESTOCK, "Initial inventory"), admin.getId());

        cartService.addItem(customer.getId(), null, new AddToCartRequest(testVariant.getId(), 1, "Armored Delivery"));
        CreateCheckoutSessionRequest checkoutReq = new CreateCheckoutSessionRequest();
        AddressDto address = new AddressDto("Horology Connoisseur", "9876543210", "42 Heritage Boulevard", null, "Mumbai", "Maharashtra", "400001", "India");
        checkoutReq.setShippingAddress(address);
        var session = checkoutService.createCheckoutSession(customer.getId(), checkoutReq);

        testOrder = checkoutService.createOrder(customer.getId(), new CreateOrderRequest(session.getId(), address, "IDEMP_SHIP_001"));
        testOrder = orderService.updateOrderStatus(testOrder.getId(), OrderStatus.PROCESSING, "Payment confirmed and order moved to processing");
    }

    @Test
    void testShipmentLifecycle_ArmoredTransitToDelivered() {
        CreateShipmentRequest req = new CreateShipmentRequest(
                testOrder.getId(),
                "MALCA_AMIT_ARMORED",
                "EXPRESS_VALUABLE_CARGO",
                Instant.now().plus(2, ChronoUnit.DAYS)
        );

        ShipmentDto shipment = shipmentService.createShipment(req, admin.getId());
        assertNotNull(shipment);
        assertNotNull(shipment.getAwb());
        assertTrue(shipment.getAwb().startsWith("REV-AWB-"));
        assertEquals(ShipmentStatus.LABEL_CREATED, shipment.getStatus());
        assertEquals("MALCA_AMIT_ARMORED", shipment.getProvider());

        // Verify order status transitioned to SHIPPED
        OrderDto order = orderService.getOrderById(testOrder.getId(), customer.getId());
        assertEquals(OrderStatus.SHIPPED, order.getStatus());

        // Transition: IN_TRANSIT
        shipment = shipmentService.updateShipmentStatus(
                shipment.getId(),
                new UpdateShipmentStatusRequest(ShipmentStatus.IN_TRANSIT, "Secure transit hub Mumbai"),
                admin.getId()
        );
        assertEquals(ShipmentStatus.IN_TRANSIT, shipment.getStatus());

        // Transition: DELIVERED
        shipment = shipmentService.updateShipmentStatus(
                shipment.getId(),
                new UpdateShipmentStatusRequest(ShipmentStatus.DELIVERED, "Delivered to VIP client residence"),
                admin.getId()
        );
        assertEquals(ShipmentStatus.DELIVERED, shipment.getStatus());

        // Verify order status transitioned to DELIVERED
        order = orderService.getOrderById(testOrder.getId(), customer.getId());
        assertEquals(OrderStatus.DELIVERED, order.getStatus());

        // Test retrieval by AWB
        ShipmentDto tracked = shipmentService.getShipmentByAwb(shipment.getAwb());
        assertEquals(shipment.getId(), tracked.getId());
    }
}
