package com.reverie.payment.repository;

import com.reverie.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    List<Payment> findByOrderId(UUID orderId);

    Optional<Payment> findByProviderRef(String providerRef);

    Optional<Payment> findTopByOrderIdOrderByCreatedAtDesc(UUID orderId);
}
