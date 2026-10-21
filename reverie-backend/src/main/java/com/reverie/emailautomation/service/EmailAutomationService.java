package com.reverie.emailautomation.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reverie.auth.service.EmailService;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.emailautomation.dto.*;
import com.reverie.emailautomation.entity.EmailAutomationSettings;
import com.reverie.emailautomation.entity.EmailCampaign;
import com.reverie.emailautomation.entity.EmailCampaignSend;
import com.reverie.emailautomation.repository.EmailAutomationSettingsRepository;
import com.reverie.emailautomation.repository.EmailCampaignRepository;
import com.reverie.emailautomation.repository.EmailCampaignSendRepository;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class EmailAutomationService {

    private static final Logger log = LoggerFactory.getLogger(EmailAutomationService.class);

    private final EmailAutomationSettingsRepository settingsRepository;
    private final EmailCampaignRepository campaignRepository;
    private final EmailCampaignSendRepository campaignSendRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    @Value("${app.email-automation.n8n-webhook-url:}")
    private String defaultN8nWebhookUrl;

    @Value("${app.email-automation.n8n-webhook-secret:}")
    private String n8nWebhookSecret;

    @Value("${app.email-automation.connect-timeout-ms:3000}")
    private int connectTimeoutMs;

    @Value("${app.email-automation.read-timeout-ms:3000}")
    private int readTimeoutMs;

    public EmailAutomationService(
            EmailAutomationSettingsRepository settingsRepository,
            EmailCampaignRepository campaignRepository,
            EmailCampaignSendRepository campaignSendRepository,
            UserRepository userRepository,
            EmailService emailService,
            ObjectMapper objectMapper) {
        this.settingsRepository = settingsRepository;
        this.campaignRepository = campaignRepository;
        this.campaignSendRepository = campaignSendRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.objectMapper = objectMapper != null ? objectMapper : new ObjectMapper();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofMillis(3000))
                .build();
    }

    private String resolveWebhookSecret() {
        if (n8nWebhookSecret != null && !n8nWebhookSecret.isBlank() && !n8nWebhookSecret.contains("${")) {
            return n8nWebhookSecret.trim();
        }
        for (String k : List.of("N8N_WEBHOOK_SECRET", "N8N_SECRET", "WEBHOOK_SECRET")) {
            String val = System.getProperty(k, System.getenv(k));
            if (val != null && !val.isBlank() && !val.contains("${")) {
                return val.trim();
            }
        }
        return "";
    }

    // =========================================================================
    // 1. Settings Management
    // =========================================================================

    @Transactional
    public EmailAutomationSettings getOrCreateSettingsEntity() {
        return settingsRepository.findGlobalSettings()
                .orElseGet(() -> settingsRepository.save(
                        new EmailAutomationSettings("GLOBAL", true, true, true, "BREVO", defaultN8nWebhookUrl)));
    }

    @Transactional(readOnly = true)
    public EmailAutomationSettingsDto getSettings() {
        EmailAutomationSettings settings = getOrCreateSettingsEntity();
        boolean hasSecret = !resolveWebhookSecret().isBlank();
        return EmailAutomationSettingsDto.fromEntity(settings, hasSecret);
    }

    @Transactional
    public EmailAutomationSettingsDto updateSettings(UpdateEmailAutomationSettingsRequest request, String adminActor) {
        EmailAutomationSettings settings = getOrCreateSettingsEntity();

        if (request.getIsGlobalEnabled() != null) {
            settings.setGlobalEnabled(request.getIsGlobalEnabled());
        }
        if (request.getIsLoginNotificationEnabled() != null) {
            settings.setLoginNotificationEnabled(request.getIsLoginNotificationEnabled());
        }
        if (request.getIsCampaignsEnabled() != null) {
            settings.setCampaignsEnabled(request.getIsCampaignsEnabled());
        }
        if (request.getActiveProvider() != null && !request.getActiveProvider().isBlank()) {
            settings.setActiveProvider(request.getActiveProvider().toUpperCase());
        }
        if (request.getN8nWebhookUrl() != null) {
            settings.setN8nWebhookUrl(request.getN8nWebhookUrl().trim());
        }
        settings.setUpdatedBy(adminActor);
        settings.setUpdatedAt(Instant.now());

        EmailAutomationSettings saved = settingsRepository.save(settings);
        log.info("[EMAIL AUTOMATION SETTINGS] Updated by {} - Provider: {}, Global: {}, LoginAlerts: {}, Campaigns: {}",
                adminActor, saved.getActiveProvider(), saved.isGlobalEnabled(), saved.isLoginNotificationEnabled(), saved.isCampaignsEnabled());

        return EmailAutomationSettingsDto.fromEntity(saved, !resolveWebhookSecret().isBlank());
    }

    // =========================================================================
    // 2. Customer Login Notification Dispatch (Strictly Non-Blocking)
    // =========================================================================

    /**
     * Dispatches customer login notification asynchronously.
     * Guaranteed never to throw or block the customer login flow.
     */
    public void dispatchCustomerLoginNotification(User user, String clientIp) {
        CompletableFuture.runAsync(() -> {
            try {
                EmailAutomationSettings settings = getOrCreateSettingsEntity();
                if (!settings.isGlobalEnabled()) {
                    log.debug("[LOGIN NOTIFICATION] Skipped: Global automation is disabled");
                    return;
                }
                if (!settings.isLoginNotificationEnabled()) {
                    log.debug("[LOGIN NOTIFICATION] Skipped: Login notifications are disabled");
                    return;
                }

                String provider = settings.getActiveProvider();
                log.info("[LOGIN NOTIFICATION] Dispatching login notification for user {} via provider {}", user.getEmail(), provider);

                if ("N8N".equalsIgnoreCase(provider)) {
                    dispatchLoginToN8n(user, clientIp);
                } else {
                    // Default / Brevo provider:
                    emailService.sendCustomerLoginAlert(
                            user.getEmail(),
                            user.getFirstName(),
                            Instant.now().toString(),
                            clientIp
                    );
                }
            } catch (Exception e) {
                // Safeguard: Never let notification failure impact successful login
                log.warn("[LOGIN NOTIFICATION EXCEPTION] Failed to dispatch login alert for {}: {}", user.getEmail(), e.getMessage());
            }
        });
    }

    private void dispatchLoginToN8n(User user, String clientIp) {
        EmailAutomationSettings settings = getOrCreateSettingsEntity();
        String webhookUrl = settings.getN8nWebhookUrl();
        if (webhookUrl == null || webhookUrl.isBlank()) {
            webhookUrl = defaultN8nWebhookUrl;
        }

        if (webhookUrl == null || webhookUrl.isBlank()) {
            log.warn("[N8N WEBHOOK SKIPPED] No n8n webhook URL configured for login event. Falling back to Brevo alert.");
            emailService.sendCustomerLoginAlert(user.getEmail(), user.getFirstName(), Instant.now().toString(), clientIp);
            return;
        }

        try {
            CustomerLoginEvent event = new CustomerLoginEvent(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    "N8N"
            );

            String jsonPayload = objectMapper.writeValueAsString(event);
            String secret = resolveWebhookSecret();

            HttpRequest.Builder reqBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(webhookUrl))
                    .timeout(Duration.ofMillis(readTimeoutMs > 0 ? readTimeoutMs : 3000))
                    .header("Content-Type", "application/json")
                    .header("User-Agent", "REVERIE-Backend/1.0");

            if (!secret.isBlank()) {
                reqBuilder.header("X-REVERIE-WEBHOOK-SECRET", secret);
            }

            HttpRequest request = reqBuilder
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("[N8N WEBHOOK SUCCESS] Login event delivered to n8n for user {} (HTTP {})", user.getEmail(), response.statusCode());
            } else {
                log.warn("[N8N WEBHOOK REJECTED] n8n returned HTTP {} for login event of user {}. Response body: {}",
                        response.statusCode(), user.getEmail(), response.body());
            }
        } catch (Exception ex) {
            log.warn("[N8N WEBHOOK ERROR] Error posting login event to n8n {}: {}", webhookUrl, ex.getMessage());
        }
    }

    // =========================================================================
    // 3. Seasonal Promotional Campaigns Management & Execution
    // =========================================================================

    @Transactional(readOnly = true)
    public Page<EmailCampaignDto> getAllCampaigns(Pageable pageable) {
        return campaignRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(EmailCampaignDto::fromEntity);
    }

    @Transactional(readOnly = true)
    public EmailCampaignDto getCampaignById(UUID campaignId) {
        EmailCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Campaign not found: " + campaignId));
        return EmailCampaignDto.fromEntity(campaign);
    }

    @Transactional
    public EmailCampaignDto createCampaign(CreateEmailCampaignRequest request) {
        EmailCampaign campaign = new EmailCampaign(
                request.getTitle().trim(),
                request.getSubject().trim(),
                request.getPreviewText() != null ? request.getPreviewText().trim() : null,
                request.getHtmlTemplate(),
                request.getDiscountCode() != null ? request.getDiscountCode().trim() : null,
                request.getDiscountPercentage(),
                request.getScheduledStartAt(),
                request.getScheduledEndAt()
        );

        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            campaign.setStatus(request.getStatus().trim().toUpperCase());
        } else {
            campaign.setStatus("DRAFT");
        }

        // Count eligible recipients for campaign targeting
        long eligibleCount = userRepository.countByRoleAndIsActiveTrueAndMarketingConsentTrueAndUnsubscribedAtIsNull(Role.CUSTOMER);
        campaign.setTotalTargeted((int) eligibleCount);

        EmailCampaign saved = campaignRepository.save(campaign);
        log.info("[CAMPAIGN CREATED] ID: {}, Title: '{}', Targeted: {}", saved.getId(), saved.getTitle(), saved.getTotalTargeted());
        return EmailCampaignDto.fromEntity(saved);
    }

    @Transactional
    public EmailCampaignDto updateCampaign(UUID campaignId, CreateEmailCampaignRequest request) {
        EmailCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Campaign not found: " + campaignId));

        campaign.setTitle(request.getTitle().trim());
        campaign.setSubject(request.getSubject().trim());
        campaign.setPreviewText(request.getPreviewText() != null ? request.getPreviewText().trim() : null);
        campaign.setHtmlTemplate(request.getHtmlTemplate());
        campaign.setDiscountCode(request.getDiscountCode() != null ? request.getDiscountCode().trim() : null);
        campaign.setDiscountPercentage(request.getDiscountPercentage());
        campaign.setScheduledStartAt(request.getScheduledStartAt());
        campaign.setScheduledEndAt(request.getScheduledEndAt());

        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            campaign.setStatus(request.getStatus().trim().toUpperCase());
        }

        long eligibleCount = userRepository.countByRoleAndIsActiveTrueAndMarketingConsentTrueAndUnsubscribedAtIsNull(Role.CUSTOMER);
        campaign.setTotalTargeted((int) eligibleCount);
        campaign.setUpdatedAt(Instant.now());

        EmailCampaign saved = campaignRepository.save(campaign);
        return EmailCampaignDto.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public Page<EmailCampaignSendDto> getCampaignSends(UUID campaignId, Pageable pageable) {
        EmailCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Campaign not found: " + campaignId));
        return campaignSendRepository.findByCampaignOrderByCreatedAtDesc(campaign, pageable)
                .map(EmailCampaignSendDto::fromEntity);
    }

    /**
     * Triggers campaign execution in bounded batches of 50.
     * Enforces strict per-campaign, per-customer send idempotency and consent verification.
     */
    @Transactional
    public EmailCampaignDto triggerCampaignBatch(UUID campaignId) {
        EmailAutomationSettings settings = getOrCreateSettingsEntity();
        if (!settings.isGlobalEnabled()) {
            throw new IllegalStateException("Email automation is disabled globally in settings.");
        }
        if (!settings.isCampaignsEnabled()) {
            throw new IllegalStateException("Marketing campaigns are disabled in settings.");
        }

        EmailCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Campaign not found: " + campaignId));

        if ("PAUSED".equalsIgnoreCase(campaign.getStatus()) || "CANCELLED".equalsIgnoreCase(campaign.getStatus())) {
            throw new IllegalStateException("Cannot execute a paused or cancelled campaign.");
        }

        campaign.setStatus("ACTIVE");
        String provider = settings.getActiveProvider();

        // Process in bounded batches of 50 to avoid high memory consumption
        int batchSize = 50;
        int pageIndex = 0;
        boolean hasMore = true;

        int sentInRun = 0;
        int failedInRun = 0;

        while (hasMore) {
            Pageable pageable = PageRequest.of(pageIndex, batchSize);
            Page<User> eligiblePage = userRepository.findByRoleAndIsActiveTrueAndMarketingConsentTrueAndUnsubscribedAtIsNull(
                    Role.CUSTOMER, pageable);

            if (eligiblePage.isEmpty()) {
                hasMore = false;
                break;
            }

            for (User customer : eligiblePage.getContent()) {
                // Idempotency check: Skip if already sent
                if (campaignSendRepository.existsByCampaignAndCustomer(campaign, customer)) {
                    continue;
                }

                boolean success = false;
                String error = null;

                try {
                    if ("N8N".equalsIgnoreCase(provider)) {
                        // In n8n provider mode, send campaign request to n8n webhook
                        success = postCampaignEmailToN8n(campaign, customer);
                    } else {
                        // In Brevo provider mode, send via Brevo / EmailService
                        success = emailService.sendMarketingEmail(customer.getEmail(), campaign.getSubject(), campaign.getHtmlTemplate());
                    }
                } catch (Exception e) {
                    success = false;
                    error = e.getMessage();
                }

                EmailCampaignSend sendRecord = new EmailCampaignSend(
                        campaign,
                        customer,
                        customer.getEmail(),
                        success ? "SENT" : "FAILED",
                        provider
                );
                if (!success && error != null) {
                    sendRecord.setErrorMessage(error.length() > 500 ? error.substring(0, 500) : error);
                }

                campaignSendRepository.save(sendRecord);

                if (success) {
                    sentInRun++;
                } else {
                    failedInRun++;
                }
            }

            if (eligiblePage.hasNext()) {
                pageIndex++;
            } else {
                hasMore = false;
            }
        }

        campaign.setTotalSent(campaign.getTotalSent() + sentInRun);
        campaign.setTotalFailed(campaign.getTotalFailed() + failedInRun);
        if (campaign.getTotalSent() + campaign.getTotalFailed() >= campaign.getTotalTargeted()) {
            campaign.setStatus("COMPLETED");
        }
        campaign.setUpdatedAt(Instant.now());

        EmailCampaign updated = campaignRepository.save(campaign);
        log.info("[CAMPAIGN RUN COMPLETE] Campaign: '{}' - Sent: {}, Failed: {}, TotalSent: {}/{}",
                updated.getTitle(), sentInRun, failedInRun, updated.getTotalSent(), updated.getTotalTargeted());

        return EmailCampaignDto.fromEntity(updated);
    }

    private boolean postCampaignEmailToN8n(EmailCampaign campaign, User customer) {
        EmailAutomationSettings settings = getOrCreateSettingsEntity();
        String webhookUrl = settings.getN8nWebhookUrl();
        if (webhookUrl == null || webhookUrl.isBlank()) {
            webhookUrl = defaultN8nWebhookUrl;
        }

        if (webhookUrl == null || webhookUrl.isBlank()) {
            log.warn("[N8N CAMPAIGN DISPATCH SKIPPED] No webhook URL configured, falling back to direct email service.");
            return emailService.sendMarketingEmail(customer.getEmail(), campaign.getSubject(), campaign.getHtmlTemplate());
        }

        try {
            var payload = java.util.Map.of(
                    "event_type", "MARKETING_CAMPAIGN",
                    "event_id", UUID.randomUUID().toString(),
                    "campaign_id", campaign.getId().toString(),
                    "campaign_title", campaign.getTitle(),
                    "customer_id", customer.getId().toString(),
                    "email", customer.getEmail(),
                    "first_name", customer.getFirstName() != null ? customer.getFirstName() : "Collector",
                    "subject", campaign.getSubject(),
                    "html_template", campaign.getHtmlTemplate(),
                    "timestamp", Instant.now().toString()
            );

            String json = objectMapper.writeValueAsString(payload);
            String secret = resolveWebhookSecret();

            HttpRequest.Builder reqBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(webhookUrl))
                    .timeout(Duration.ofMillis(readTimeoutMs > 0 ? readTimeoutMs : 3000))
                    .header("Content-Type", "application/json");

            if (!secret.isBlank()) {
                reqBuilder.header("X-REVERIE-WEBHOOK-SECRET", secret);
            }

            HttpRequest request = reqBuilder
                    .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() >= 200 && response.statusCode() < 300;
        } catch (Exception ex) {
            log.warn("[N8N CAMPAIGN ERROR] Failed to dispatch campaign to n8n: {}", ex.getMessage());
            return false;
        }
    }

    // =========================================================================
    // 4. Marketing Consent & Customer Unsubscribe
    // =========================================================================

    @Transactional
    public boolean unsubscribeCustomer(String email) {
        if (email == null || email.isBlank()) return false;
        return userRepository.findByEmail(email.trim().toLowerCase())
                .map(user -> {
                    user.setMarketingConsent(false);
                    user.setUnsubscribedAt(Instant.now());
                    userRepository.save(user);
                    log.info("[CUSTOMER UNSUBSCRIBED] Marketing consent revoked for user: {}", email);
                    return true;
                })
                .orElse(false);
    }
}
