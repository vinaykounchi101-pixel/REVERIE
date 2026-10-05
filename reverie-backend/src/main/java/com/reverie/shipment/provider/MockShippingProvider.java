package com.reverie.shipment.provider;

import com.reverie.order.entity.Order;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class MockShippingProvider implements ShippingProvider {

    @Override
    public String getProviderName() {
        return "MOCK";
    }

    @Override
    public ShippingGenerationResult generateAwb(Order order, String shippingMethod) {
        String awb = "REV-AWB-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        Instant estDelivery = Instant.now().plus(3, ChronoUnit.DAYS);

        Map<String, Object> meta = new HashMap<>();
        meta.put("courier", "DHL Express Switzerland (Simulated)");
        meta.put("insuranceDeclared", true);

        return new ShippingGenerationResult(awb, "https://reverie.luxury/labels/" + awb, estDelivery, meta);
    }

    @Override
    public ShippingTrackingResult trackShipment(String awbNumber) {
        return new ShippingTrackingResult(
                "IN_TRANSIT",
                "Geneva Sorting Facility",
                "Package processed through international horology transit hub.",
                Instant.now()
        );
    }
}
