package com.reverie.user.entity;

public enum Role {
    CUSTOMER,
    SUPER_ADMIN,
    ADMIN,
    PRODUCT_MGR,
    INVENTORY_MGR,
    ORDER_MGR,
    SUPPORT_AGENT,
    CONTENT_MGR,
    ANALYST;

    public boolean isAdmin() {
        return this != CUSTOMER;
    }
}
