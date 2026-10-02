package com.reverie.cart.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reverie.cart.dto.AddToCartRequest;
import com.reverie.cart.dto.MergeCartRequest;
import com.reverie.cart.dto.UpdateCartItemRequest;
import com.reverie.cart.repository.CartItemRepository;
import com.reverie.cart.repository.CartRepository;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.catalog.repository.ProductVariantRepository;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.repository.InventoryMovementRepository;
import com.reverie.inventory.repository.InventoryRepository;
import com.reverie.inventory.service.InventoryService;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CartControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository variantRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InventoryMovementRepository movementRepository;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private UserRepository userRepository;

    private ProductVariant testVariant;
    private User testUser;

    @Autowired
    private com.reverie.testutil.TestDataCleaner testDataCleaner;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        testUser = new User();
        testUser.setEmail("horology.collector@reverie.app");
        testUser.setPasswordHash("hashed_password");
        testUser.setFirstName("Horology");
        testUser.setLastName("Collector");
        testUser.setRole(Role.CUSTOMER);
        testUser.setVerified(true);
        testUser = userRepository.save(testUser);

        Product product = new Product();
        product.setName("Royal Chronograph Tourbillon");
        product.setSlug("royal-chronograph-tourbillon");
        product.setReferenceNumber("RCT-100");
        product.setGender("Unisex");
        product.setBasePricePaise(50000000L); // ₹5,00,000
        product.setStatus(ProductStatus.PUBLISHED);

        ProductVariant variant = new ProductVariant(product, "RCT-100-GOLD", "Rose Gold Edition", "Obsidian Black", "Alligator Leather", 50000000L, null);
        product.setVariants(List.of(variant));
        product = productRepository.save(product);
        testVariant = product.getVariants().get(0);

        inventoryService.adjustStock(new StockAdjustmentRequest(
                testVariant.getId(),
                5,
                MovementType.RESTOCK,
                "Initial stock setup"
        ), testUser.getId());
    }

    @Test
    void shouldManageGuestCartLifecycle() throws Exception {
        String sessionId = "guest-session-12345";
        AddToCartRequest addRequest = new AddToCartRequest(testVariant.getId(), 2, "Alligator Leather");

        // 1. Add item to guest cart
        mockMvc.perform(post("/api/cart/items")
                        .header("X-Session-ID", sessionId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.totalItems", is(2)))
                .andExpect(jsonPath("$.data.subtotalPaise", is(100000000))) // 2 * 5,00,000 = 10,00,000 in paise = 100000000
                .andExpect(jsonPath("$.data.taxPaise", is(18000000))) // 18% GST = 1,80,000 in paise = 18000000
                .andExpect(jsonPath("$.data.totalPaise", is(118000000)));

        // 2. Update item quantity
        UpdateCartItemRequest updateRequest = new UpdateCartItemRequest(1, "Steel Bracelet");
        mockMvc.perform(patch("/api/cart/items/" + testVariant.getId())
                        .header("X-Session-ID", sessionId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalItems", is(1)))
                .andExpect(jsonPath("$.data.subtotalPaise", is(50000000)));

        // 3. Remove item
        mockMvc.perform(delete("/api/cart/items/" + testVariant.getId())
                        .header("X-Session-ID", sessionId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalItems", is(0)));
    }
}
