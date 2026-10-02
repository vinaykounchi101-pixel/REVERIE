package com.reverie.returns.service;

import com.reverie.cart.dto.AddToCartRequest;
import com.reverie.cart.service.CartService;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.inventory.dto.InventoryDto;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.service.InventoryService;
import com.reverie.order.dto.AddressDto;
import com.reverie.order.dto.CreateCheckoutSessionRequest;
import com.reverie.order.dto.CreateOrderRequest;
import com.reverie.order.dto.OrderDto;
import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.repository.OrderRepository;
import com.reverie.order.service.CheckoutService;
import com.reverie.order.service.OrderService;
import com.reverie.payment.entity.Payment;
import com.reverie.payment.entity.PaymentProviderType;
import com.reverie.payment.entity.PaymentStatus;
import com.reverie.payment.repository.PaymentRepository;
import com.reverie.returns.dto.CreateReturnRequestDto;
import com.reverie.returns.dto.ProcessReturnDecisionDto;
import com.reverie.returns.dto.ReturnRequestDto;
import com.reverie.returns.dto.WalletDto;
import com.reverie.returns.dto.WalletTransactionDto;
import com.reverie.returns.entity.ReturnStatus;
import com.reverie.shipment.dto.CreateShipmentRequest;
import com.reverie.shipment.dto.ShipmentDto;
import com.reverie.shipment.dto.UpdateShipmentStatusRequest;
import com.reverie.shipment.entity.ShipmentStatus;
import com.reverie.shipment.service.ShipmentService;
import com.reverie.testutil.TestDataCleaner;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class ReturnAndWalletTest {

    @Autowired
    private ReturnService returnService;

    @Autowired
    private WalletService walletService;

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
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestDataCleaner testDataCleaner;

    private User customer;
    private User admin;
    private OrderDto deliveredOrder;
    private ProductVariant testVariant;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        customer = new User();
        customer.setEmail("patron@reverie.app");
        customer.setPasswordHash("hashed_pass");
        customer.setFirstName("Royal");
        customer.setLastName("Patron");
        customer.setRole(Role.CUSTOMER);
        customer.setVerified(true);
        customer = userRepository.save(customer);

        admin = new User();
        admin.setEmail("concierge.admin@reverie.app");
        admin.setPasswordHash("hashed_pass");
        admin.setFirstName("Concierge");
        admin.setLastName("Admin");
        admin.setRole(Role.ORDER_MGR);
        admin.setVerified(true);
        admin = userRepository.save(admin);

        Product product = new Product();
        product.setName("Chronometre Souverain");
        product.setSlug("chronometre-souverain");
        product.setReferenceNumber("CS-900");
        product.setGender("Men");
        product.setBasePricePaise(180000000L); // ₹18,00,000
        product.setStatus(ProductStatus.PUBLISHED);

        testVariant = new ProductVariant(product, "CS-900-ROSEGOLD", "Rose Gold 18K", "Silver Guilloche", "Brown Alligator", 180000000L, null);
        product.setVariants(List.of(testVariant));
        product = productRepository.save(product);
        testVariant = product.getVariants().get(0);

        // Initial inventory: 3 units
        inventoryService.adjustStock(new StockAdjustmentRequest(testVariant.getId(), 3, MovementType.RESTOCK, "Initial inventory"), admin.getId());

        // Purchase 1 unit
        cartService.addItem(customer.getId(), null, new AddToCartRequest(testVariant.getId(), 1, "Standard Armored"));
        CreateCheckoutSessionRequest checkoutReq = new CreateCheckoutSessionRequest();
        AddressDto address = new AddressDto("Royal Patron", "9123456780", "15 Palace Road", null, "Bengaluru", "Karnataka", "560001", "India");
        checkoutReq.setShippingAddress(address);
        var session = checkoutService.createCheckoutSession(customer.getId(), checkoutReq);

        deliveredOrder = checkoutService.createOrder(customer.getId(), new CreateOrderRequest(session.getId(), address, "IDEMP_RET_001"));
        deliveredOrder = orderService.updateOrderStatus(deliveredOrder.getId(), OrderStatus.PROCESSING, "Payment confirmed and order in processing");

        // Record payment
        Order orderEntity = orderRepository.findById(deliveredOrder.getId()).orElseThrow();
        Payment payment = new Payment(orderEntity, PaymentProviderType.RAZORPAY, deliveredOrder.getTotalPaise(), 1);
        payment.setStatus(PaymentStatus.CAPTURED);
        paymentRepository.save(payment);

        // Create and deliver shipment
        ShipmentDto shipment = shipmentService.createShipment(
                new CreateShipmentRequest(deliveredOrder.getId(), "BLUE_DART_VALUABLE", "EXPRESS_SECURE", Instant.now().plus(2, ChronoUnit.DAYS)),
                admin.getId()
        );
        shipmentService.updateShipmentStatus(
                shipment.getId(),
                new UpdateShipmentStatusRequest(ShipmentStatus.DELIVERED, "Delivered to client residence"),
                admin.getId()
        );

        // Verify order is DELIVERED
        OrderDto order = orderService.getOrderById(deliveredOrder.getId(), customer.getId());
        assertEquals(OrderStatus.DELIVERED, order.getStatus());
    }

    @Test
    void testReturnRequest_InspectionApproval_WalletCreditAndRestock() {
        // Stock before return: 3 - 1 = 2
        InventoryDto stockBefore = inventoryService.getInventoryByVariantId(testVariant.getId());
        assertEquals(2, stockBefore.getAvailable());

        // 1. Customer submits return request
        CreateReturnRequestDto req = new CreateReturnRequestDto(
                deliveredOrder.getId(),
                "WRONG_SPECIFICATION",
                "Would prefer Platinum variant instead of Rose Gold"
        );

        ReturnRequestDto returnDto = returnService.requestReturn(customer.getId(), req);
        assertNotNull(returnDto);
        assertEquals(ReturnStatus.REQUESTED, returnDto.getStatus());

        // 2. Admin inspects and approves return
        ProcessReturnDecisionDto decision = new ProcessReturnDecisionDto(
                ReturnStatus.APPROVED,
                "Horology seal intact, pristine condition, full original box and papers verified",
                "WALLET"
        );

        ReturnRequestDto approved = returnService.processReturnDecision(returnDto.getId(), decision, admin.getId());
        assertEquals(ReturnStatus.APPROVED, approved.getStatus());

        // 3. Verify store credit in customer's wallet
        WalletDto wallet = walletService.getWallet(customer.getId());
        assertEquals(deliveredOrder.getTotalPaise(), wallet.getBalancePaise());

        Page<WalletTransactionDto> txPage = walletService.getTransactions(customer.getId(), PageRequest.of(0, 10));
        assertEquals(1, txPage.getTotalElements());
        assertEquals("CREDIT", txPage.getContent().get(0).getTransactionType());
        assertEquals(deliveredOrder.getTotalPaise(), txPage.getContent().get(0).getAmountPaise());

        // 4. Verify inventory was restocked: 2 + 1 = 3
        InventoryDto stockAfter = inventoryService.getInventoryByVariantId(testVariant.getId());
        assertEquals(3, stockAfter.getAvailable());
    }
}
