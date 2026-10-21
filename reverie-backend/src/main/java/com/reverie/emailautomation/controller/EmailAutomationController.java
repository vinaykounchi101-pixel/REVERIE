package com.reverie.emailautomation.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.emailautomation.dto.*;
import com.reverie.emailautomation.service.EmailAutomationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/email-automation")
@Tag(name = "Admin Email Automation & Campaigns", description = "Atelier Email Automation, Multi-Provider Switching and Seasonal Campaigns")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
public class EmailAutomationController {

    private final EmailAutomationService automationService;

    public EmailAutomationController(EmailAutomationService automationService) {
        this.automationService = automationService;
    }

    // =========================================================================
    // Settings Endpoints
    // =========================================================================

    @GetMapping("/settings")
    @Operation(summary = "Get Email Automation Settings", description = "Retrieves active provider, global flags and webhook status without exposing secrets.")
    public ResponseEntity<ApiResponse<EmailAutomationSettingsDto>> getSettings() {
        EmailAutomationSettingsDto settings = automationService.getSettings();
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @PutMapping("/settings")
    @Operation(summary = "Update Email Automation Settings", description = "Modifies active email provider (BREVO/N8N) and automation flags.")
    public ResponseEntity<ApiResponse<EmailAutomationSettingsDto>> updateSettings(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpdateEmailAutomationSettingsRequest request) {
        String actor = principal != null ? principal.getEmail() : "ADMIN";
        EmailAutomationSettingsDto updated = automationService.updateSettings(request, actor);
        return ResponseEntity.ok(ApiResponse.success("Email automation settings updated successfully", updated));
    }

    // =========================================================================
    // Seasonal Promotional Campaigns Endpoints
    // =========================================================================

    @GetMapping("/campaigns")
    @Operation(summary = "List Campaigns", description = "Retrieves paginated promotional campaigns ordered by creation date.")
    public ResponseEntity<ApiResponse<Page<EmailCampaignDto>>> listCampaigns(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<EmailCampaignDto> campaigns = automationService.getAllCampaigns(pageable);
        return ResponseEntity.ok(ApiResponse.success(campaigns));
    }

    @PostMapping("/campaigns")
    @Operation(summary = "Create Campaign", description = "Creates a new promotional campaign (e.g. Diwali, Christmas, Horology Offer).")
    public ResponseEntity<ApiResponse<EmailCampaignDto>> createCampaign(
            @Valid @RequestBody CreateEmailCampaignRequest request) {
        EmailCampaignDto campaign = automationService.createCampaign(request);
        return ResponseEntity.ok(ApiResponse.success("Campaign created successfully", campaign));
    }

    @GetMapping("/campaigns/{id}")
    @Operation(summary = "Get Campaign Details", description = "Retrieves detailed campaign configuration and delivery statistics.")
    public ResponseEntity<ApiResponse<EmailCampaignDto>> getCampaign(@PathVariable UUID id) {
        EmailCampaignDto campaign = automationService.getCampaignById(id);
        return ResponseEntity.ok(ApiResponse.success(campaign));
    }

    @PutMapping("/campaigns/{id}")
    @Operation(summary = "Update Campaign", description = "Updates details, schedule, or template of an existing campaign.")
    public ResponseEntity<ApiResponse<EmailCampaignDto>> updateCampaign(
            @PathVariable UUID id,
            @Valid @RequestBody CreateEmailCampaignRequest request) {
        EmailCampaignDto updated = automationService.updateCampaign(id, request);
        return ResponseEntity.ok(ApiResponse.success("Campaign updated successfully", updated));
    }

    @PostMapping("/campaigns/{id}/trigger")
    @Operation(summary = "Trigger Campaign Execution", description = "Initiates bounded batch delivery to opted-in collectors with idempotency protection.")
    public ResponseEntity<ApiResponse<EmailCampaignDto>> triggerCampaign(@PathVariable UUID id) {
        EmailCampaignDto result = automationService.triggerCampaignBatch(id);
        return ResponseEntity.ok(ApiResponse.success("Campaign batch triggered successfully", result));
    }

    @GetMapping("/campaigns/{id}/sends")
    @Operation(summary = "Get Campaign Send Log", description = "Retrieves paginated per-customer idempotency and delivery audit logs.")
    public ResponseEntity<ApiResponse<Page<EmailCampaignSendDto>>> getCampaignSends(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<EmailCampaignSendDto> sends = automationService.getCampaignSends(id, pageable);
        return ResponseEntity.ok(ApiResponse.success(sends));
    }
}
