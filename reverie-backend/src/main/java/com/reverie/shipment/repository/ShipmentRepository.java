package com.reverie.shipment.repository;

import com.reverie.shipment.entity.Shipment;
import com.reverie.shipment.entity.ShipmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, UUID> {

    List<Shipment> findByOrderId(UUID orderId);

    Optional<Shipment> findByAwb(String awb);

    Optional<Shipment> findTopByOrderIdOrderByCreatedAtDesc(UUID orderId);

    Page<Shipment> findByStatus(ShipmentStatus status, Pageable pageable);
}
