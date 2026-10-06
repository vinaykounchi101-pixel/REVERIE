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
     * Central dispatcher coordinating Resend, Brevo, SMTP, and Mock fallbacks
     */
    private void dispatchEmail(String toEmail, String subject, String htmlContent, String otpCode, String type) {
        String provider = (emailProvider != null && !emailProvider.isBlank()) ? emailProvider.trim().toLowerCase() : "auto";
        boolean sent = false;

        switch (provider) {
            case "resend" -> sent = sendViaResend(toEmail, subject, htmlContent, type);
            case "brevo" -> sent = sendViaBrevo(toEmail, subject, htmlContent, type);
            case "smtp" -> sent = sendViaSmtp(toEmail, subject, htmlContent, type);
            case "mock", "dev" -> {
                log.info("[EMAIL MOCK] Provider set to '{}'. Dispatched simulated {} for [{}]: {}", provider, type, toEmail, otpCode);
                return;
            }
            default -> {
                // "auto" mode: dynamically route based on present credentials
                if (resendApiKey != null && !resendApiKey.isBlank()) {
                    sent = sendViaResend(toEmail, subject, htmlContent, type);
                } else if (brevoApiKey != null && !brevoApiKey.isBlank()) {
                    sent = sendViaBrevo(toEmail, subject, htmlContent, type);
                } else if (mailSender != null && mailUsername != null && !mailUsername.isBlank()) {
                    sent = sendViaSmtp(toEmail, subject, htmlContent, type);
                }
            }
        }

        if (!sent) {
            log.info("[EMAIL FALLBACK NOTIFICATION] Dispatched simulated {} token for [{}] (Code: {}). Provide RESEND_API_KEY, BREVO_API_KEY, or SPRING_MAIL_USERNAME in environment for live delivery.", type, toEmail, otpCode);
        }
    }

    /**
     * Resend API Provider (https://resend.com)
     */
    private boolean sendViaResend(String toEmail, String subject, String htmlContent, String type) {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            log.warn("[EMAIL RESEND] RESEND_API_KEY is not configured.");
            return false;
        }

        try {
            String senderEmail = (fromAddress != null && !fromAddress.isBlank()) ? fromAddress : "onboarding@resend.dev";
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
                    .header("Authorization", "Bearer " + resendApiKey.trim())
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(10))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("[EMAIL RESEND SUCCESS] Dispatched {} notification to {} via Resend API (HTTP {})", type, toEmail, response.statusCode());
                return true;
            } else {
                log.error("[EMAIL RESEND ERROR] Failed to dispatch {} email via Resend to {}: HTTP {} - {}", type, toEmail, response.statusCode(), response.body());
                return false;
            }
        } catch (Exception e) {
            log.error("[EMAIL RESEND EXCEPTION] Error dispatching to {}: {}", toEmail, e.getMessage());
            return false;
        }
    }

    /**
     * Brevo API Provider (https://brevo.com / Sendinblue)
     */
    private boolean sendViaBrevo(String toEmail, String subject, String htmlContent, String type) {
        if (brevoApiKey == null || brevoApiKey.isBlank()) {
            log.warn("[EMAIL BREVO] BREVO_API_KEY is not configured.");
            return false;
        }

        try {
            String senderEmail = (fromAddress != null && !fromAddress.isBlank()) ? fromAddress : "concierge@reverie.luxury";
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
                    .header("api-key", brevoApiKey.trim())
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
                log.error("[EMAIL BREVO ERROR] Failed to dispatch {} email via Brevo to {}: HTTP {} - {}. Note: Ensure your sender address ({}) is verified in Brevo Dashboard.", type, toEmail, response.statusCode(), response.body(), senderEmail);
                return false;
            }
        } catch (Exception e) {
            log.error("[EMAIL BREVO EXCEPTION] Error dispatching to {}: {}", toEmail, e.getMessage());
            return false;
        }
    }

    /**
     * Standard SMTP Provider (Gmail, Brevo SMTP relay, Amazon SES, Postmark, etc.)
     */
    private boolean sendViaSmtp(String toEmail, String subject, String htmlContent, String type) {
        if (mailSender == null || mailUsername == null || mailUsername.isBlank()) {
            log.warn("[EMAIL SMTP NOT CONFIGURED] SMTP credentials (SPRING_MAIL_USERNAME) not set in environment.");
            return false;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String sender = (fromAddress != null && !fromAddress.isBlank()) ? fromAddress : mailUsername;
            helper.setFrom(sender, fromName);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("[EMAIL SMTP SUCCESS] Transmitted {} notification to {} via SMTP", type, toEmail);
            return true;
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.error("[EMAIL SMTP ERROR] Failed to send {} email via SMTP to {}: {}", type, toEmail, e.getMessage());
            return false;
        } catch (Exception ex) {
            log.error("[EMAIL SMTP ERROR] Unexpected error while dispatching email to {}: {}", toEmail, ex.getMessage());
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
}
