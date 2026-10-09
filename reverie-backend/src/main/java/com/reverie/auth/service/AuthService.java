package com.reverie.auth.service;

import com.reverie.audit.service.AuditService;
import com.reverie.auth.dto.*;
import com.reverie.auth.entity.OtpToken;
import com.reverie.auth.entity.RefreshToken;
import com.reverie.auth.jwt.JwtTokenProvider;
import com.reverie.auth.repository.OtpTokenRepository;
import com.reverie.auth.repository.RefreshTokenRepository;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ConflictException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.user.dto.UserDto;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final SecureRandom secureRandom = new SecureRandom();

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final OtpTokenRepository otpTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final RateLimiterService rateLimiterService;
    private final AuditService auditService;
    private final EmailService emailService;

    @Value("${app.auth.access-token-expiration-seconds:900}")
    private long jwtExpirationSeconds;

    @Value("${app.auth.refresh-token-expiration-seconds:604800}")
    private long refreshExpirationSeconds;

    @Value("${app.auth.otp-expiry-minutes:10}")
    private long otpExpiryMinutes;

    @Value("${app.auth.otp-max-attempts:5}")
    private int otpMaxAttempts;

    @Value("${app.auth.google-client-id:}")
    private String googleClientId;

    public String getGoogleClientId() {
        return googleClientId != null ? googleClientId.trim() : "";
    }

    public AuthService(
            UserRepository userRepository,
            RefreshTokenRepository refreshTokenRepository,
            OtpTokenRepository otpTokenRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            RateLimiterService rateLimiterService,
            AuditService auditService,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.otpTokenRepository = otpTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.rateLimiterService = rateLimiterService;
        this.auditService = auditService;
        this.emailService = emailService;
    }

    @Transactional
    public UserDto register(RegisterRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);
        String emailClean = request.getEmail().toLowerCase().trim();

        if (userRepository.existsByEmail(emailClean)) {
            throw new ConflictException(ErrorCode.CONFLICT, "An account with this email address already exists. Please sign in.");
        }

        // FR-AUTH-032: Public registration MUST strictly create CUSTOMER role
        User user = new User(
                emailClean,
                passwordEncoder.encode(request.getPassword()),
                request.getFirstName().trim(),
                request.getLastName().trim(),
                request.getPhone(),
                Role.CUSTOMER
        );
        user.setVerified(false);

        User savedUser = userRepository.save(user);

        // Generate initial 6-digit email verification OTP
        generateAndSaveOtp(savedUser, savedUser.getEmail(), "EMAIL_VERIFICATION");

        auditService.logAction("CUSTOMER", savedUser.getId(), "USER_REGISTER", "USER", savedUser.getId(), "SUCCESS", clientIp, null);

        return UserDto.fromEntity(savedUser);
    }

    @Transactional
    public AuthResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);
        String rateLimitKey = "login:" + request.getEmail().toLowerCase() + ":" + clientIp;
        rateLimiterService.checkRateLimit(rateLimitKey, 5, 900); // 5 attempts per 15 min

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> {
                    auditService.logAction("GUEST", null, "USER_LOGIN_FAILED", "USER", null, "FAILURE", clientIp, "User not found");
                    return new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS);
                });

        if (!user.isActive()) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Account is disabled. Please contact customer support.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            auditService.logAction("CUSTOMER", user.getId(), "USER_LOGIN_FAILED", "USER", user.getId(), "FAILURE", clientIp, "Password mismatch");
            throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS);
        }

        if (!user.isVerified()) {
            auditService.logAction("CUSTOMER", user.getId(), "LOGIN_UNVERIFIED_REJECTED", "USER", user.getId(), "FORBIDDEN", clientIp, "Account unverified");
            throw new BusinessException(ErrorCode.FORBIDDEN, "EMAIL_UNVERIFIED: Your account is unverified. Please verify your email address to continue.");
        }

        rateLimiterService.reset(rateLimitKey);

        return issueTokens(user, clientIp, "USER_LOGIN");
    }

    @Transactional
    public AuthResponse oauthLogin(OAuthLoginRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);
        String verifiedEmail;
        String firstName = request.getFirstName();
        String lastName = request.getLastName();

        if (request.getIdToken() != null && !request.getIdToken().isBlank()) {
            try {
                // Decode and verify Google ID token claims
                String[] parts = request.getIdToken().split("\\.");
                if (parts.length < 2) {
                    throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Malformed Google ID token");
                }
                String payloadJson = new String(java.util.Base64.getUrlDecoder().decode(parts[1]), java.nio.charset.StandardCharsets.UTF_8);
                com.fasterxml.jackson.databind.JsonNode claims = new com.fasterxml.jackson.databind.ObjectMapper().readTree(payloadJson);
                
                String iss = claims.has("iss") ? claims.get("iss").asText() : "";
                if (!"https://accounts.google.com".equals(iss) && !"accounts.google.com".equals(iss)) {
                    throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid Google ID token issuer: " + iss);
                }
                
                if (googleClientId != null && !googleClientId.isBlank() && claims.has("aud")) {
                    String aud = claims.get("aud").asText();
                    if (!googleClientId.equals(aud)) {
                        throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid Google ID token audience");
                    }
                }
                
                long exp = claims.has("exp") ? claims.get("exp").asLong() : 0L;
                if (exp > 0 && Instant.ofEpochSecond(exp).isBefore(Instant.now())) {
                    throw new BusinessException(ErrorCode.AUTH_TOKEN_EXPIRED, "Google ID token has expired");
                }
                
                if (!claims.has("email")) {
                    throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Google ID token missing verified email");
                }
                
                verifiedEmail = claims.get("email").asText().toLowerCase().trim();
                if (claims.has("given_name") && (firstName == null || firstName.isBlank())) {
                    firstName = claims.get("given_name").asText();
                }
                if (claims.has("family_name") && (lastName == null || lastName.isBlank())) {
                    lastName = claims.get("family_name").asText();
                }
            } catch (BusinessException be) {
                throw be;
            } catch (Exception ex) {
                log.error("Failed to verify Google ID token: {}", ex.getMessage());
                throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid or unverified Google ID token");
            }
        } else if (request.getEmail() != null && !request.getEmail().isBlank()) {
            if ("production".equalsIgnoreCase(System.getProperty("app.environment", System.getenv().getOrDefault("APP_ENVIRONMENT", "local")))) {
                throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "ID token is strictly required for Google OAuth authentication in production.");
            }
            verifiedEmail = request.getEmail().toLowerCase().trim();
        } else {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Either a valid Google ID token or email address must be provided.");
        }

        final String finalFirstName = (firstName != null && !firstName.isBlank()) ? firstName.trim() : "Collector";
        final String finalLastName = (lastName != null && !lastName.isBlank()) ? lastName.trim() : "Member";

        User user = userRepository.findByEmail(verifiedEmail).orElseGet(() -> {
            String randomSecret = UUID.randomUUID().toString() + UUID.randomUUID().toString();
            User newUser = new User(
                    verifiedEmail,
                    passwordEncoder.encode(randomSecret),
                    finalFirstName,
                    finalLastName,
                    null,
                    Role.CUSTOMER
            );
            newUser.setVerified(true);
            User saved = userRepository.save(newUser);
            auditService.logAction("CUSTOMER", saved.getId(), "USER_REGISTER_OAUTH", "USER", saved.getId(), "SUCCESS", clientIp, "Provider: " + request.getProvider());
            return saved;
        });

        if (!user.isActive()) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Account is disabled. Please contact customer support.");
        }

        if (!user.isVerified()) {
            user.setVerified(true);
            userRepository.save(user);
        }

        auditService.logAction(user.getRole().name(), user.getId(), "USER_LOGIN_OAUTH", "SESSION", null, "SUCCESS", clientIp, "Provider: " + request.getProvider());
        return issueTokens(user, clientIp, "USER_LOGIN_OAUTH");
    }

    @Transactional(readOnly = true)
    public boolean checkEmailExists(String email) {
        if (email == null || email.isBlank()) return false;
        return userRepository.existsByEmail(email.toLowerCase().trim());
    }

    @Transactional
    public AuthResponse adminLogin(LoginRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);
        String rateLimitKey = "admin_login:" + request.getEmail().toLowerCase() + ":" + clientIp;
        rateLimiterService.checkRateLimit(rateLimitKey, 5, 900);

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS));

        // FR-AUTH-031: Customer tokens must never authorize admin boundaries
        if (!user.getRole().isAdmin()) {
            auditService.logAction("CUSTOMER", user.getId(), "ADMIN_LOGIN_UNAUTHORIZED", "ADMIN", user.getId(), "DENIED", clientIp, null);
            throw new BusinessException(ErrorCode.FORBIDDEN, "Access to administration console is forbidden.");
        }

        if (!user.isActive()) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Admin account is disabled.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            auditService.logAction(user.getRole().name(), user.getId(), "ADMIN_LOGIN_FAILED", "ADMIN", user.getId(), "FAILURE", clientIp, null);
            throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS);
        }

        rateLimiterService.reset(rateLimitKey);

        return issueTokens(user, clientIp, "ADMIN_LOGIN");
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request, HttpServletRequest httpRequest) {
        String rawToken = request.getRefreshToken();
        String tokenHash = JwtTokenProvider.hashToken(rawToken);

        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_TOKEN_INVALID, "Invalid refresh token."));

        User user = storedToken.getUser();

        // FR-AUTH-012: Refresh token reuse detection
        if (storedToken.isRevoked()) {
            log.warn("Refresh token reuse detected for user {}. Revoking all tokens.", user.getId());
            refreshTokenRepository.revokeAllUserTokens(user.getId());
            auditService.logAction("SECURITY", user.getId(), "REFRESH_TOKEN_REUSE_DETECTED", "TOKEN", storedToken.getId(), "REVOKED_ALL", getClientIp(httpRequest), null);
            throw new BusinessException(ErrorCode.AUTH_TOKEN_INVALID, "Compromised token detected. All sessions terminated.");
        }

        if (storedToken.isExpired()) {
            throw new BusinessException(ErrorCode.AUTH_TOKEN_EXPIRED, "Refresh token expired. Please log in again.");
        }

        // Rotate: mark old token revoked and issue new pair
        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        return issueTokens(user, getClientIp(httpRequest), "REFRESH_TOKEN_ROTATED");
    }

    @Transactional
    public AuthResponse verifyEmail(VerifyEmailRequest request, HttpServletRequest httpRequest) {
        String email = request.getEmail().toLowerCase().trim();
        OtpToken otpToken = otpTokenRepository.findTopByIdentifierAndTokenTypeAndUsedAtIsNullOrderByCreatedAtDesc(
                email, "EMAIL_VERIFICATION")
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Verification code not found or already used."));

        if (otpToken.isExpired()) {
            throw new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Verification code has expired.");
        }

        if (otpToken.getAttempts() >= otpMaxAttempts) {
            throw new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Maximum verification attempts exceeded.");
        }

        otpToken.setAttempts(otpToken.getAttempts() + 1);

        String expectedHash = JwtTokenProvider.hashToken(request.getOtp());
        if (!expectedHash.equals(otpToken.getOtpHash())) {
            otpTokenRepository.save(otpToken);
            throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid verification code.");
        }

        otpToken.setUsedAt(Instant.now());
        otpTokenRepository.save(otpToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));
        user.setVerified(true);
        userRepository.save(user);

        // Transmit official Welcome Email to verified collector
        try {
            emailService.sendWelcomeEmail(user.getEmail(), user.getFirstName());
        } catch (Exception ex) {
            log.warn("Welcome email dispatch failed: {}", ex.getMessage());
        }

        auditService.logAction("CUSTOMER", user.getId(), "EMAIL_VERIFIED", "USER", user.getId(), "SUCCESS", getClientIp(httpRequest), null);

        return issueTokens(user, getClientIp(httpRequest), "EMAIL_VERIFIED_LOGIN");
    }

    @Transactional
    public void requestLoginOtp(ResendOtpRequest request, HttpServletRequest httpRequest) {
        String email = request.getEmail().toLowerCase().trim();
        String clientIp = getClientIp(httpRequest);
        String rateLimitKey = "login_otp:" + email + ":" + clientIp;
        rateLimiterService.checkRateLimit(rateLimitKey, 10, 900);

        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && !user.isActive()) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Account is disabled. Please contact customer support.");
        }

        String type = (request.getType() != null && !request.getType().isBlank()) ? request.getType() : "EMAIL_LOGIN";
        generateAndSaveOtp(user, email, type);

        String role = user != null ? user.getRole().name() : "GUEST";
        UUID userId = user != null ? user.getId() : null;
        auditService.logAction(role, userId, "LOGIN_OTP_REQUESTED", "USER", userId, "SUCCESS", clientIp, null);
    }

    @Transactional
    public AuthResponse verifyLoginOtp(VerifyEmailRequest request, HttpServletRequest httpRequest) {
        String email = request.getEmail().toLowerCase().trim();
        String clientIp = getClientIp(httpRequest);

        OtpToken otpToken = otpTokenRepository.findTopByIdentifierAndTokenTypeAndUsedAtIsNullOrderByCreatedAtDesc(
                email, "EMAIL_LOGIN")
                .or(() -> otpTokenRepository.findTopByIdentifierAndTokenTypeAndUsedAtIsNullOrderByCreatedAtDesc(
                        email, "CHECKOUT_VERIFICATION"))
                .or(() -> otpTokenRepository.findTopByIdentifierAndTokenTypeAndUsedAtIsNullOrderByCreatedAtDesc(
                        email, "EMAIL_VERIFICATION"))
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Verification code not found or already used."));

        if (otpToken.isExpired()) {
            throw new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Verification code has expired.");
        }

        if (otpToken.getAttempts() >= otpMaxAttempts) {
            throw new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Maximum verification attempts exceeded.");
        }

        otpToken.setAttempts(otpToken.getAttempts() + 1);

        String expectedHash = JwtTokenProvider.hashToken(request.getOtp());
        if (!expectedHash.equals(otpToken.getOtpHash())) {
            otpTokenRepository.save(otpToken);
            throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid verification code.");
        }

        otpToken.setUsedAt(Instant.now());
        otpTokenRepository.save(otpToken);

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            String randomSecret = UUID.randomUUID().toString() + UUID.randomUUID().toString();
            User newUser = new User(
                    email,
                    passwordEncoder.encode(randomSecret),
                    "Collector",
                    "Member",
                    null,
                    Role.CUSTOMER
            );
            newUser.setVerified(true);
            return userRepository.save(newUser);
        });

        if (!user.isActive()) {
            throw new BusinessException(ErrorCode.FORBIDDEN, "Account is disabled. Please contact customer support.");
        }

        if (!user.isVerified()) {
            user.setVerified(true);
            userRepository.save(user);
        }

        auditService.logAction(user.getRole().name(), user.getId(), "LOGIN_OTP_VERIFIED", "USER", user.getId(), "SUCCESS", clientIp, null);

        return issueTokens(user, clientIp, "USER_LOGIN_OTP");
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request, HttpServletRequest httpRequest) {
        String email = request.getEmail().toLowerCase().trim();
        userRepository.findByEmail(email).ifPresent(user -> {
            generateAndSaveOtp(user, email, "PASSWORD_RESET");
            auditService.logAction("CUSTOMER", user.getId(), "PASSWORD_RESET_REQUESTED", "USER", user.getId(), "SUCCESS", getClientIp(httpRequest), null);
        });
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request, HttpServletRequest httpRequest) {
        String email = request.getEmail().toLowerCase().trim();
        OtpToken otpToken = otpTokenRepository.findTopByIdentifierAndTokenTypeAndUsedAtIsNullOrderByCreatedAtDesc(
                email, "PASSWORD_RESET")
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Password reset token is invalid or expired."));

        if (otpToken.isExpired()) {
            throw new BusinessException(ErrorCode.AUTH_OTP_EXPIRED, "Password reset token has expired.");
        }

        String expectedHash = JwtTokenProvider.hashToken(request.getToken());
        if (!expectedHash.equals(otpToken.getOtpHash())) {
            otpToken.setAttempts(otpToken.getAttempts() + 1);
            otpTokenRepository.save(otpToken);
            throw new BusinessException(ErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid reset token.");
        }

        otpToken.setUsedAt(Instant.now());
        otpTokenRepository.save(otpToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        // FR-AUTH-004: Invalidate all existing refresh tokens
        refreshTokenRepository.revokeAllUserTokens(user.getId());

        auditService.logAction("CUSTOMER", user.getId(), "PASSWORD_RESET_COMPLETED", "USER", user.getId(), "SUCCESS", getClientIp(httpRequest), null);
    }

    @Transactional
    public void logout(UUID userId, String rawRefreshToken, HttpServletRequest httpRequest) {
        if (rawRefreshToken != null && !rawRefreshToken.isBlank()) {
            String tokenHash = JwtTokenProvider.hashToken(rawRefreshToken);
            refreshTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
                token.setRevoked(true);
                refreshTokenRepository.save(token);
            });
        } else if (userId != null) {
            refreshTokenRepository.revokeAllUserTokens(userId);
        }
        auditService.logAction("USER", userId, "USER_LOGOUT", "SESSION", null, "SUCCESS", getClientIp(httpRequest), null);
    }

    private AuthResponse issueTokens(User user, String clientIp, String action) {
        String accessToken = tokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole());

        // Generate opaque 64-char refresh token
        String rawRefreshToken = UUID.randomUUID().toString().replace("-", "") + UUID.randomUUID().toString().replace("-", "");
        String tokenHash = JwtTokenProvider.hashToken(rawRefreshToken);
        Instant expiresAt = Instant.now().plus(refreshExpirationSeconds, ChronoUnit.SECONDS);

        RefreshToken refreshToken = new RefreshToken(user, tokenHash, expiresAt);
        refreshTokenRepository.save(refreshToken);

        auditService.logAction(user.getRole().name(), user.getId(), action, "SESSION", refreshToken.getId(), "SUCCESS", clientIp, null);

        return new AuthResponse(accessToken, rawRefreshToken, jwtExpirationSeconds, UserDto.fromEntity(user));
    }

    @Transactional
    public void resendOtp(ResendOtpRequest request, HttpServletRequest httpRequest) {
        String email = request.getEmail().toLowerCase().trim();
        String type = (request.getType() != null && !request.getType().isBlank()) ? request.getType() : "EMAIL_VERIFICATION";

        User user = userRepository.findByEmail(email).orElse(null);
        generateAndSaveOtp(user, email, type);
        
        String role = user != null ? user.getRole().name() : "GUEST";
        UUID userId = user != null ? user.getId() : null;
        auditService.logAction(role, userId, "OTP_RESENT", "USER", userId, "SUCCESS", getClientIp(httpRequest), null);
    }

    private void generateAndSaveOtp(User user, String identifier, String type) {
        String rawOtp = String.format("%06d", secureRandom.nextInt(1_000_000));
        String otpHash = JwtTokenProvider.hashToken(rawOtp);
        Instant expiresAt = Instant.now().plus(otpExpiryMinutes, ChronoUnit.MINUTES);

        OtpToken otpToken = new OtpToken(user, identifier, otpHash, type, expiresAt);
        otpTokenRepository.save(otpToken);

        // Transmit luxury branded email via configured SMTP (Gmail)
        String recipientName = user != null ? user.getFirstName() : null;
        if ("EMAIL_VERIFICATION".equalsIgnoreCase(type)) {
            emailService.sendEmailVerificationOtp(identifier, recipientName, rawOtp);
        } else if ("CHECKOUT_VERIFICATION".equalsIgnoreCase(type)) {
            emailService.sendCheckoutVerificationOtp(identifier, recipientName, rawOtp);
        } else if ("EMAIL_LOGIN".equalsIgnoreCase(type) || "LOGIN_OTP".equalsIgnoreCase(type)) {
            emailService.sendLoginOtp(identifier, recipientName, rawOtp);
        } else if ("PASSWORD_RESET".equalsIgnoreCase(type)) {
            emailService.sendPasswordResetOtp(identifier, recipientName, rawOtp);
        }

        log.info("[NOTIFICATION DISPATCH] Dispatched {} OTP to {}", type, identifier);
    }

    private String getClientIp(HttpServletRequest request) {
        if (request == null) return "127.0.0.1";
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
