package com.reverie.customer.dto;

import com.reverie.customer.entity.AppointmentStatus;
import com.reverie.customer.entity.ConciergeAppointment;

import java.time.Instant;
import java.util.UUID;

public class ConciergeAppointmentDto {

    private UUID id;
    private UUID userId;
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private String consultationType;
    private Instant preferredDatetime;
    private AppointmentStatus status;
    private String specialRequests;
    private String notes;
    private Instant createdAt;

    public ConciergeAppointmentDto() {}

    public static ConciergeAppointmentDto fromEntity(ConciergeAppointment appt) {
        ConciergeAppointmentDto dto = new ConciergeAppointmentDto();
        dto.setId(appt.getId());
        dto.setUserId(appt.getUser() != null ? appt.getUser().getId() : null);
        dto.setClientName(appt.getClientName());
        dto.setClientEmail(appt.getClientEmail());
        dto.setClientPhone(appt.getClientPhone());
        dto.setConsultationType(appt.getConsultationType());
        dto.setPreferredDatetime(appt.getPreferredDatetime());
        dto.setStatus(appt.getStatus());
        dto.setSpecialRequests(appt.getSpecialRequests());
        dto.setNotes(appt.getNotes());
        dto.setCreatedAt(appt.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public String getClientPhone() { return clientPhone; }
    public void setClientPhone(String clientPhone) { this.clientPhone = clientPhone; }

    public String getConsultationType() { return consultationType; }
    public void setConsultationType(String consultationType) { this.consultationType = consultationType; }

    public Instant getPreferredDatetime() { return preferredDatetime; }
    public void setPreferredDatetime(Instant preferredDatetime) { this.preferredDatetime = preferredDatetime; }

    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
