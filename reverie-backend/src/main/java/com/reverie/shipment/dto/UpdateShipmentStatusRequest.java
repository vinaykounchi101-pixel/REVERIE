package com.reverie.shipment.dto;

import com.reverie.shipment.entity.ShipmentStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateShipmentStatusRequest {

    @NotNull(message = "Shipment status is required")
    private ShipmentStatus status;

    private String note;

    public UpdateShipmentStatusRequest() {}

    public UpdateShipmentStatusRequest(ShipmentStatus status, String note) {
        this.status = status;
        this.note = note;
    }

    public ShipmentStatus getStatus() { return status; }
    public void setStatus(ShipmentStatus status) { this.status = status; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
