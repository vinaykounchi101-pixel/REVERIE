package com.reverie.emailautomation.service;

import com.reverie.audit.service.AuditService;
import com.reverie.auth.dto.AuthResponse;
import com.reverie.auth.dto.LoginRequest;
import com.reverie.auth.jwt.JwtTokenProvider;
import com.reverie.auth.repository.OtpTokenRepository;
import com.reverie.auth.repository.RefreshTokenRepository;
import com.reverie.auth.service.AuthService;
import com.reverie.auth.service.EmailService;
import com.reverie.auth.service.RateLimiterService;
import com.reverie.common.error.BusinessException;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceLoginNotificationTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private OtpTokenRepository otpTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private RateLimiterService rateLimiterService;

    @Mock
    private AuditService auditService;

    @Mock
    private EmailService emailService;

    @Mock
    private EmailAutomationService emailAutomationService;

    @Mock
    private HttpServletRequest httpRequest;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
                userRepository,
                refreshTokenRepository,
                otpTokenRepository,
                passwordEncoder,
                tokenProvider,
                rateLimiterService,
                auditService,
                emailService,
                emailAutomationService
        );
        when(httpRequest.getRemoteAddr()).thenReturn("127.0.0.1");
    }

    @Test
    @DisplayName("Customer password login triggers email automation notification dispatch")
    void testCustomerLogin_TriggersNotification() {
        User customer = new User("collector@reverie.luxury", "encodedHash", "Gérald", "Genta", null, Role.CUSTOMER);
        customer.setId(UUID.randomUUID());
        customer.setVerified(true);
        customer.setActive(true);

        when(userRepository.findByEmail("collector@reverie.luxury")).thenReturn(Optional.of(customer));
        when(passwordEncoder.matches("ValidPassword123!", "encodedHash")).thenReturn(true);
        when(tokenProvider.generateToken(any(), any(), any())).thenReturn("mock-access-token");

        LoginRequest request = new LoginRequest("collector@reverie.luxury", "ValidPassword123!");
        AuthResponse response = authService.login(request, httpRequest);

        assertNotNull(response);
        assertEquals("mock-access-token", response.getAccessToken());

        // Verification: Must dispatch customer login notification
        verify(emailAutomationService, times(1)).dispatchCustomerLoginNotification(eq(customer), any());
    }

    @Test
    @DisplayName("Admin portal login NEVER triggers customer login notification")
    void testAdminLogin_NeverTriggersCustomerNotification() {
        User admin = new User("admin@reverie.luxury", "encodedHash", "Master", "Horologist", null, Role.ADMIN);
        admin.setId(UUID.randomUUID());
        admin.setVerified(true);
        admin.setActive(true);

        when(userRepository.findByEmail("admin@reverie.luxury")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("AdminSecret123!", "encodedHash")).thenReturn(true);
        when(tokenProvider.generateToken(any(), any(), any())).thenReturn("mock-admin-token");

        LoginRequest request = new LoginRequest("admin@reverie.luxury", "AdminSecret123!");
        AuthResponse response = authService.adminLogin(request, httpRequest);

        assertNotNull(response);

        // Verification: Admin login MUST NOT dispatch customer notification
        verify(emailAutomationService, never()).dispatchCustomerLoginNotification(any(), any());
    }

    @Test
    @DisplayName("Failed login attempt with bad credentials does NOT trigger notification")
    void testFailedLogin_NeverTriggersNotification() {
        User customer = new User("collector@reverie.luxury", "encodedHash", "Gérald", "Genta", null, Role.CUSTOMER);
        customer.setId(UUID.randomUUID());
        customer.setVerified(true);
        customer.setActive(true);

        when(userRepository.findByEmail("collector@reverie.luxury")).thenReturn(Optional.of(customer));
        when(passwordEncoder.matches("WrongPassword", "encodedHash")).thenReturn(false);

        LoginRequest request = new LoginRequest("collector@reverie.luxury", "WrongPassword");

        assertThrows(BusinessException.class, () -> authService.login(request, httpRequest));

        // Verification: Failed login must never trigger notification
        verify(emailAutomationService, never()).dispatchCustomerLoginNotification(any(), any());
    }
}
