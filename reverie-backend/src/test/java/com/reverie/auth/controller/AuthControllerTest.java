package com.reverie.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reverie.auth.dto.*;
import com.reverie.auth.entity.OtpToken;
import com.reverie.auth.jwt.JwtTokenProvider;
import com.reverie.auth.repository.OtpTokenRepository;
import com.reverie.auth.repository.RefreshTokenRepository;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private OtpTokenRepository otpTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private com.reverie.testutil.TestDataCleaner testDataCleaner;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();
    }

    @Test
    void shouldRegisterNewCustomerSuccessfully() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "Lucas", "Vane", "lucas@reverie.app", "Password@123", "+919876543210"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value("lucas@reverie.app"))
                .andExpect(jsonPath("$.data.role").value("CUSTOMER"))
                .andExpect(jsonPath("$.data.verified").value(false));

        User user = userRepository.findByEmail("lucas@reverie.app").orElseThrow();
        assertEquals(Role.CUSTOMER, user.getRole());
        assertTrue(passwordEncoder.matches("Password@123", user.getPasswordHash()));
    }

    @Test
    void shouldRejectDuplicateEmailRegistration() throws Exception {
        User existing = new User("duplicate@reverie.app", passwordEncoder.encode("Pass@123"), "Jane", "Doe", null, Role.CUSTOMER);
        userRepository.save(existing);

        RegisterRequest request = new RegisterRequest("Jane", "Doe", "duplicate@reverie.app", "Password@123", null);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("CONFLICT"));
    }

    @Test
    void shouldLoginSuccessfullyAndIssueJwt() throws Exception {
        User user = new User("client@reverie.app", passwordEncoder.encode("Password@123"), "Client", "User", null, Role.CUSTOMER);
        userRepository.save(user);

        LoginRequest request = new LoginRequest("client@reverie.app", "Password@123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").isNotEmpty())
                .andExpect(jsonPath("$.data.refreshToken").isNotEmpty())
                .andExpect(jsonPath("$.data.user.email").value("client@reverie.app"));
    }

    @Test
    void shouldRejectCustomerAccountOnAdminLogin() throws Exception {
        User customer = new User("customer@reverie.app", passwordEncoder.encode("Password@123"), "Cust", "Omer", null, Role.CUSTOMER);
        userRepository.save(customer);

        LoginRequest request = new LoginRequest("customer@reverie.app", "Password@123");

        mockMvc.perform(post("/api/auth/admin/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("FORBIDDEN"));
    }

    @Test
    void shouldAllowSuperAdminOnAdminLogin() throws Exception {
        User admin = new User("admin@reverie.app", passwordEncoder.encode("Password@123"), "Super", "Admin", null, Role.SUPER_ADMIN);
        userRepository.save(admin);

        LoginRequest request = new LoginRequest("admin@reverie.app", "Password@123");

        mockMvc.perform(post("/api/auth/admin/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.user.role").value("SUPER_ADMIN"));
    }

    @Test
    void shouldRotateRefreshTokenSuccessfully() throws Exception {
        User user = new User("rotate@reverie.app", passwordEncoder.encode("Password@123"), "Rotate", "User", null, Role.CUSTOMER);
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest("rotate@reverie.app", "Password@123");
        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn();

        String rawResponse = loginResult.getResponse().getContentAsString();
        String initialRefreshToken = objectMapper.readTree(rawResponse).path("data").path("refreshToken").asText();

        // Perform refresh
        RefreshTokenRequest refreshReq = new RefreshTokenRequest(initialRefreshToken);
        mockMvc.perform(post("/api/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").isNotEmpty())
                .andExpect(jsonPath("$.data.refreshToken").isNotEmpty());

        // Attempt reuse of old refresh token -> Should be rejected
        mockMvc.perform(post("/api/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshReq)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH_TOKEN_INVALID"));
    }

    @Test
    void shouldVerifyEmailWithOtp() throws Exception {
        User user = new User("verify@reverie.app", passwordEncoder.encode("Password@123"), "Verify", "User", null, Role.CUSTOMER);
        user.setVerified(false);
        userRepository.save(user);

        String rawOtp = "123456";
        String otpHash = JwtTokenProvider.hashToken(rawOtp);
        OtpToken otpToken = new OtpToken(user, user.getEmail(), otpHash, "EMAIL_VERIFICATION", Instant.now().plus(10, ChronoUnit.MINUTES));
        otpTokenRepository.save(otpToken);

        VerifyEmailRequest request = new VerifyEmailRequest("verify@reverie.app", rawOtp);

        mockMvc.perform(post("/api/auth/verify-email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        User verifiedUser = userRepository.findByEmail("verify@reverie.app").orElseThrow();
        assertTrue(verifiedUser.isVerified());
    }
}
