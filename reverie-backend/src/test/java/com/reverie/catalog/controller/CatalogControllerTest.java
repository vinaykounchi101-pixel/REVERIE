package com.reverie.catalog.controller;

import com.reverie.catalog.entity.*;
import com.reverie.catalog.repository.CategoryRepository;
import com.reverie.catalog.repository.CollectionRepository;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.inventory.entity.Inventory;
import com.reverie.inventory.repository.InventoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CatalogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private com.reverie.testutil.TestDataCleaner testDataCleaner;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        Category category = new Category("Classic", "classic", "Timeless watches", 1);
        category = categoryRepository.save(category);

        Collection collection = new Collection("The Orion", "orion", "Timeless by Design", "Flagship collection", "R01", "/assets/hero.jpg");
        collection = collectionRepository.save(collection);

        Product product = new Product();
        product.setName("Velara Classic Royale Blue");
        product.setSlug("velara-classic-royale-blue");
        product.setReferenceNumber("V-001");
        product.setCategory(category);
        product.setCollection(collection);
        product.setGender("Men");
        product.setShortDescription("Steel case with royal navy sunburst dial");
        product.setDescription("Full watch story and hand-finished movement");
        product.setBasePricePaise(12500000L); // ₹1,25,000
        product.setStatus(ProductStatus.PUBLISHED);
        product.setModel3dUrl("/assets/models/watch.glb");
        product.setPrimaryImageUrl("/assets/watch.jpg");
        product.setRating(BigDecimal.valueOf(4.9));
        product.setReviewsCount(86);

        ProductAttribute attributes = new ProductAttribute();
        attributes.setCaseDiameter("40mm");
        attributes.setThickness("9.8mm");
        attributes.setCaseMaterial("316L Stainless Steel");
        attributes.setMovement("Calibre V-101 Automatic");
        attributes.setPowerReserve("48 Hours");
        attributes.setCrystal("Double-domed Sapphire");
        attributes.setWaterResistance("50m (5 ATM)");
        attributes.setStrapWidth("20mm");
        attributes.setDialColor("Royal Navy");
        attributes.setOrigin("Switzerland");
        attributes.setWarrantyMonths(24);
        product.setAttributes(attributes);

        ProductVariant variant = new ProductVariant(product, "REV-V001-STEEL", "Steel Edition", "Royal Navy", "Steel", 12500000L, null);
        product.setVariants(List.of(variant));

        product = productRepository.save(product);

        Inventory inventory = new Inventory(product.getVariants().get(0), 10, 3);
        inventoryRepository.save(inventory);
    }

    @Test
    void shouldReturnCategories() throws Exception {
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].slug").value("classic"));
    }

    @Test
    void shouldReturnCollections() throws Exception {
        mockMvc.perform(get("/api/collections"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].slug").value("orion"));
    }

    @Test
    void shouldReturnProductDetailsBySlug() throws Exception {
        mockMvc.perform(get("/api/products/velara-classic-royale-blue"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Velara Classic Royale Blue"))
                .andExpect(jsonPath("$.data.basePricePaise").value(12500000))
                .andExpect(jsonPath("$.data.attributes.caseDiameter").value("40mm"))
                .andExpect(jsonPath("$.data.attributes.movement").value("Calibre V-101 Automatic"))
                .andExpect(jsonPath("$.data.model3dUrl").value("/assets/models/watch.glb"))
                .andExpect(jsonPath("$.data.variants[0].sku").value("REV-V001-STEEL"))
                .andExpect(jsonPath("$.data.variants[0].availableStock").value(10));
    }

    @Test
    void shouldSearchProductsWithFilters() throws Exception {
        mockMvc.perform(get("/api/products")
                        .param("keyword", "Royale")
                        .param("category", "classic")
                        .param("gender", "Men")
                        .param("minPrice", "10000000")
                        .param("maxPrice", "20000000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].slug").value("velara-classic-royale-blue"))
                .andExpect(jsonPath("$.data.content[0].inStock").value(true));
    }

    @Test
    void shouldReturnNotFoundForUnknownProduct() throws Exception {
        mockMvc.perform(get("/api/products/non-existent-watch"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("PRODUCT_NOT_FOUND"));
    }
}
