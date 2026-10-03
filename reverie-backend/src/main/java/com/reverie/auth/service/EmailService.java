package com.reverie.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${app.mail.from-address:}")
    private String fromAddress;

    @Value("${app.mail.from-name:REVERIE Haute Horlogerie}")
    private String fromName;

    @Autowired
    public EmailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
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

        sendMimeEmail(toEmail, subject, htmlContent, otpCode, "EMAIL_VERIFICATION");
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

        sendMimeEmail(toEmail, subject, htmlContent, otpCode, "PASSWORD_RESET");
    }

    private void sendMimeEmail(String toEmail, String subject, String htmlContent, String otpCode, String type) {
        if (mailSender == null || mailUsername == null || mailUsername.isBlank()) {
            log.warn("[EMAIL SERVICE NOT CONFIGURED] Gmail SMTP credentials (SPRING_MAIL_USERNAME) not set in environment. " +
                    "Logging {} OTP for {}: {}", type, toEmail, otpCode);
            return;
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
            log.info("[EMAIL SENT] Successfully transmitted {} OTP to {}", type, toEmail);
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.error("[EMAIL ERROR] Failed to send {} email to {}: {}", type, toEmail, e.getMessage());
            log.info("[FALLBACK OTP] Verification code for {}: {}", toEmail, otpCode);
        } catch (Exception ex) {
            log.error("[EMAIL ERROR] Unexpected error while dispatching email to {}: {}", toEmail, ex.getMessage());
            log.info("[FALLBACK OTP] Verification code for {}: {}", toEmail, otpCode);
        }
    }

    private String buildLuxuryEmailHtml(String headerBadge, String greeting, String bodyText, String code, String footerNote) {
        return """
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
                                    <td align="center" style="padding: 40px 30px 24px 30px; border-bottom: 1px solid #1c1e26; background: radial-gradient(circle at top, #1c1d25 0%%, #121318 100%%);">
                                        <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c5a059; margin-bottom: 8px;">
                                            %s
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
                                            %s
                                        </p>
                                        <p style="font-size: 14px; line-height: 1.6; color: #a1a5b3; margin: 0 0 28px 0;">
                                            %s
                                        </p>

                                        <!-- OTP Code Box -->
                                        <div style="background-color: #0d0d12; border: 1px solid #2b2e3b; border-radius: 6px; padding: 24px 16px; text-align: center; margin: 28px 0;">
                                            <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #888d9a; margin-bottom: 10px;">
                                                Single-Use Security Token
                                            </div>
                                            <div style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; letter-spacing: 0.35em; color: #d4af37; padding-left: 0.35em;">
                                                %s
                                            </div>
                                        </div>

                                        <p style="font-size: 12px; line-height: 1.5; color: #737785; margin: 20px 0 0 0;">
                                            %s
                                        </p>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td align="center" style="padding: 24px 30px; background-color: #0e0f14; border-top: 1px solid #1c1e26;">
                                        <p style="font-size: 11px; color: #5f6371; line-height: 1.6; margin: 0;">
                                            © %d REVERIE SA. All rights reserved.<br>
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
            """.formatted(headerBadge, greeting, bodyText, code, footerNote, java.time.Year.now().getValue());
    }
}
