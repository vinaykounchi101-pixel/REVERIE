package com.reverie.emailautomation.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reverie.auth.service.EmailService;
import com.reverie.emailautomation.dto.CreateEmailCampaignRequest;
import com.reverie.emailautomation.dto.EmailAutomationSettingsDto;
import com.reverie.emailautomation.dto.EmailCampaignDto;
import com.reverie.emailautomation.dto.UpdateEmailAutomationSettingsRequest;
import com.reverie.emailautomation.entity.EmailAutomationSettings;
import com.reverie.emailautomation.entity.EmailCampaign;
import com.reverie.emailautomation.entity.EmailCampaignSend;
import com.reverie.emailautomation.repository.EmailAutomationSettingsRepository;
import com.reverie.emailautomation.repository.EmailCampaignRepository;
import com.reverie.emailautomation.repository.EmailCampaignSendRepository;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmailAutomationServiceTest {

    @Mock
    private EmailAutomationSettingsRepository settingsRepository;

    @Mock
    private EmailCampaignRepository campaignRepository;

    @Mock
    private EmailCampaignSendRepository campaignSendRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    private EmailAutomationService automationService;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        automationService = new EmailAutomationService(
                settingsRepository,
                campaignRepository,
                campaignSendRepository,
                userRepository,
                emailService,
                objectMapper
        );
    }

    @Test
    @DisplayName("getSettings should return DTO with safe secret status flag and no raw secrets")
    void testGetSettings_SafeDto() {
        EmailAutomationSettings entity = new EmailAutomationSettings("GLOBAL", true, true, true, "BREVO", "https://n8n.cloud/webhook");
        when(settingsRepository.findGlobalSettings()).thenReturn(Optional.of(entity));

        EmailAutomationSettingsDto dto = automationService.getSettings();

        assertNotNull(dto);
        assertEquals("GLOBAL", dto.getId());
        assertEquals("BREVO", dto.getActiveProvider());
        assertTrue(dto.isGlobalEnabled());
        assertTrue(dto.isLoginNotificationEnabled());
        assertTrue(dto.isCampaignsEnabled());
    }

    @Test
    @DisplayName("updateSettings should update provider and flags accurately")
    void testUpdateSettings_Success() {
        EmailAutomationSettings existing = new EmailAutomationSettings("GLOBAL", true, true, true, "BREVO", null);
        when(settingsRepository.findGlobalSettings()).thenReturn(Optional.of(existing));
        when(settingsRepository.save(any(EmailAutomationSettings.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateEmailAutomationSettingsRequest req = new UpdateEmailAutomationSettingsRequest();
        req.setActiveProvider("N8N");
        req.setN8nWebhookUrl("https://n8n.cloud/webhook/reverie");
        req.setIsLoginNotificationEnabled(true);

        EmailAutomationSettingsDto updated = automationService.updateSettings(req, "admin@reverie.luxury");

        assertEquals("N8N", updated.getActiveProvider());
        assertEquals("https://n8n.cloud/webhook/reverie", updated.getN8nWebhookUrl());
        assertEquals("admin@reverie.luxury", updated.getUpdatedBy());
    }

    @Test
    @DisplayName("dispatchCustomerLoginNotification via BREVO dispatches email alert to collector")
    void testDispatchCustomerLoginNotification_Brevo() throws InterruptedException {
        EmailAutomationSettings settings = new EmailAutomationSettings("GLOBAL", true, true, true, "BREVO", null);
        when(settingsRepository.findGlobalSettings()).thenReturn(Optional.of(settings));

        User customer = new User("collector@domain.com", "hash", "Henri", "Stern", null, Role.CUSTOMER);
        customer.setId(UUID.randomUUID());

        automationService.dispatchCustomerLoginNotification(customer, "192.168.1.50");

        // Allow async CompletableFuture execution to complete
        Thread.sleep(500);

        verify(emailService, timeout(1000).times(1)).sendCustomerLoginAlert(
                eq("collector@domain.com"),
                eq("Henri"),
                any(),
                eq("192.168.1.50")
        );
    }

    @Test
    @DisplayName("dispatchCustomerLoginNotification skips when global automation is disabled")
    void testDispatchCustomerLoginNotification_SkippedWhenDisabled() throws InterruptedException {
        EmailAutomationSettings settings = new EmailAutomationSettings("GLOBAL", false, true, true, "BREVO", null);
        when(settingsRepository.findGlobalSettings()).thenReturn(Optional.of(settings));

        User customer = new User("collector@domain.com", "hash", "Henri", "Stern", null, Role.CUSTOMER);

        automationService.dispatchCustomerLoginNotification(customer, "192.168.1.50");
        Thread.sleep(300);

        verifyNoInteractions(emailService);
    }

    @Test
    @DisplayName("triggerCampaignBatch sends only to opted-in patrons and respects idempotency")
    void testTriggerCampaignBatch_IdempotencyAndConsent() {
        EmailAutomationSettings settings = new EmailAutomationSettings("GLOBAL", true, true, true, "BREVO", null);
        when(settingsRepository.findGlobalSettings()).thenReturn(Optional.of(settings));

        UUID campaignId = UUID.randomUUID();
        EmailCampaign campaign = new EmailCampaign("Festive Offer", "Festive Privileges", "Preview", "<h1>Diwali</h1>", "DIWALI10", 10, null, null);
        campaign.setId(campaignId);
        campaign.setStatus("SCHEDULED");
        when(campaignRepository.findById(campaignId)).thenReturn(Optional.of(campaign));
        when(campaignRepository.save(any(EmailCampaign.class))).thenAnswer(i -> i.getArgument(0));

        // Two customers with marketing consent
        User customer1 = new User("user1@domain.com", "hash", "Alice", "W", null, Role.CUSTOMER);
        customer1.setId(UUID.randomUUID());
        customer1.setMarketingConsent(true);

        User customer2 = new User("user2@domain.com", "hash", "Bob", "M", null, Role.CUSTOMER);
        customer2.setId(UUID.randomUUID());
        customer2.setMarketingConsent(true);

        // Page 0 returns customer1 and customer2, Page 1 empty
        when(userRepository.findByRoleAndIsActiveTrueAndMarketingConsentTrueAndUnsubscribedAtIsNull(eq(Role.CUSTOMER), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(customer1, customer2)))
                .thenReturn(new PageImpl<>(List.of()));

        // Customer1 already received the campaign (idempotency simulation)
        when(campaignSendRepository.existsByCampaignAndCustomer(campaign, customer1)).thenReturn(true);
        // Customer2 has NOT received the campaign
        when(campaignSendRepository.existsByCampaignAndCustomer(campaign, customer2)).thenReturn(false);

        when(emailService.sendMarketingEmail(eq("user2@domain.com"), any(), any())).thenReturn(true);

        EmailCampaignDto result = automationService.triggerCampaignBatch(campaignId);

        assertNotNull(result);
        // Customer 1 was skipped due to idempotency, Customer 2 was sent
        verify(emailService, times(1)).sendMarketingEmail(eq("user2@domain.com"), any(), any());
        verify(emailService, never()).sendMarketingEmail(eq("user1@domain.com"), any(), any());
        verify(campaignSendRepository, times(1)).save(any(EmailCampaignSend.class));
    }

    @Test
    @DisplayName("unsubscribeCustomer should revoke marketing consent and set unsubscribedAt")
    void testUnsubscribeCustomer() {
        User customer = new User("patron@domain.com", "hash", "Paul", "Newman", null, Role.CUSTOMER);
        customer.setMarketingConsent(true);
        when(userRepository.findByEmail("patron@domain.com")).thenReturn(Optional.of(customer));

        boolean unsubscribed = automationService.unsubscribeCustomer("patron@domain.com");

        assertTrue(unsubscribed);
        assertFalse(customer.isMarketingConsent());
        assertNotNull(customer.getUnsubscribedAt());
        verify(userRepository, times(1)).save(customer);
    }
}
