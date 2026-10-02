package com.reverie.customer.entity;

import com.reverie.user.entity.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "concierge_appointments")
public class ConciergeAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "client_name", nullable = false, length = 150)
    private String clientName;

    @Column(name = "client_email", nullable = false, length = 150)
    private String clientEmail;

    @Column(name = "client_phone", nullable = false, length = 20)
    private String clientPhone;

    @Column(name = "consultation_type", nullable = false, length = 50)
    private String consultationType = "PRIVATE_SUITE";

    @Column(name = "preferred_datetime", nullable = false)
    private Instant preferredDatetime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private AppointmentStatus status = AppointmentStatus.REQUESTED;

    @Column(name = "special_requests", columnDefinition = "TEXT")
    private String specialRequests;

    @Column(length = 500)
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public ConciergeAppointment() {}

    public ConciergeAppointment(User user, String clientName, String clientEmail, String clientPhone, String consultationType, Instant preferredDatetime, String specialRequests) {
        this.user = user;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
        this.consultationType = consultationType != null ? consultationType : "PRIVATE_SUITE";
        this.preferredDatetime = preferredDatetime;
        this.specialRequests = specialRequests;
        this.status = AppointmentStatus.REQUESTED;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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
