package com.reverie.audit.controller;

import com.reverie.audit.entity.AuditLog;
import com.reverie.audit.repository.AuditLogRepository;
import com.reverie.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/audit-logs")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'ANALYST')")
@Tag(name = "Admin Audit Logs", description = "Endpoints for inspecting system actions, security events and business transactions")
public class AuditLogController {

    private final AuditLogRepository auditLogRepository;

    public AuditLogController(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping
    @Operation(summary = "Get paginated audit logs", description = "Retrieves immutable audit trail with optional keyword search")
    public ResponseEntity<ApiResponse<Page<AuditLog>>> getAuditLogs(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {

        Page<AuditLog> page;
        if (query != null && !query.isBlank()) {
            page = auditLogRepository.findByActionContainingIgnoreCaseOrResourceTypeContainingIgnoreCaseOrderByOccurredAtDesc(
                    query.trim(), query.trim(), pageable);
        } else {
            page = auditLogRepository.findAllByOrderByOccurredAtDesc(pageable);
        }

        return ResponseEntity.ok(ApiResponse.success(page));
    }
}
