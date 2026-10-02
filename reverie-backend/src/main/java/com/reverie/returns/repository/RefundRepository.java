package com.reverie.returns.repository;

import com.reverie.returns.entity.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RefundRepository extends JpaRepository<Refund, UUID> {

    List<Refund> findByOrderId(UUID orderId);

    List<Refund> findByPaymentId(UUID paymentId);
}
