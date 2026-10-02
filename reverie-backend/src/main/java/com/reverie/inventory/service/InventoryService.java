package com.reverie.inventory.service;

import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductVariantRepository;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.inventory.dto.InventoryDto;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.entity.Inventory;
import com.reverie.inventory.entity.InventoryMovement;
import com.reverie.inventory.entity.MovementType;
import com.reverie.inventory.repository.InventoryMovementRepository;
import com.reverie.inventory.repository.InventoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class InventoryService {

    private static final Logger log = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepository;
    private final InventoryMovementRepository movementRepository;
    private final ProductVariantRepository variantRepository;

    public InventoryService(
            InventoryRepository inventoryRepository,
            InventoryMovementRepository movementRepository,
            ProductVariantRepository variantRepository) {
        this.inventoryRepository = inventoryRepository;
        this.movementRepository = movementRepository;
        this.variantRepository = variantRepository;
    }

    @Transactional(readOnly = true)
    public InventoryDto getInventoryByVariantId(UUID variantId) {
        Inventory inventory = inventoryRepository.findByVariantId(variantId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.VARIANT_NOT_FOUND, "Inventory record for variant " + variantId + " not found"));
        return InventoryDto.fromEntity(inventory);
    }

    /**
     * Atomically reserves stock for checkout session.
     * Uses pessimistic write lock to guarantee zero oversell under concurrent requests (T-CRIT-03).
     */
    @Transactional
    public void reserveStock(UUID variantId, int quantity, String reason, UUID actorId) {
        if (quantity <= 0) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Reservation quantity must be positive");
        }

        Inventory inventory = inventoryRepository.findWithLockByVariantId(variantId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.VARIANT_NOT_FOUND, "Inventory not found for variant"));

        if (inventory.getAvailable() < quantity) {
            log.warn("Insufficient stock for variant {}. Requested: {}, Available: {}", variantId, quantity, inventory.getAvailable());
            throw new BusinessException(ErrorCode.INV_OUT_OF_STOCK, "The requested timepiece is out of stock.");
        }

        inventory.setAvailable(inventory.getAvailable() - quantity);
        inventory.setReserved(inventory.getReserved() + quantity);
        inventoryRepository.save(inventory);

        InventoryMovement movement = new InventoryMovement(
                inventory.getVariant(),
                -quantity,
                MovementType.RESERVATION_HOLD,
                reason != null ? reason : "Checkout session hold",
                actorId
        );
        movementRepository.save(movement);
    }

    /**
     * Releases an expired or cancelled checkout reservation back to available stock.
     */
    @Transactional
    public void releaseReservation(UUID variantId, int quantity, String reason, UUID actorId) {
        if (quantity <= 0) return;

        Inventory inventory = inventoryRepository.findWithLockByVariantId(variantId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.VARIANT_NOT_FOUND, "Inventory not found for variant"));

        int releaseQty = Math.min(inventory.getReserved(), quantity);
        inventory.setReserved(inventory.getReserved() - releaseQty);
        inventory.setAvailable(inventory.getAvailable() + releaseQty);
        inventoryRepository.save(inventory);

        InventoryMovement movement = new InventoryMovement(
                inventory.getVariant(),
                releaseQty,
                MovementType.RESERVATION_RELEASE,
                reason != null ? reason : "Checkout reservation expired/cancelled",
                actorId
        );
        movementRepository.save(movement);
    }

    /**
     * Converts reserved stock to sold upon confirmed payment.
     */
    @Transactional
    public void commitSale(UUID variantId, int quantity, String reason, UUID actorId) {
        if (quantity <= 0) return;

        Inventory inventory = inventoryRepository.findWithLockByVariantId(variantId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.VARIANT_NOT_FOUND, "Inventory not found for variant"));

        int commitQty = Math.min(inventory.getReserved(), quantity);
        inventory.setReserved(inventory.getReserved() - commitQty);
        inventory.setSold(inventory.getSold() + commitQty);
        inventoryRepository.save(inventory);

        InventoryMovement movement = new InventoryMovement(
                inventory.getVariant(),
                commitQty,
                MovementType.SALE_COMMIT,
                reason != null ? reason : "Order payment captured",
                actorId
        );
        movementRepository.save(movement);
    }

    /**
     * Admin manual stock adjustment with mandatory reason and movement audit trail.
     */
    @Transactional
    public InventoryDto adjustStock(StockAdjustmentRequest request, UUID actorId) {
        Inventory inventory = inventoryRepository.findWithLockByVariantId(request.getVariantId())
                .orElseGet(() -> {
                    ProductVariant variant = variantRepository.findById(request.getVariantId())
                            .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.VARIANT_NOT_FOUND, "Variant not found"));
                    return new Inventory(variant, 0, 5);
                });

        int newAvailable = inventory.getAvailable() + request.getDelta();
        if (newAvailable < 0) {
            throw new BusinessException(ErrorCode.INV_OUT_OF_STOCK, "Stock adjustment would result in negative available inventory.");
        }

        inventory.setAvailable(newAvailable);
        Inventory saved = inventoryRepository.save(inventory);

        InventoryMovement movement = new InventoryMovement(
                inventory.getVariant(),
                request.getDelta(),
                request.getMovementType(),
                request.getReason(),
                actorId
        );
        movementRepository.save(movement);

        return InventoryDto.fromEntity(saved);
    }
}
