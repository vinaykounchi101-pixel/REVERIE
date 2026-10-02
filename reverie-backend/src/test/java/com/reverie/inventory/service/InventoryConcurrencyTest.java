package com.reverie.inventory.service;

import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductAttribute;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.catalog.repository.ProductVariantRepository;
import com.reverie.common.error.BusinessException;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.Inventory;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.repository.InventoryMovementRepository;
import com.reverie.inventory.repository.InventoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class InventoryConcurrencyTest {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InventoryMovementRepository movementRepository;

    @Autowired
    private ProductVariantRepository variantRepository;

    @Autowired
    private ProductRepository productRepository;

    private ProductVariant testVariant;

    @BeforeEach
    void setUp() {
        movementRepository.deleteAll();
        inventoryRepository.deleteAll();
        variantRepository.deleteAll();
        productRepository.deleteAll();

        Product product = new Product();
        product.setName("Limited Edition Chrono");
        product.setSlug("limited-edition-chrono");
        product.setReferenceNumber("LTD-001");
        product.setGender("Men");
        product.setBasePricePaise(25000000L);
        product.setStatus(ProductStatus.PUBLISHED);

        ProductAttribute attr = new ProductAttribute();
        attr.setCaseMaterial("Titanium");
        attr.setMovement("Calibre LTD");
        product.setAttributes(attr);

        ProductVariant variant = new ProductVariant(product, "LTD-001-TITANIUM", "Titanium Edition", "Black", "Titanium", 25000000L, null);
        product.setVariants(List.of(variant));

        product = productRepository.save(product);
        testVariant = product.getVariants().get(0);
    }

    /**
     * SRS Acceptance Scenario T-CRIT-03 & Section 35.1:
     * Stock = 1, Concurrent attempts = N
     * Expected successful purchases = 1, Expected oversell = 0
     */
    @Test
    void shouldPreventOversellUnderHighConcurrency() throws InterruptedException {
        // Given: Exactly 1 watch available in stock
        Inventory inventory = new Inventory(testVariant, 1, 1);
        inventoryRepository.save(inventory);

        int threadCount = 10;
        ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch finishLatch = new CountDownLatch(threadCount);

        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failureCount = new AtomicInteger(0);

        for (int i = 0; i < threadCount; i++) {
            final int index = i;
            executorService.submit(() -> {
                try {
                    startLatch.await();
                    inventoryService.reserveStock(testVariant.getId(), 1, "Concurrent test order " + index, UUID.randomUUID());
                    successCount.incrementAndGet();
                } catch (BusinessException e) {
                    failureCount.incrementAndGet();
                } catch (Exception e) {
                    failureCount.incrementAndGet();
                } finally {
                    finishLatch.countDown();
                }
            });
        }

        // Fire all threads simultaneously
        startLatch.countDown();
        boolean finished = finishLatch.await(10, TimeUnit.SECONDS);
        executorService.shutdown();

        // Invariants: exactly 1 reservation succeeds, 9 fail with out-of-stock, 0 oversell
        assertEquals(true, finished);
        assertEquals(1, successCount.get(), "Expected exactly 1 successful reservation");
        assertEquals(threadCount - 1, failureCount.get(), "Expected all other threads to fail");

        Inventory finalInventory = inventoryRepository.findByVariantId(testVariant.getId()).orElseThrow();
        assertEquals(0, finalInventory.getAvailable(), "Available stock must be exactly 0");
        assertEquals(1, finalInventory.getReserved(), "Reserved stock must be exactly 1");
    }

    @Test
    void shouldReleaseReservationCorrectly() {
        Inventory inventory = new Inventory(testVariant, 5, 2);
        inventoryRepository.save(inventory);

        inventoryService.reserveStock(testVariant.getId(), 2, "Test hold", null);
        Inventory afterHold = inventoryRepository.findByVariantId(testVariant.getId()).orElseThrow();
        assertEquals(3, afterHold.getAvailable());
        assertEquals(2, afterHold.getReserved());

        inventoryService.releaseReservation(testVariant.getId(), 2, "Test release", null);
        Inventory afterRelease = inventoryRepository.findByVariantId(testVariant.getId()).orElseThrow();
        assertEquals(5, afterRelease.getAvailable());
        assertEquals(0, afterRelease.getReserved());
    }

    @Test
    void shouldCommitSaleCorrectly() {
        Inventory inventory = new Inventory(testVariant, 5, 2);
        inventoryRepository.save(inventory);

        inventoryService.reserveStock(testVariant.getId(), 2, "Test hold", null);
        inventoryService.commitSale(testVariant.getId(), 2, "Payment captured", null);

        Inventory finalState = inventoryRepository.findByVariantId(testVariant.getId()).orElseThrow();
        assertEquals(3, finalState.getAvailable());
        assertEquals(0, finalState.getReserved());
        assertEquals(2, finalState.getSold());
    }

    @Test
    void shouldApplyManualStockAdjustment() {
        Inventory inventory = new Inventory(testVariant, 5, 2);
        inventoryRepository.save(inventory);

        StockAdjustmentRequest request = new StockAdjustmentRequest(testVariant.getId(), 10, MovementType.RESTOCK, "New batch received from Geneva workshop");
        inventoryService.adjustStock(request, UUID.randomUUID());

        Inventory updated = inventoryRepository.findByVariantId(testVariant.getId()).orElseThrow();
        assertEquals(15, updated.getAvailable());
    }
}
