package com.reverie.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "OAuth / Social Sign-In Request")
public class OAuthLoginRequest {

    @Schema(example = "eyJhbGciOiJSUzI1NiIsImtpZCI6...")
    private String idToken;

    @Schema(example = "collector@example.com")
    private String email;

    @Schema(example = "Vinay")
    private String firstName;

    @Schema(example = "Kumar")
    private String lastName;

    @NotBlank(message = "Provider name is required (e.g. GOOGLE)")
    @Schema(example = "GOOGLE")
    private String provider;

    @Schema(example = "google_user_sub_123456789")
    private String providerId;

    @Schema(example = "https://lh3.googleusercontent.com/a/...")
    private String avatarUrl;

    public OAuthLoginRequest() {}

    public OAuthLoginRequest(String email, String firstName, String lastName, String provider, String providerId, String avatarUrl) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.provider = provider;
        this.providerId = providerId;
        this.avatarUrl = avatarUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
