package com.reverie.inventory.dto;

import com.reverie.inventory.entity.MovementType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class StockAdjustmentRequest {

    @NotNull(message = "Variant ID is required")
    private UUID variantId;

    @NotNull(message = "Adjustment delta is required")
    private Integer delta;

    @NotNull(message = "Movement type is required")
    private MovementType movementType = MovementType.MANUAL_ADJUSTMENT;

    @NotBlank(message = "Reason for adjustment is mandatory")
    private String reason;

    public StockAdjustmentRequest() {}

    public StockAdjustmentRequest(UUID variantId, Integer delta, MovementType movementType, String reason) {
        this.variantId = variantId;
        this.delta = delta;
        this.movementType = movementType;
        this.reason = reason;
    }

    public UUID getVariantId() { return variantId; }
    public void setVariantId(UUID variantId) { this.variantId = variantId; }

    public Integer getDelta() { return delta; }
    public void setDelta(Integer delta) { this.delta = delta; }

    public MovementType getMovementType() { return movementType; }
    public void setMovementType(MovementType movementType) { this.movementType = movementType; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
