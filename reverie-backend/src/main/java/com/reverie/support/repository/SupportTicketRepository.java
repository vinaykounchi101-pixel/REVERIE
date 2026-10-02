package com.reverie.support.repository;

import com.reverie.support.entity.SupportTicket;
import com.reverie.support.entity.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, UUID> {

    List<SupportTicket> findByUserIdOrderByCreatedAtDesc(UUID userId);

    Optional<SupportTicket> findByIdAndUserId(UUID id, UUID userId);

    Optional<SupportTicket> findByTicketNumber(String ticketNumber);

    Page<SupportTicket> findByStatus(TicketStatus status, Pageable pageable);

    Page<SupportTicket> findByAssignedToId(UUID assignedToId, Pageable pageable);
}
