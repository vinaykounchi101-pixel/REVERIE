package com.reverie.discovery.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reverie.auth.jwt.JwtTokenProvider;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductAttribute;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.discovery.repository.WishlistItemRepository;
import com.reverie.discovery.repository.WishlistRepository;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class WishlistControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private User testUser;
    private Product testProduct;
    private String jwtToken;

    @Autowired
    private com.reverie.testutil.TestDataCleaner testDataCleaner;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        testUser = new User("wishlist@reverie.app", passwordEncoder.encode("Password@123"), "Wish", "User", null, Role.CUSTOMER);
        testUser = userRepository.save(testUser);
        jwtToken = jwtTokenProvider.generateToken(testUser.getId(), testUser.getEmail(), testUser.getRole());

        testProduct = new Product();
        testProduct.setName("Velara Royale Blue");
        testProduct.setSlug("velara-royale-blue");
        testProduct.setReferenceNumber("V-001");
        testProduct.setBasePricePaise(12500000L);
        testProduct.setStatus(ProductStatus.PUBLISHED);

        ProductAttribute attr = new ProductAttribute();
        attr.setCaseMaterial("316L Steel");
        testProduct.setAttributes(attr);

        testProduct = productRepository.save(testProduct);
    }

    @Test
    void shouldAddAndRetrieveWishlistItems() throws Exception {
        Map<String, String> addPayload = Map.of("productId", testProduct.getId().toString());

        mockMvc.perform(post("/api/wishlist/items")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addPayload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.totalCount").value(1))
                .andExpect(jsonPath("$.data.items[0].product.slug").value("velara-royale-blue"));

        // Retrieve wishlist
        mockMvc.perform(get("/api/wishlist")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalCount").value(1));

        // Delete from wishlist
        mockMvc.perform(delete("/api/wishlist/items/" + testProduct.getId())
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.totalCount").value(0));
    }
}
