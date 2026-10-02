package com.reverie.customer.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.customer.dto.BookAppointmentRequest;
import com.reverie.customer.dto.ConciergeAppointmentDto;
import com.reverie.customer.entity.AppointmentStatus;
import com.reverie.customer.service.ConciergeService;
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
@RequestMapping("/api/concierge")
@Tag(name = "VIP Concierge & Consultations", description = "Endpoints for luxury watch consultation bookings and scheduling")
public class ConciergeController {

    private final ConciergeService conciergeService;

    public ConciergeController(ConciergeService conciergeService) {
        this.conciergeService = conciergeService;
    }

    @PostMapping("/book")
    @Operation(summary = "Book VIP appointment", description = "Schedules private suite or virtual horology consultation")
    public ResponseEntity<ApiResponse<ConciergeAppointmentDto>> bookAppointment(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody BookAppointmentRequest request) {
        UUID userId = (principal != null) ? principal.getId() : null;
        ConciergeAppointmentDto appointment = conciergeService.bookAppointment(userId, request);
        return ResponseEntity.ok(ApiResponse.success("VIP Consultation booked successfully", appointment));
    }

    @GetMapping("/my-appointments")
    @Operation(summary = "Get user appointments", description = "Retrieves all VIP consultations booked by authenticated client")
    public ResponseEntity<ApiResponse<List<ConciergeAppointmentDto>>> getMyAppointments(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<ConciergeAppointmentDto> appointments = conciergeService.getUserAppointments(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(appointments));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get appointment details", description = "Retrieves details of a specific concierge consultation")
    public ResponseEntity<ApiResponse<ConciergeAppointmentDto>> getAppointment(@PathVariable UUID id) {
        ConciergeAppointmentDto appointment = conciergeService.getAppointment(id);
        return ResponseEntity.ok(ApiResponse.success(appointment));
    }

    @PostMapping("/admin/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'SUPPORT_REP')")
    @Operation(summary = "Admin: Update appointment status", description = "Confirms, reschedules, or completes VIP concierge appointment")
    public ResponseEntity<ApiResponse<ConciergeAppointmentDto>> updateStatus(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id,
            @RequestParam AppointmentStatus status,
            @RequestParam(required = false) String notes) {
        ConciergeAppointmentDto appointment = conciergeService.updateStatus(id, status, notes, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Appointment status updated", appointment));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'SUPPORT_REP')")
    @Operation(summary = "Admin: List all appointments", description = "Retrieves all VIP concierge consultations with pagination and status filter")
    public ResponseEntity<ApiResponse<Page<ConciergeAppointmentDto>>> getAllAppointments(
            @RequestParam(required = false) AppointmentStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ConciergeAppointmentDto> appointments = conciergeService.getAllAppointmentsAdmin(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(appointments));
    }
}
