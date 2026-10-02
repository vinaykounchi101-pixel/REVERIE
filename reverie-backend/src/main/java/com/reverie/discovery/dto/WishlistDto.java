package com.reverie.discovery.dto;

import java.util.List;
import java.util.UUID;

public class WishlistDto {

    private UUID id;
    private UUID userId;
    private List<WishlistItemDto> items;
    private int totalCount;

    public WishlistDto() {}

    public WishlistDto(UUID id, UUID userId, List<WishlistItemDto> items) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.totalCount = items != null ? items.size() : 0;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public List<WishlistItemDto> getItems() { return items; }
    public void setItems(List<WishlistItemDto> items) {
        this.items = items;
        this.totalCount = items != null ? items.size() : 0;
    }

    public int getTotalCount() { return totalCount; }
    public void setTotalCount(int totalCount) { this.totalCount = totalCount; }
}
