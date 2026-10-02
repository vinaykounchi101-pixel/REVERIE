package com.reverie.user.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.user.dto.UpdateProfileRequest;
import com.reverie.user.dto.UserDto;
import com.reverie.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers/me")
@Tag(name = "Customer Account", description = "Current authenticated customer profile and settings")
public class CustomerController {

    private final UserService userService;

    public CustomerController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get Current Profile", description = "Retrieves profile details of the authenticated customer.")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentCustomer(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        UserDto user = userService.getCurrentUser(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PatchMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Update Profile", description = "Updates profile name or phone number for the authenticated customer.")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody UpdateProfileRequest request) {
        UserDto updated = userService.updateProfile(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }
}
