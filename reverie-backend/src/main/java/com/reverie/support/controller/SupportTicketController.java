package com.reverie.support.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.support.dto.*;
import com.reverie.support.entity.TicketStatus;
import com.reverie.support.service.SupportTicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/support/tickets")
@Tag(name = "Customer Support & Tickets", description = "Endpoints for client support tickets and admin horology concierge inquiries")
public class SupportTicketController {

    private final SupportTicketService ticketService;

    public SupportTicketController(SupportTicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    @Operation(summary = "Submit support ticket", description = "Opens a new inquiry or service ticket for order or horology guidance")
    public ResponseEntity<ApiResponse<SupportTicketDto>> createTicket(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateTicketRequest request) {
        UUID userId = principal != null ? principal.getId() : null;
        SupportTicketDto ticket = ticketService.createTicket(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Support ticket created", ticket));
    }

    @GetMapping
    @Operation(summary = "Get user tickets", description = "Retrieves all support tickets opened by the authenticated client")
    public ResponseEntity<ApiResponse<List<SupportTicketDto>>> getUserTickets(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<SupportTicketDto> tickets = ticketService.getUserTickets(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(tickets));
    }

    @GetMapping("/{ticketId}")
    @Operation(summary = "Get ticket by ID", description = "Retrieves ticket details and message thread")
    public ResponseEntity<ApiResponse<SupportTicketDto>> getTicket(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId) {
        boolean isAdmin = principal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN") || a.getAuthority().equals("ROLE_SUPPORT_AGENT"));
        SupportTicketDto ticket = ticketService.getTicketById(ticketId, principal.getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success(ticket));
    }

    @PostMapping("/{ticketId}/messages")
    @Operation(summary = "Add message to ticket", description = "Appends a new message or reply to the support ticket thread")
    public ResponseEntity<ApiResponse<SupportTicketMessageDto>> addMessage(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @Valid @RequestBody AddTicketMessageRequest request) {
        boolean isAgentOrAdmin = principal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN") || a.getAuthority().equals("ROLE_SUPPORT_AGENT"));
        SupportTicketMessageDto msg = ticketService.addMessage(ticketId, principal.getId(), request, isAgentOrAdmin);
        return ResponseEntity.ok(ApiResponse.success("Message added", msg));
    }

    @PutMapping("/admin/{ticketId}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'SUPPORT_AGENT')")
    @Operation(summary = "Admin: Update ticket status", description = "Updates status, assignment, priority, and resolution notes")
    public ResponseEntity<ApiResponse<SupportTicketDto>> updateStatus(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID ticketId,
            @Valid @RequestBody UpdateTicketStatusRequest request) {
        SupportTicketDto ticket = ticketService.updateTicketStatus(ticketId, request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Ticket status updated", ticket));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'SUPPORT_AGENT')")
    @Operation(summary = "Admin: List all tickets", description = "Retrieves all support tickets with optional status filter and pagination")
    public ResponseEntity<ApiResponse<Page<SupportTicketDto>>> getAllTickets(
            @RequestParam(required = false) TicketStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<SupportTicketDto> tickets = ticketService.getAllTicketsAdmin(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(tickets));
    }
}
