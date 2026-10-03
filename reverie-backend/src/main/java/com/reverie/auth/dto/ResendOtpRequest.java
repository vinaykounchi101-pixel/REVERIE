package com.reverie.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ResendOtpRequest {

    @NotBlank(message = "Email address is required")
    @Email(message = "Invalid email format")
    private String email;

    private String type = "EMAIL_VERIFICATION";

    public ResendOtpRequest() {}

    public ResendOtpRequest(String email, String type) {
        this.email = email;
        this.type = type != null ? type : "EMAIL_VERIFICATION";
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
