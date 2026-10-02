package com.reverie.catalog.entity;

public enum ProductStatus {
    DRAFT,
    PUBLISHED,
    ARCHIVED;

    public boolean isCustomerVisible() {
        return this == PUBLISHED;
    }
}
