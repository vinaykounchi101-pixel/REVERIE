package com.reverie.customer.service;

import com.reverie.audit.service.AuditService;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.customer.dto.BookAppointmentRequest;
import com.reverie.customer.dto.ConciergeAppointmentDto;
import com.reverie.customer.entity.AppointmentStatus;
import com.reverie.customer.entity.ConciergeAppointment;
import com.reverie.customer.repository.ConciergeAppointmentRepository;
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
public class ConciergeService {

    private final ConciergeAppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final AuditService auditService;

    public ConciergeService(
            ConciergeAppointmentRepository appointmentRepository,
            UserRepository userRepository,
            AuditService auditService) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.auditService = auditService;
    }

    @Transactional
    public ConciergeAppointmentDto bookAppointment(UUID userId, BookAppointmentRequest request) {
        User user = null;
        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
        }

        ConciergeAppointment appointment = new ConciergeAppointment(
                user,
                request.getClientName(),
                request.getClientEmail(),
                request.getClientPhone(),
                request.getConsultationType(),
                request.getPreferredDatetime(),
                request.getSpecialRequests()
        );

        appointment = appointmentRepository.save(appointment);

        if (userId != null) {
            auditService.logAction("CUSTOMER", userId, "CONCIERGE_BOOK", "APPOINTMENT", appointment.getId(), "SUCCESS", "127.0.0.1", "Type: " + request.getConsultationType());
        }

        return ConciergeAppointmentDto.fromEntity(appointment);
    }

    @Transactional(readOnly = true)
    public List<ConciergeAppointmentDto> getUserAppointments(UUID userId) {
        return appointmentRepository.findByUserId(userId).stream()
                .map(ConciergeAppointmentDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ConciergeAppointmentDto getAppointment(UUID id) {
        ConciergeAppointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Concierge appointment not found"));
        return ConciergeAppointmentDto.fromEntity(appointment);
    }

    @Transactional
    public ConciergeAppointmentDto updateStatus(UUID id, AppointmentStatus status, String notes, UUID adminId) {
        ConciergeAppointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Concierge appointment not found"));

        appointment.setStatus(status);
        if (notes != null) {
            appointment.setNotes(notes);
        }
        appointment = appointmentRepository.save(appointment);

        auditService.logAction("ADMIN", adminId, "CONCIERGE_STATUS_UPDATE", "APPOINTMENT", appointment.getId(), "SUCCESS", "127.0.0.1", "New status: " + status);

        return ConciergeAppointmentDto.fromEntity(appointment);
    }

    @Transactional(readOnly = true)
    public Page<ConciergeAppointmentDto> getAllAppointmentsAdmin(AppointmentStatus status, Pageable pageable) {
        if (status != null) {
            return appointmentRepository.findByStatus(status, pageable).map(ConciergeAppointmentDto::fromEntity);
        }
        return appointmentRepository.findAll(pageable).map(ConciergeAppointmentDto::fromEntity);
    }
}
