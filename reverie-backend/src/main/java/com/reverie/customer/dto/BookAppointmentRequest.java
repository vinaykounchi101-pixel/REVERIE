package com.reverie.customer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public class BookAppointmentRequest {

    @NotBlank(message = "Client name is required")
    private String clientName;

    @NotBlank(message = "Client email is required")
    @Email(message = "Email must be valid")
    private String clientEmail;

    @NotBlank(message = "Client phone is required")
    private String clientPhone;

    private String consultationType = "PRIVATE_SUITE";

    @NotNull(message = "Preferred date and time is required")
    @Future(message = "Preferred consultation must be in the future")
    private Instant preferredDatetime;

    private String specialRequests;

    public BookAppointmentRequest() {}

    public BookAppointmentRequest(String clientName, String clientEmail, String clientPhone, String consultationType, Instant preferredDatetime, String specialRequests) {
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
        this.consultationType = consultationType != null ? consultationType : "PRIVATE_SUITE";
        this.preferredDatetime = preferredDatetime;
        this.specialRequests = specialRequests;
    }

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

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }
}
