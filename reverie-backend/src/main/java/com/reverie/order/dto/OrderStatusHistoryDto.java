package com.reverie.order.dto;

import com.reverie.order.entity.OrderStatusHistory;

import java.time.Instant;
import java.util.UUID;

public class OrderStatusHistoryDto {

    private UUID id;
    private String fromStatus;
    private String toStatus;
    private String note;
    private Instant createdAt;

    public OrderStatusHistoryDto() {}

    public static OrderStatusHistoryDto fromEntity(OrderStatusHistory history) {
        OrderStatusHistoryDto dto = new OrderStatusHistoryDto();
        dto.setId(history.getId());
        dto.setFromStatus(history.getFromStatus());
        dto.setToStatus(history.getToStatus());
        dto.setNote(history.getNote());
        dto.setCreatedAt(history.getCreatedAt());
        return dto;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFromStatus() {
        return fromStatus;
    }

    public void setFromStatus(String fromStatus) {
        this.fromStatus = fromStatus;
    }

    public String getToStatus() {
        return toStatus;
    }

    public void setToStatus(String toStatus) {
        this.toStatus = toStatus;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
