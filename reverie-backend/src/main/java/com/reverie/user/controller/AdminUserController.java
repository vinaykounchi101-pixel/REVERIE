package com.reverie.user.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.user.dto.UserDto;
import com.reverie.user.entity.Role;
import com.reverie.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
@Tag(name = "Admin User Management", description = "Endpoints for administering users, client dossiers, and role permissions")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(summary = "Get paginated users", description = "Retrieves all clientele and staff with search and role filter")
    public ResponseEntity<ApiResponse<Page<UserDto>>> getUsers(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String role,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UserDto> users = userService.getUsersPaginated(query, role, pageable);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @PatchMapping("/{userId}/role")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Update user role", description = "Assigns an administrative or customer role to a user")
    public ResponseEntity<ApiResponse<UserDto>> updateRole(
            @PathVariable UUID userId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserPrincipal adminPrincipal) {
        String roleStr = body.get("role");
        if (roleStr == null || roleStr.isBlank()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Role name is required");
        }
        Role newRole = Role.valueOf(roleStr.trim().toUpperCase());
        UserDto updated = userService.updateUserRole(userId, newRole, adminPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Role updated successfully", updated));
    }

    @PatchMapping("/{userId}/status")
    @Operation(summary = "Toggle user active status", description = "Activates or deactivates a user account")
    public ResponseEntity<ApiResponse<UserDto>> toggleStatus(
            @PathVariable UUID userId,
            @RequestBody Map<String, Boolean> body,
            @AuthenticationPrincipal UserPrincipal adminPrincipal) {
        Boolean active = body.get("active");
        if (active == null) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Active status boolean is required");
        }
        UserDto updated = userService.toggleUserStatus(userId, active, adminPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("User status updated", updated));
    }
}
