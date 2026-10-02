package com.reverie.auth.controller;

import com.reverie.auth.dto.*;
import com.reverie.auth.security.UserPrincipal;
import com.reverie.auth.service.AuthService;
import com.reverie.common.dto.ApiResponse;
import com.reverie.user.dto.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication & Security", description = "Customer registration, JWT authentication, token rotation, and password management")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "Customer Registration", description = "Registers a new customer account and triggers email verification OTP.")
    public ResponseEntity<ApiResponse<UserDto>> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpRequest) {
        UserDto user = authService.register(request, httpRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Registration successful. Please verify your email.", user));
    }

    @PostMapping("/login")
    @Operation(summary = "Customer Login", description = "Authenticates customer credentials and returns JWT access token and refresh token.")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {
        AuthResponse response = authService.login(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.success("Authentication successful", response));
    }

    @PostMapping("/admin/login")
    @Operation(summary = "Admin Portal Login", description = "Authenticates administrator credentials and returns admin-scoped JWT token.")
    public ResponseEntity<ApiResponse<AuthResponse>> adminLogin(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {
        AuthResponse response = authService.adminLogin(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.success("Admin authentication successful", response));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh JWT Token", description = "Rotates refresh token and issues a new short-lived JWT access token.")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request,
            HttpServletRequest httpRequest) {
        AuthResponse response = authService.refreshToken(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
    }

    @PostMapping("/verify-email")
    @Operation(summary = "Verify Email Address", description = "Validates 6-digit OTP code to verify customer account.")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request,
            HttpServletRequest httpRequest) {
        authService.verifyEmail(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.message("Email verified successfully."));
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Request Password Reset", description = "Generates a time-limited password reset OTP token.")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request,
            HttpServletRequest httpRequest) {
        authService.forgotPassword(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.message("If an account exists, a reset code has been sent."));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset Password", description = "Verifies token and sets new password, invalidating all existing sessions.")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request,
            HttpServletRequest httpRequest) {
        authService.resetPassword(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.message("Password has been reset successfully."));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout & Revoke Token", description = "Revokes refresh token and terminates active session.")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestBody(required = false) RefreshTokenRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest httpRequest) {
        UUID userId = userPrincipal != null ? userPrincipal.getId() : null;
        String refreshToken = request != null ? request.getRefreshToken() : null;
        authService.logout(userId, refreshToken, httpRequest);
        return ResponseEntity.ok(ApiResponse.message("Logged out successfully."));
    }
}
