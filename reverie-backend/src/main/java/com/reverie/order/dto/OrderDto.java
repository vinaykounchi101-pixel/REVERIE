package com.reverie.order.dto;

import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderStatus;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class OrderDto {

    private UUID id;
    private String orderNumber;
    private UUID userId;
    private OrderStatus status;
    private String addressSnapshotJson;
    private Long subtotalPaise;
    private Long discountPaise;
    private Long taxPaise;
    private Long cgstPaise;
    private Long sgstPaise;
    private Long igstPaise;
    private Long shippingPaise;
    private Long walletPaise;
    private Long totalPaise;
    private Long payablePaise;
    private String currency;
    private Boolean highValueFlag;
    private Instant placedAt;
    private List<OrderItemDto> items = new ArrayList<>();
    private List<OrderStatusHistoryDto> statusHistory = new ArrayList<>();

    public OrderDto() {}

    public static OrderDto fromEntity(Order order, List<OrderItemDto> items, List<OrderStatusHistoryDto> history) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setUserId(order.getUser() != null ? order.getUser().getId() : null);
        dto.setStatus(order.getStatus());
        dto.setAddressSnapshotJson(order.getAddressSnapshotJson());
        dto.setSubtotalPaise(order.getSubtotalPaise());
        dto.setDiscountPaise(order.getDiscountPaise());
        dto.setTaxPaise(order.getTaxPaise());
        dto.setCgstPaise(order.getCgstPaise());
        dto.setSgstPaise(order.getSgstPaise());
        dto.setIgstPaise(order.getIgstPaise());
        dto.setShippingPaise(order.getShippingPaise());
        dto.setWalletPaise(order.getWalletPaise());
        dto.setTotalPaise(order.getTotalPaise());
        dto.setPayablePaise(order.getPayablePaise());
        dto.setCurrency(order.getCurrency());
        dto.setHighValueFlag(order.getHighValueFlag());
        dto.setPlacedAt(order.getPlacedAt());
        dto.setItems(items != null ? items : new ArrayList<>());
        dto.setStatusHistory(history != null ? history : new ArrayList<>());
        return dto;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getAddressSnapshotJson() {
        return addressSnapshotJson;
    }

    public void setAddressSnapshotJson(String addressSnapshotJson) {
        this.addressSnapshotJson = addressSnapshotJson;
    }

    public Long getSubtotalPaise() {
        return subtotalPaise;
    }

    public void setSubtotalPaise(Long subtotalPaise) {
        this.subtotalPaise = subtotalPaise;
    }

    public Long getDiscountPaise() {
        return discountPaise;
    }

    public void setDiscountPaise(Long discountPaise) {
        this.discountPaise = discountPaise;
    }

    public Long getTaxPaise() {
        return taxPaise;
    }

    public void setTaxPaise(Long taxPaise) {
        this.taxPaise = taxPaise;
    }

    public Long getCgstPaise() {
        return cgstPaise;
    }

    public void setCgstPaise(Long cgstPaise) {
        this.cgstPaise = cgstPaise;
    }

    public Long getSgstPaise() {
        return sgstPaise;
    }

    public void setSgstPaise(Long sgstPaise) {
        this.sgstPaise = sgstPaise;
    }

    public Long getIgstPaise() {
        return igstPaise;
    }

    public void setIgstPaise(Long igstPaise) {
        this.igstPaise = igstPaise;
    }

    public Long getShippingPaise() {
        return shippingPaise;
    }

    public void setShippingPaise(Long shippingPaise) {
        this.shippingPaise = shippingPaise;
    }

    public Long getWalletPaise() {
        return walletPaise;
    }

    public void setWalletPaise(Long walletPaise) {
        this.walletPaise = walletPaise;
    }

    public Long getTotalPaise() {
        return totalPaise;
    }

    public void setTotalPaise(Long totalPaise) {
        this.totalPaise = totalPaise;
    }

    public Long getPayablePaise() {
        return payablePaise;
    }

    public void setPayablePaise(Long payablePaise) {
        this.payablePaise = payablePaise;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Boolean getHighValueFlag() {
        return highValueFlag;
    }

    public void setHighValueFlag(Boolean highValueFlag) {
        this.highValueFlag = highValueFlag;
    }

    public Instant getPlacedAt() {
        return placedAt;
    }

    public void setPlacedAt(Instant placedAt) {
        this.placedAt = placedAt;
    }

    public List<OrderItemDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDto> items) {
        this.items = items;
    }

    public List<OrderStatusHistoryDto> getStatusHistory() {
        return statusHistory;
    }

    public void setStatusHistory(List<OrderStatusHistoryDto> statusHistory) {
        this.statusHistory = statusHistory;
    }
}
