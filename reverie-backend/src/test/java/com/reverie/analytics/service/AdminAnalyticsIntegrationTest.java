package com.reverie.analytics.service;

import com.reverie.analytics.dto.DashboardSummaryDto;
import com.reverie.analytics.dto.InventoryHealthDto;
import com.reverie.analytics.dto.SalesOverviewDto;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.service.InventoryService;
import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.repository.OrderRepository;
import com.reverie.support.dto.CreateTicketRequest;
import com.reverie.support.entity.TicketPriority;
import com.reverie.support.service.SupportTicketService;
import com.reverie.testutil.TestDataCleaner;
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
public class AdminAnalyticsIntegrationTest {

    @Autowired
    private AdminAnalyticsService analyticsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private SupportTicketService ticketService;

    @Autowired
    private TestDataCleaner testDataCleaner;

    private User admin;
    private User customer1;
    private User customer2;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        admin = new User();
        admin.setEmail("exec.director@reverie.app");
        admin.setPasswordHash("hashed_pass");
        admin.setFirstName("Executive");
        admin.setLastName("Director");
        admin.setRole(Role.ADMIN);
        admin.setVerified(true);
        admin = userRepository.save(admin);

        customer1 = new User();
        customer1.setEmail("client.one@reverie.app");
        customer1.setPasswordHash("hashed_pass");
        customer1.setFirstName("Client");
        customer1.setLastName("One");
        customer1.setRole(Role.CUSTOMER);
        customer1.setVerified(true);
        customer1 = userRepository.save(customer1);

        customer2 = new User();
        customer2.setEmail("client.two@reverie.app");
        customer2.setPasswordHash("hashed_pass");
        customer2.setFirstName("Client");
        customer2.setLastName("Two");
        customer2.setRole(Role.CUSTOMER);
        customer2.setVerified(true);
        customer2 = userRepository.save(customer2);
    }

    @Test
    void testExecutiveAnalyticsDashboard() {
        // 1. Create catalog and inventory
        Product p1 = new Product();
        p1.setName("Chrono Titanium");
        p1.setSlug("chrono-titanium");
        p1.setReferenceNumber("CT-101");
        p1.setGender("Men");
        p1.setBasePricePaise(100000000L); // ₹10,00,000
        p1.setStatus(ProductStatus.PUBLISHED);

        ProductVariant v1 = new ProductVariant(p1, "CT-101-BL", "Black Edition", "Skeleton", "Titanium", 100000000L, null);
        p1.setVariants(List.of(v1));
        p1 = productRepository.save(p1);
        v1 = p1.getVariants().get(0);

        // Variant 1: in stock = 4 units
        inventoryService.adjustStock(new StockAdjustmentRequest(v1.getId(), 4, MovementType.RESTOCK, "Stocking CT-101"), admin.getId());

        // 2. Create sample orders
        // Order 1: CONFIRMED - Subtotal: 100000000 paise, Tax: 18000000 paise, Total: 118000000 paise
        Order o1 = new Order();
        o1.setUser(customer1);
        o1.setOrderNumber("REV-ORD-TEST-001");
        o1.setStatus(OrderStatus.PROCESSING);
        o1.setSubtotalPaise(100000000L);
        o1.setTaxPaise(18000000L);
        o1.setCgstPaise(9000000L);
        o1.setSgstPaise(9000000L);
        o1.setTotalPaise(118000000L);
        o1.setPayablePaise(118000000L);
        o1.setAddressSnapshotJson("{\"city\":\"Mumbai\"}");
        orderRepository.save(o1);

        // Order 2: DELIVERED - Subtotal: 200000000 paise, Tax: 36000000 paise, Total: 236000000 paise
        Order o2 = new Order();
        o2.setUser(customer2);
        o2.setOrderNumber("REV-ORD-TEST-002");
        o2.setStatus(OrderStatus.DELIVERED);
        o2.setSubtotalPaise(200000000L);
        o2.setTaxPaise(36000000L);
        o2.setCgstPaise(18000000L);
        o2.setSgstPaise(18000000L);
        o2.setTotalPaise(236000000L);
        o2.setPayablePaise(236000000L);
        o2.setAddressSnapshotJson("{\"city\":\"Delhi\"}");
        orderRepository.save(o2);

        // 3. Create open support ticket
        ticketService.createTicket(customer1.getId(), new CreateTicketRequest(
                o1.getId(),
                "Client One",
                "client.one@reverie.app",
                "Delivery confirmation",
                "SHIPPING",
                TicketPriority.MEDIUM,
                "When will armored transit arrive?"
        ));

        // 4. Test Analytics Overview
        SalesOverviewDto sales = analyticsService.getSalesOverview();
        assertEquals(2, sales.getTotalOrders());
        assertEquals(2, sales.getCompletedOrders());
        assertEquals(0, sales.getCancelledOrders());
        assertEquals(354000000L, sales.getTotalGmvPaise()); // 118000000 + 236000000
        assertEquals(300000000L, sales.getTotalNetRevenuePaise()); // 100000000 + 200000000
        assertEquals(54000000L, sales.getTotalTaxPaise()); // 18000000 + 36000000
        assertEquals(150000000L, sales.getAverageOrderValuePaise()); // 300000000 / 2 = 150000000

        // 5. Test Inventory Health
        InventoryHealthDto invHealth = analyticsService.getInventoryHealth();
        assertEquals(1, invHealth.getTotalVariants());
        assertEquals(4, invHealth.getInStockUnits());
        assertEquals(0, invHealth.getOutOfStockCount());

        // 6. Test Dashboard Summary
        DashboardSummaryDto dashboard = analyticsService.getDashboardSummary();
        assertNotNull(dashboard.getSales());
        assertNotNull(dashboard.getInventory());
        assertEquals(2, dashboard.getRegisteredCustomersCount()); // customer1, customer2
        assertEquals(1, dashboard.getOpenTicketsCount()); // 1 open ticket
    }
}
