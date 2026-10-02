package com.reverie.returns.repository;

import com.reverie.returns.entity.ReturnRequest;
import com.reverie.returns.entity.ReturnStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, UUID> {

    List<ReturnRequest> findByOrderId(UUID orderId);

    Page<ReturnRequest> findByStatus(ReturnStatus status, Pageable pageable);
}
