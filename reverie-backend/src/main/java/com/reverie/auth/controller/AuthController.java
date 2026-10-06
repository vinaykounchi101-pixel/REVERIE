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

    @PostMapping({"/oauth", "/oauth/google"})
    @Operation(summary = "OAuth / Social Sign-In", description = "Authenticates via OAuth provider (e.g. Google), automatically provisioning a verified account if not found.")
    public ResponseEntity<ApiResponse<AuthResponse>> oauthLogin(
            @Valid @RequestBody OAuthLoginRequest request,
            HttpServletRequest httpRequest) {
        AuthResponse response = authService.oauthLogin(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.success("OAuth authentication successful", response));
    }

    @GetMapping("/check-email")
    @Operation(summary = "Check Email Existence", description = "Checks whether an account exists with the provided email address.")
    public ResponseEntity<ApiResponse<Boolean>> checkEmail(@RequestParam("email") String email) {
        boolean exists = authService.checkEmailExists(email);
        return ResponseEntity.ok(ApiResponse.success("Email status checked", exists));
    }

    @GetMapping("/config")
    @Operation(summary = "Public Auth Configuration", description = "Returns public client authentication keys.")
    public ResponseEntity<ApiResponse<java.util.Map<String, String>>> getAuthConfig() {
        java.util.Map<String, String> config = new java.util.HashMap<>();
        config.put("googleClientId", authService.getGoogleClientId());
        return ResponseEntity.ok(ApiResponse.success("Auth configuration retrieved", config));
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
    @Operation(summary = "Verify Email Address", description = "Validates 6-digit OTP code to verify customer account and issues session tokens.")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request,
            HttpServletRequest httpRequest) {
        AuthResponse response = authService.verifyEmail(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully.", response));
    }

    @PostMapping("/otp/request")
    @Operation(summary = "Request Login OTP", description = "Dispatches a single-use 6-digit login verification code to the registered email.")
    public ResponseEntity<ApiResponse<Void>> requestLoginOtp(
            @Valid @RequestBody ResendOtpRequest request,
            HttpServletRequest httpRequest) {
        authService.requestLoginOtp(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.message("If an account exists, a sign-in verification code has been dispatched."));
    }

    @PostMapping("/otp/verify")
    @Operation(summary = "Verify Login OTP", description = "Validates single-use 6-digit sign-in code and returns JWT authentication tokens.")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyLoginOtp(
            @Valid @RequestBody VerifyEmailRequest request,
            HttpServletRequest httpRequest) {
        AuthResponse response = authService.verifyLoginOtp(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.success("Sign-in verification successful", response));
    }

    @PostMapping("/resend-otp")
    @Operation(summary = "Resend Verification or Reset OTP", description = "Dispatches a new single-use 6-digit verification code to the registered email.")
    public ResponseEntity<ApiResponse<Void>> resendOtp(
            @Valid @RequestBody ResendOtpRequest request,
            HttpServletRequest httpRequest) {
        authService.resendOtp(request, httpRequest);
        return ResponseEntity.ok(ApiResponse.message("If an account exists, a new verification code has been dispatched."));
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
