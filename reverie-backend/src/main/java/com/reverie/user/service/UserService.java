package com.reverie.user.service;

import com.reverie.audit.service.AuditService;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.user.dto.UpdateProfileRequest;
import com.reverie.user.dto.UserDto;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuditService auditService;

    public UserService(UserRepository userRepository, AuditService auditService) {
        this.userRepository = userRepository;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public UserDto getCurrentUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));
        return UserDto.fromEntity(user);
    }

    @Transactional
    public UserDto updateProfile(UUID userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));

        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone().trim());
        }

        User updatedUser = userRepository.save(user);
        return UserDto.fromEntity(updatedUser);
    }

    @Transactional(readOnly = true)
    public Page<UserDto> getUsersPaginated(String query, String roleStr, Pageable pageable) {
        Page<User> users;
        if (roleStr != null && !roleStr.isBlank() && !roleStr.equalsIgnoreCase("ALL")) {
            try {
                Role role = Role.valueOf(roleStr.trim().toUpperCase());
                users = userRepository.findByRoleOrderByCreatedAtDesc(role, pageable);
            } catch (IllegalArgumentException e) {
                users = userRepository.findAllByOrderByCreatedAtDesc(pageable);
            }
        } else if (query != null && !query.isBlank()) {
            String q = query.trim();
            users = userRepository.findByEmailContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrderByCreatedAtDesc(
                    q, q, q, pageable);
        } else {
            users = userRepository.findAllByOrderByCreatedAtDesc(pageable);
        }
        return users.map(UserDto::fromEntity);
    }

    @Transactional
    public UserDto updateUserRole(UUID targetUserId, Role newRole, UUID adminActorId) {
        User user = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));

        Role oldRole = user.getRole();
        user.setRole(newRole);
        User saved = userRepository.save(user);

        auditService.logAction("ADMIN", adminActorId, "USER_ROLE_CHANGE", "USER", targetUserId,
                "SUCCESS", "127.0.0.1", "Role changed from " + oldRole + " to " + newRole);

        return UserDto.fromEntity(saved);
    }

    @Transactional
    public UserDto toggleUserStatus(UUID targetUserId, boolean isActive, UUID adminActorId) {
        User user = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));

        user.setActive(isActive);
        User saved = userRepository.save(user);

        auditService.logAction("ADMIN", adminActorId, isActive ? "USER_ACTIVATE" : "USER_DEACTIVATE", "USER", targetUserId,
                "SUCCESS", "127.0.0.1", "Active status set to " + isActive);

        return UserDto.fromEntity(saved);
    }
}
