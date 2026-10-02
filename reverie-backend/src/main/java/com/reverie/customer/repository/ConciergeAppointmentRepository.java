package com.reverie.customer.repository;

import com.reverie.customer.entity.AppointmentStatus;
import com.reverie.customer.entity.ConciergeAppointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConciergeAppointmentRepository extends JpaRepository<ConciergeAppointment, UUID> {

    List<ConciergeAppointment> findByUserId(UUID userId);

    Page<ConciergeAppointment> findByStatus(AppointmentStatus status, Pageable pageable);
}
