package com.reverie.support.service;

import com.reverie.audit.service.AuditService;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.order.entity.Order;
import com.reverie.order.repository.OrderRepository;
import com.reverie.support.dto.*;
import com.reverie.support.entity.SupportTicket;
import com.reverie.support.entity.SupportTicketMessage;
import com.reverie.support.entity.TicketStatus;
import com.reverie.support.repository.SupportTicketMessageRepository;
import com.reverie.support.repository.SupportTicketRepository;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SupportTicketService {

    private final SupportTicketRepository ticketRepository;
    private final SupportTicketMessageRepository messageRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final AuditService auditService;

    public SupportTicketService(
            SupportTicketRepository ticketRepository,
            SupportTicketMessageRepository messageRepository,
            UserRepository userRepository,
            OrderRepository orderRepository,
            AuditService auditService) {
        this.ticketRepository = ticketRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.auditService = auditService;
    }

    @Transactional
    public SupportTicketDto createTicket(UUID userId, CreateTicketRequest request) {
        User user = null;
        String clientName = request.getClientName();
        String clientEmail = request.getClientEmail();

        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                clientName = user.getFirstName() + " " + user.getLastName();
                clientEmail = user.getEmail();
            }
        }

        Order order = null;
        if (request.getOrderId() != null) {
            order = orderRepository.findById(request.getOrderId()).orElse(null);
        }

        SupportTicket ticket = new SupportTicket(
                user,
                order,
                clientName,
                clientEmail,
                request.getSubject(),
                request.getCategory(),
                request.getPriority()
        );

        ticket = ticketRepository.save(ticket);

        // Add initial message
        SupportTicketMessage msg = new SupportTicketMessage(
                ticket,
                user,
                clientName != null ? clientName : "Client",
                user != null ? user.getRole().name() : "CUSTOMER",
                request.getMessage(),
                false
        );
        messageRepository.save(msg);
        ticket.getMessages().add(msg);

        if (userId != null) {
            auditService.logAction("CUSTOMER", userId, "SUPPORT_TICKET_CREATE", "SUPPORT_TICKET", ticket.getId(), "SUCCESS", "127.0.0.1", "Ticket: " + ticket.getTicketNumber());
        }

        return SupportTicketDto.fromEntity(ticket);
    }

    @Transactional(readOnly = true)
    public List<SupportTicketDto> getUserTickets(UUID userId) {
        return ticketRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(SupportTicketDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SupportTicketDto getTicketById(UUID ticketId, UUID userId, boolean isAdmin) {
        SupportTicket ticket;
        if (isAdmin) {
            ticket = ticketRepository.findById(ticketId)
                    .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Support ticket not found"));
        } else {
            ticket = ticketRepository.findByIdAndUserId(ticketId, userId)
                    .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Support ticket not found"));
        }
        return SupportTicketDto.fromEntity(ticket);
    }

    @Transactional
    public SupportTicketMessageDto addMessage(UUID ticketId, UUID senderId, AddTicketMessageRequest request, boolean isAgentOrAdmin) {
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Support ticket not found"));

        User sender = null;
        String senderName = "Support Concierge";
        String senderRole = "SUPPORT_AGENT";

        if (senderId != null) {
            sender = userRepository.findById(senderId).orElse(null);
            if (sender != null) {
                senderName = sender.getFirstName() + " " + sender.getLastName();
                senderRole = sender.getRole().name();
            }
        }

        if (!isAgentOrAdmin && (ticket.getUser() == null || !ticket.getUser().getId().equals(senderId))) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "You are not authorized to comment on this ticket");
        }

        // If client replies, move status from WAITING_ON_CLIENT to IN_PROGRESS
        if (!isAgentOrAdmin && ticket.getStatus() == TicketStatus.WAITING_ON_CLIENT) {
            ticket.setStatus(TicketStatus.IN_PROGRESS);
            ticketRepository.save(ticket);
        }

        boolean internal = isAgentOrAdmin && Boolean.TRUE.equals(request.getIsInternalNote());

        SupportTicketMessage msg = new SupportTicketMessage(
                ticket,
                sender,
                senderName,
                senderRole,
                request.getMessage(),
                internal
        );
        msg = messageRepository.save(msg);

        return SupportTicketMessageDto.fromEntity(msg);
    }

    @Transactional
    public SupportTicketDto updateTicketStatus(UUID ticketId, UpdateTicketStatusRequest request, UUID adminId) {
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Support ticket not found"));

        ticket.setStatus(request.getStatus());

        if (request.getPriority() != null) {
            ticket.setPriority(request.getPriority());
        }

        if (request.getAssignedToId() != null) {
            User agent = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Support agent not found"));
            ticket.setAssignedTo(agent);
        }

        if (request.getResolutionNotes() != null) {
            ticket.setResolutionNotes(request.getResolutionNotes());
        }

        ticket = ticketRepository.save(ticket);

        auditService.logAction("ADMIN", adminId, "SUPPORT_TICKET_UPDATE", "SUPPORT_TICKET", ticket.getId(), "SUCCESS", "127.0.0.1", "New status: " + request.getStatus());

        return SupportTicketDto.fromEntity(ticket);
    }

    @Transactional(readOnly = true)
    public Page<SupportTicketDto> getAllTicketsAdmin(TicketStatus status, Pageable pageable) {
        if (status != null) {
            return ticketRepository.findByStatus(status, pageable).map(SupportTicketDto::fromEntity);
        }
        return ticketRepository.findAll(pageable).map(SupportTicketDto::fromEntity);
    }
}
