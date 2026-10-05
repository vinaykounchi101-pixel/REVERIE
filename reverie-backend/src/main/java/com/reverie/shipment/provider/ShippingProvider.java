package com.reverie.shipment.provider;

import com.reverie.order.entity.Order;
import com.reverie.shipment.entity.Shipment;

import java.time.Instant;
import java.util.Map;

/**
 * Pluggable Courier / Shipping Provider Interface (DHL / BlueDart / Shiprocket / Mock)
 */
public interface ShippingProvider {

    String getProviderName();

    ShippingGenerationResult generateAwb(Order order, String shippingMethod);

    ShippingTrackingResult trackShipment(String awbNumber);

    record ShippingGenerationResult(String awbNumber, String labelUrl, Instant estimatedDelivery, Map<String, Object> metadata) {}

    record ShippingTrackingResult(String status, String location, String description, Instant timestamp) {}
}
