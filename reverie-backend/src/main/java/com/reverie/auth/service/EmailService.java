package com.reverie.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    @Value("${app.mail.provider:auto}")
    private String emailProvider; // auto | resend | brevo | smtp | mock

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${app.mail.from-address:}")
    private String fromAddress;

    @Value("${app.mail.from-name:REVERIE Haute Horlogerie}")
    private String fromName;

    @Value("${app.mail.resend.api-key:}")
    private String resendApiKey;

    @Value("${app.mail.resend.api-url:https://api.resend.com/emails}")
    private String resendApiUrl;

    @Value("${app.mail.brevo.api-key:}")
    private String brevoApiKey;

    @Value("${app.mail.brevo.api-url:https://api.brevo.com/v3/smtp/email}")
    private String brevoApiUrl;

    @Autowired
    public EmailService(
            @Autowired(required = false) JavaMailSender mailSender,
            ObjectMapper objectMapper) {
        this.mailSender = mailSender;
        this.objectMapper = objectMapper != null ? objectMapper : new ObjectMapper();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    /**
     * Sends the 6-digit Email Verification OTP
     */
    public void sendEmailVerificationOtp(String toEmail, String recipientName, String otpCode) {
        String subject = "REVERIE — Authenticate Your Collector Account (Code: " + otpCode + ")";
        String name = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Valued Collector";

        String htmlContent = buildLuxuryEmailHtml(
                "ACCOUNT VERIFICATION",
                "Dear " + name + ",",
                "Thank you for registering with the REVERIE Manufacture. To authenticate your collector profile and secure access to our haute horlogerie atelier, please enter the single-use verification code below:",
                otpCode,
                "This verification code remains valid for 10 minutes. If you did not create a REVERIE account, please disregard this transmission or contact our Concierge."
        );

        dispatchEmail(toEmail, subject, htmlContent, otpCode, "EMAIL_VERIFICATION");
    }

    /**
     * Sends the 6-digit One-Time Login OTP
     */
    public void sendLoginOtp(String toEmail, String recipientName, String otpCode) {
        String subject = "REVERIE — Your Sign In Code (Code: " + otpCode + ")";
        String name = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Valued Collector";

        String htmlContent = buildLuxuryEmailHtml(
                "MEMBER SIGN IN",
                "Dear " + name + ",",
                "A one-time verification code was requested to authenticate your REVERIE collector account. Please use the code below to complete sign-in:",
                otpCode,
                "This code remains valid for 10 minutes. If you did not request this sign-in code, please contact our Concierge immediately."
        );

        dispatchEmail(toEmail, subject, htmlContent, otpCode, "EMAIL_LOGIN");
    }

    /**
     * Sends the 6-digit Checkout / Order Verification OTP
     */
    public void sendCheckoutVerificationOtp(String toEmail, String recipientName, String otpCode) {
        String subject = "REVERIE — Authorize Timepiece Acquisition (Code: " + otpCode + ")";
        String name = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Valued Collector";

        String htmlContent = buildLuxuryEmailHtml(
                "CHECKOUT AUTHORIZATION",
                "Dear " + name + ",",
                "To verify your identity and protect your luxury timepiece acquisition, please enter the single-use authorization code below to finalize your order:",
                otpCode,
                "This single-use acquisition authorization code expires in 10 minutes. If you did not initiate this transaction, please contact the REVERIE Concierge immediately."
        );

        dispatchEmail(toEmail, subject, htmlContent, otpCode, "CHECKOUT_VERIFICATION");
    }

    /**
     * Sends the 6-digit Password Reset OTP
     */
    public void sendPasswordResetOtp(String toEmail, String recipientName, String otpCode) {
        String subject = "REVERIE — Password Reset Request (Code: " + otpCode + ")";
        String name = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Valued Collector";

        String htmlContent = buildLuxuryEmailHtml(
                "SECURITY VERIFICATION",
                "Dear " + name + ",",
                "We received a request to reset the security credentials for your REVERIE collector account. Please use the authorized verification token below to proceed with resetting your password:",
                otpCode,
                "This security code expires in 15 minutes. If you did not initiate this request, please contact the REVERIE Concierge immediately to secure your portfolio."
        );

        dispatchEmail(toEmail, subject, htmlContent, otpCode, "PASSWORD_RESET");
    }

    /**
     * Sends the official Welcome Email upon successful registration and email verification
     */
    public void sendWelcomeEmail(String toEmail, String recipientName) {
        String subject = "REVERIE — Welcome to the Haute Horlogerie Atelier";
        String name = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Valued Collector";

        String htmlContent = buildWelcomeEmailHtml(name);
        dispatchEmail(toEmail, subject, htmlContent, "WELCOME", "WELCOME");
    }

    /**
     * Sends the official Order Invoice & Consignment Receipt Email
     */
    public void sendOrderInvoiceEmail(String toEmail, String recipientName, String orderNumber, long totalPaise, String currency, String paymentMethod, String address, List<Map<String, Object>> items) {
        String subject = "REVERIE — Official Invoice & Consignment Receipt #" + orderNumber;
        String name = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Valued Collector";

        String htmlContent = buildInvoiceEmailHtml(name, orderNumber, totalPaise, currency, paymentMethod, address, items);
        dispatchEmail(toEmail, subject, htmlContent, orderNumber, "ORDER_INVOICE");
    }

    private String resolveBrevoApiKey() {
        if (brevoApiKey != null && !brevoApiKey.isBlank() && !brevoApiKey.contains("${")) return brevoApiKey.trim();
        for (String k : List.of("BREVO_API_KEY", "BREVO_KEY", "BREVO_APIKEY", "SENDINBLUE_API_KEY", "SENDINBLUE_KEY", "BREVO_SMTP_KEY")) {
            String val = System.getProperty(k, System.getenv(k));
            if (val != null && !val.isBlank() && !val.contains("${")) return val.trim();
        }
        return "";
    }

    private String resolveResendApiKey() {
        if (resendApiKey != null && !resendApiKey.isBlank() && !resendApiKey.contains("${")) return resendApiKey.trim();
        for (String k : List.of("RESEND_API_KEY", "RESEND_KEY", "RESEND_APIKEY")) {
            String val = System.getProperty(k, System.getenv(k));
            if (val != null && !val.isBlank() && !val.contains("${")) return val.trim();
        }
        return "";
    }

    private String resolveMailUsername() {
        if (mailUsername != null && !mailUsername.isBlank() && !mailUsername.contains("${") && mailUsername.contains("@")) return mailUsername.trim();
        for (String k : List.of("SPRING_MAIL_USERNAME", "MAIL_USERNAME", "SMTP_USERNAME", "BREVO_USER", "GMAIL_USERNAME")) {
            String val = System.getProperty(k, System.getenv(k));
            if (val != null && !val.isBlank() && !val.contains("${") && val.contains("@")) return val.trim();
        }
        return "";
    }

    private String resolveFromAddress() {
        if (fromAddress != null && !fromAddress.isBlank() && !fromAddress.contains("${") && fromAddress.contains("@")) return fromAddress.trim();
        for (String k : List.of("MAIL_FROM_ADDRESS", "BREVO_SENDER_EMAIL", "BREVO_FROM_EMAIL", "BREVO_USER", "BREVO_EMAIL", "SENDER_EMAIL", "SPRING_MAIL_USERNAME")) {
            String val = System.getProperty(k, System.getenv(k));
            if (val != null && !val.isBlank() && !val.contains("${") && val.contains("@")) return val.trim();
        }
        return "concierge@reverie.luxury";
    }

    /**
     * Central dispatcher coordinating live Brevo, Resend, and SMTP delivery
     */
    private void dispatchEmail(String toEmail, String subject, String htmlContent, String otpCode, String type) {
        String provider = (emailProvider != null && !emailProvider.isBlank()) ? emailProvider.trim().toLowerCase() : "auto";
        boolean sent = false;

        if ("brevo".equals(provider)) {
            sent = sendViaBrevo(toEmail, subject, htmlContent, type);
        } else if ("resend".equals(provider)) {
            sent = sendViaResend(toEmail, subject, htmlContent, type);
        } else if ("smtp".equals(provider)) {
            sent = sendViaSmtp(toEmail, subject, htmlContent, type);
        }

        // Waterfall chain if not explicitly sent or if provider was "auto"
        if (!sent) {
            // 1. Try Brevo
            String bKey = resolveBrevoApiKey();
            if (!bKey.isBlank()) {
                sent = sendViaBrevo(toEmail, subject, htmlContent, type);
            }
            // 2. If Brevo not available or failed, try Resend
            if (!sent) {
                String rKey = resolveResendApiKey();
                if (!rKey.isBlank()) {
                    sent = sendViaResend(toEmail, subject, htmlContent, type);
                }
            }
            // 3. If still not delivered, try SMTP
            if (!sent) {
                sent = sendViaSmtp(toEmail, subject, htmlContent, type);
            }
        }

        if (!sent) {
            log.error("[EMAIL DISPATCH ERROR] Failed to deliver {} email to [{}]. Ensure live credentials (BREVO_API_KEY, RESEND_API_KEY, or SPRING_MAIL_USERNAME) and MAIL_FROM_ADDRESS are configured.", type, toEmail);
        }
    }

    /**
     * Resend API Provider (https://resend.com)
     */
    private boolean sendViaResend(String toEmail, String subject, String htmlContent, String type) {
        String apiKey = resolveResendApiKey();
        if (apiKey.isBlank()) {
            log.warn("[EMAIL RESEND] RESEND_API_KEY is not configured.");
            return false;
        }

        try {
            String senderEmail = resolveFromAddress();
            if ("concierge@reverie.luxury".equalsIgnoreCase(senderEmail)) {
                senderEmail = "onboarding@resend.dev";
            }
            String fromFormatted = (fromName != null && !fromName.isBlank()) ? fromName + " <" + senderEmail + ">" : senderEmail;

            Map<String, Object> payload = Map.of(
                    "from", fromFormatted,
                    "to", List.of(toEmail),
                    "subject", subject,
                    "html", htmlContent
            );

            String jsonBody = objectMapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(resendApiUrl != null && !resendApiUrl.isBlank() ? resendApiUrl : "https://api.resend.com/emails"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(10))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("[EMAIL RESEND SUCCESS] Dispatched {} notification to {} via Resend API (HTTP {})", type, toEmail, response.statusCode());
                return true;
            } else {
                log.warn("[EMAIL RESEND ERROR] Failed to dispatch {} email via Resend to {}: HTTP {} - {}", type, toEmail, response.statusCode(), response.body());
                return false;
            }
        } catch (Exception e) {
            log.warn("[EMAIL RESEND EXCEPTION] Error dispatching to {}: {}", toEmail, e.getMessage());
            return false;
        }
    }

    /**
     * Brevo API Provider (https://brevo.com / Sendinblue)
     */
    private boolean sendViaBrevo(String toEmail, String subject, String htmlContent, String type) {
        String apiKey = resolveBrevoApiKey();
        if (apiKey.isBlank()) {
            log.warn("[EMAIL BREVO] BREVO_API_KEY is not configured.");
            return false;
        }

        try {
            String senderEmail = resolveFromAddress();
            String senderName = (fromName != null && !fromName.isBlank()) ? fromName : "REVERIE Haute Horlogerie";

            Map<String, Object> payload = Map.of(
                    "sender", Map.of("name", senderName, "email", senderEmail),
                    "to", List.of(Map.of("email", toEmail)),
                    "subject", subject,
                    "htmlContent", htmlContent
            );

            String jsonBody = objectMapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(brevoApiUrl != null && !brevoApiUrl.isBlank() ? brevoApiUrl : "https://api.brevo.com/v3/smtp/email"))
                    .header("api-key", apiKey)
                    .header("accept", "application/json")
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(10))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("[EMAIL BREVO SUCCESS] Dispatched {} notification to {} via Brevo API (HTTP {})", type, toEmail, response.statusCode());
                return true;
            } else {
                log.warn("[EMAIL BREVO ERROR] Failed to dispatch {} email via Brevo to {}: HTTP {} - {}. (Sender: {})", type, toEmail, response.statusCode(), response.body(), senderEmail);
                return false;
            }
        } catch (Exception e) {
            log.warn("[EMAIL BREVO EXCEPTION] Error dispatching to {}: {}", toEmail, e.getMessage());
            return false;
        }
    }

    /**
     * Standard SMTP Provider (Gmail, Brevo SMTP relay, Amazon SES, Postmark, etc.)
     */
    private boolean sendViaSmtp(String toEmail, String subject, String htmlContent, String type) {
        String username = resolveMailUsername();
        if (mailSender == null || username.isBlank()) {
            log.warn("[EMAIL SMTP NOT CONFIGURED] SMTP credentials (SPRING_MAIL_USERNAME) not set in environment.");
            return false;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String sender = resolveFromAddress();
            if (sender.isBlank() || "concierge@reverie.luxury".equalsIgnoreCase(sender)) {
                sender = username;
            }
            helper.setFrom(sender, fromName);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("[EMAIL SMTP SUCCESS] Transmitted {} notification to {} via SMTP", type, toEmail);
            return true;
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.warn("[EMAIL SMTP ERROR] Failed to send {} email via SMTP to {}: {}", type, toEmail, e.getMessage());
            return false;
        } catch (Exception ex) {
            log.warn("[EMAIL SMTP ERROR] Unexpected error while dispatching email to {}: {}", toEmail, ex.getMessage());
            return false;
        }
    }

    private String buildLuxuryEmailHtml(String headerBadge, String greeting, String bodyText, String code, String footerNote) {
        String template = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>REVERIE Haute Horlogerie</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e4e9;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #0b0c10; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #121318; border: 1px solid #232530; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                                
                                <!-- Brand Header -->
                                <tr>
                                    <td align="center" style="padding: 40px 30px 24px 30px; border-bottom: 1px solid #1c1e26; background: #181920;">
                                        <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c5a059; margin-bottom: 8px;">
                                            {{HEADER_BADGE}}
                                        </div>
                                        <div style="font-size: 28px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: #ffffff; margin: 0;">
                                            R E V E R I E
                                        </div>
                                        <div style="font-size: 9px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: #888d9a; margin-top: 6px;">
                                            Genève • Haute Horlogerie
                                        </div>
                                    </td>
                                </tr>

                                <!-- Message Body -->
                                <tr>
                                    <td style="padding: 36px 36px 20px 36px;">
                                        <p style="font-size: 15px; font-weight: 600; color: #ffffff; margin: 0 0 14px 0; letter-spacing: 0.02em;">
                                            {{GREETING}}
                                        </p>
                                        <p style="font-size: 14px; line-height: 1.6; color: #a1a5b3; margin: 0 0 28px 0;">
                                            {{BODY_TEXT}}
                                        </p>

                                        <!-- OTP Code Box -->
                                        <div style="background-color: #0d0d12; border: 1px solid #2b2e3b; border-radius: 6px; padding: 24px 16px; text-align: center; margin: 28px 0;">
                                            <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #888d9a; margin-bottom: 10px;">
                                                Single-Use Security Token
                                            </div>
                                            <div style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; letter-spacing: 0.35em; color: #d4af37; padding-left: 0.35em;">
                                                {{CODE}}
                                            </div>
                                        </div>

                                        <p style="font-size: 12px; line-height: 1.5; color: #737785; margin: 20px 0 0 0;">
                                            {{FOOTER_NOTE}}
                                        </p>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td align="center" style="padding: 24px 30px; background-color: #0e0f14; border-top: 1px solid #1c1e26;">
                                        <p style="font-size: 11px; color: #5f6371; line-height: 1.6; margin: 0;">
                                            © {{YEAR}} REVERIE SA. All rights reserved.<br>
                                            Manufacture Horlogère Suisse, Rue du Rhône, 1204 Genève, Switzerland.<br>
                                            Confidential security dispatch.
                                        </p>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            """;

        return template
                .replace("{{HEADER_BADGE}}", headerBadge != null ? headerBadge : "SECURITY")
                .replace("{{GREETING}}", greeting != null ? greeting : "Dear Collector,")
                .replace("{{BODY_TEXT}}", bodyText != null ? bodyText : "")
                .replace("{{CODE}}", code != null ? code : "")
                .replace("{{FOOTER_NOTE}}", footerNote != null ? footerNote : "")
                .replace("{{YEAR}}", String.valueOf(java.time.Year.now().getValue()));
    }

    private String buildWelcomeEmailHtml(String recipientName) {
        String template = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to REVERIE</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e4e9;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0c10; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #121318; border: 1px solid #232530; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                                <tr>
                                    <td align="center" style="padding: 40px 30px 24px 30px; border-bottom: 1px solid #1c1e26; background: #181920;">
                                        <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c5a059; margin-bottom: 8px;">
                                            COLLECTOR ONBOARDING
                                        </div>
                                        <div style="font-size: 28px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: #ffffff; margin: 0;">
                                            R E V E R I E
                                        </div>
                                        <div style="font-size: 9px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: #888d9a; margin-top: 6px;">
                                            Genève • Haute Horlogerie
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 36px 36px 28px 36px;">
                                        <p style="font-size: 16px; font-weight: 600; color: #ffffff; margin: 0 0 16px 0;">
                                            Dear {{NAME}},
                                        </p>
                                        <p style="font-size: 14px; line-height: 1.7; color: #b5b9c7; margin: 0 0 20px 0;">
                                            It is our distinct privilege to welcome you to the <strong>REVERIE Manufacture</strong>. Your collector portfolio has been successfully authenticated, granting you bespoke access to our handcrafted horological creations, Salon Privé appointments, and archival timepiece acquisitions.
                                        </p>
                                        
                                        <div style="background-color: #0e0f14; border: 1px solid #242733; border-radius: 6px; padding: 20px; margin: 24px 0;">
                                            <div style="font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">
                                                Your Privileged Benefits
                                            </div>
                                            <ul style="font-size: 13px; line-height: 1.8; color: #9da2b3; margin: 0; padding-left: 20px;">
                                                <li><strong>5-Year Global Atelier Warranty</strong> with certified Swiss provenance seal.</li>
                                                <li><strong>Armored Courier Handover</strong> with end-to-end multi-currency insurance.</li>
                                                <li><strong>Direct Salon Concierge Access</strong> for bespoke fittings and calibre servicing.</li>
                                                <li><strong>Curated Timepiece Wishlist &amp; Vault Allocation</strong> tracking.</li>
                                            </ul>
                                        </div>

                                        <p style="font-size: 13px; line-height: 1.6; color: #888d9a; margin: 24px 0 0 0;">
                                            Should you require custom consultations regarding rare calibre references or private salon bookings in Geneva or Zurich, our horological advisors remain at your disposal.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 24px 30px; background-color: #0e0f14; border-top: 1px solid #1c1e26;">
                                        <p style="font-size: 11px; color: #5f6371; line-height: 1.6; margin: 0;">
                                            © {{YEAR}} REVERIE SA. All rights reserved.<br>
                                            Manufacture Horlogère Suisse, Rue du Rhône, 1204 Genève, Switzerland.<br>
                                            Inquiries: concierge@reverie.luxury
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            """;
        return template
                .replace("{{NAME}}", recipientName != null ? recipientName : "Valued Collector")
                .replace("{{YEAR}}", String.valueOf(java.time.Year.now().getValue()));
    }

    private String buildInvoiceEmailHtml(String name, String orderNumber, long totalPaise, String currency, String paymentMethod, String address, List<Map<String, Object>> items) {
        StringBuilder itemsHtml = new StringBuilder();
        long subtotalPaise = 0L;

        if (items != null && !items.isEmpty()) {
            for (Map<String, Object> it : items) {
                String title = String.valueOf(it.getOrDefault("name", "Haute Horlogerie Reference"));
                String sku = String.valueOf(it.getOrDefault("sku", "R01-CALIBRE"));
                int qty = it.get("quantity") instanceof Number ? ((Number) it.get("quantity")).intValue() : 1;
                long unitPricePaise = it.get("unitPricePaise") instanceof Number ? ((Number) it.get("unitPricePaise")).longValue() : 0L;
                if (unitPricePaise == 0L && it.get("price") instanceof Number) {
                    unitPricePaise = ((Number) it.get("price")).longValue() * 100L;
                }
                long lineTotalPaise = unitPricePaise * qty;
                subtotalPaise += lineTotalPaise;

                double displayUnitPrice = unitPricePaise / 100.0;
                double displayLineTotal = lineTotalPaise / 100.0;

                itemsHtml.append("<tr style=\"border-bottom: 1px solid #1c1e26;\">")
                        .append("<td style=\"padding: 14px 8px; font-size: 13px; color: #ffffff;\">")
                        .append("<strong>").append(title).append("</strong><br>")
                        .append("<span style=\"font-size: 11px; color: #888d9a;\">Ref: ").append(sku).append("</span>")
                        .append("</td>")
                        .append("<td align=\"center\" style=\"padding: 14px 8px; font-size: 13px; color: #b5b9c7;\">").append(qty).append("</td>")
                        .append("<td align=\"right\" style=\"padding: 14px 8px; font-size: 13px; color: #b5b9c7;\">$").append(String.format("%,.2f", displayUnitPrice)).append("</td>")
                        .append("<td align=\"right\" style=\"padding: 14px 8px; font-size: 13px; font-weight: 600; color: #d4af37;\">$").append(String.format("%,.2f", displayLineTotal)).append("</td>")
                        .append("</tr>");
            }
        }

        double displayTotal = totalPaise > 0 ? (totalPaise / 100.0) : (subtotalPaise * 1.18 / 100.0);
        double displayTax = (subtotalPaise * 0.18) / 100.0;
        double displaySubtotal = subtotalPaise / 100.0;

        String template = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>REVERIE Acquisition Invoice</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e4e9;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0c10; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; background-color: #121318; border: 1px solid #232530; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                                
                                <tr>
                                    <td align="center" style="padding: 40px 30px 24px 30px; border-bottom: 1px solid #1c1e26; background: #181920;">
                                        <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c5a059; margin-bottom: 8px;">
                                            OFFICIAL CONSIGNMENT INVOICE
                                        </div>
                                        <div style="font-size: 28px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: #ffffff; margin: 0;">
                                            R E V E R I E
                                        </div>
                                        <div style="font-size: 9px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: #888d9a; margin-top: 6px;">
                                            Manufacture Horlogère Suisse • Genève
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 32px 36px 20px 36px;">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                            <tr>
                                                <td valign="top" style="font-size: 13px; color: #888d9a; line-height: 1.6;">
                                                    <strong style="color: #ffffff; font-size: 14px;">Billed To:</strong><br>
                                                    {{NAME}}<br>
                                                    {{ADDRESS}}
                                                </td>
                                                <td valign="top" align="right" style="font-size: 13px; color: #888d9a; line-height: 1.6;">
                                                    <strong style="color: #ffffff; font-size: 14px;">Invoice Details:</strong><br>
                                                    Order #: <span style="color: #d4af37; font-weight: 600;">{{ORDER_NUMBER}}</span><br>
                                                    Date: {{DATE}}<br>
                                                    Payment: <span style="color: #ffffff;">{{PAYMENT_METHOD}}</span>
                                                </td>
                                            </tr>
                                        </table>

                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 16px; margin-bottom: 24px;">
                                            <thead>
                                                <tr style="border-bottom: 2px solid #2b2e3b; background: #0d0e13;">
                                                    <th align="left" style="padding: 10px 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888d9a;">Timepiece Reference</th>
                                                    <th align="center" style="padding: 10px 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888d9a;">Qty</th>
                                                    <th align="right" style="padding: 10px 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888d9a;">Unit Price</th>
                                                    <th align="right" style="padding: 10px 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888d9a;">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {{ITEMS_ROWS}}
                                            </tbody>
                                        </table>

                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 12px; margin-bottom: 24px;">
                                            <tr>
                                                <td width="55%"></td>
                                                <td width="45%">
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #888d9a; line-height: 1.8;">
                                                        <tr>
                                                            <td>Subtotal:</td>
                                                            <td align="right" style="color: #ffffff;">${{SUBTOTAL}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Insured Courier Handover:</td>
                                                            <td align="right" style="color: #d4af37;">COMPLIMENTARY</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Swiss VAT &amp; Customs (18%):</td>
                                                            <td align="right" style="color: #ffffff;">${{TAX}}</td>
                                                        </tr>
                                                        <tr style="border-top: 1px solid #2b2e3b;">
                                                            <td style="padding-top: 8px; font-size: 15px; font-weight: 700; color: #ffffff;">Total Paid:</td>
                                                            <td align="right" style="padding-top: 8px; font-size: 16px; font-weight: 700; color: #d4af37;">${{TOTAL}} USD</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <div style="background-color: #0e0f14; border: 1px solid #242733; border-radius: 6px; padding: 16px; font-size: 12px; color: #888d9a; line-height: 1.6;">
                                            <strong style="color: #d4af37;">Consignment Security:</strong> This receipt serves as certified proof of purchase and triggers your 5-Year Global Atelier Warranty. Keep this reference for vault servicing and provenance transfer.
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style="padding: 24px 30px; background-color: #0e0f14; border-top: 1px solid #1c1e26;">
                                        <p style="font-size: 11px; color: #5f6371; line-height: 1.6; margin: 0;">
                                            © {{YEAR}} REVERIE SA. All rights reserved.<br>
                                            Manufacture Horlogère Suisse, Rue du Rhône, 1204 Genève, Switzerland.<br>
                                            Insured tracking &amp; documentation.
                                        </p>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            """;

        return template
                .replace("{{NAME}}", name != null ? name : "Valued Collector")
                .replace("{{ADDRESS}}", address != null && !address.isBlank() ? address : "Insured Delivery Destination")
                .replace("{{ORDER_NUMBER}}", orderNumber != null ? orderNumber : "REV-ORD")
                .replace("{{DATE}}", java.time.LocalDate.now().toString())
                .replace("{{PAYMENT_METHOD}}", paymentMethod != null ? paymentMethod : "Direct Secure Gateway")
                .replace("{{ITEMS_ROWS}}", itemsHtml.toString())
                .replace("{{SUBTOTAL}}", String.format("%,.2f", displaySubtotal))
                .replace("{{TAX}}", String.format("%,.2f", displayTax))
                .replace("{{TOTAL}}", String.format("%,.2f", displayTotal))
                .replace("{{YEAR}}", String.valueOf(java.time.Year.now().getValue()));
    }
}
