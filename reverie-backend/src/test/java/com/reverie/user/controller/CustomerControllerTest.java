package com.reverie.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reverie.auth.jwt.JwtTokenProvider;
import com.reverie.user.dto.UpdateProfileRequest;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void shouldGetOwnProfileWhenAuthenticated() throws Exception {
        User user = new User("authenticated@reverie.app", passwordEncoder.encode("Password@123"), "Authenticated", "Client", "+919876543210", Role.CUSTOMER);
        user = userRepository.save(user);

        String jwtToken = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole());

        mockMvc.perform(get("/api/customers/me")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value("authenticated@reverie.app"))
                .andExpect(jsonPath("$.data.firstName").value("Authenticated"));
    }

    @Test
    void shouldRejectProfileRequestWithoutToken() throws Exception {
        mockMvc.perform(get("/api/customers/me"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldUpdateProfileSuccessfully() throws Exception {
        User user = new User("update@reverie.app", passwordEncoder.encode("Password@123"), "OldFirst", "OldLast", null, Role.CUSTOMER);
        user = userRepository.save(user);

        String jwtToken = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole());

        UpdateProfileRequest updateRequest = new UpdateProfileRequest("NewFirst", "NewLast", "+919999999999");

        mockMvc.perform(patch("/api/customers/me")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.firstName").value("NewFirst"))
                .andExpect(jsonPath("$.data.lastName").value("NewLast"))
                .andExpect(jsonPath("$.data.phone").value("+919999999999"));
    }
}
