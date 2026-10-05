package com.reverie.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.environment:local}")
    private String environment;

    @Value("${app.frontend-origin:http://localhost:3000,http://localhost:3001}")
    private String allowedOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        List<String> patterns = new java.util.ArrayList<>();

        // In production, strictly use configured origins; in local/dev allow local ports & dev tunnels
        if ("production".equalsIgnoreCase(environment)) {
            for (String origin : origins) {
                String trimmed = origin.trim();
                if (!trimmed.isEmpty()) {
                    patterns.add(trimmed);
                }
            }
        } else {
            patterns.addAll(Arrays.asList(
                "http://localhost:*",
                "http://127.0.0.1:*",
                "https://*.onrender.com",
                "https://*.vercel.app",
                "https://*.loca.lt",
                "https://*.ngrok-free.app",
                "https://*.ngrok.io"
            ));
            for (String origin : origins) {
                String trimmed = origin.trim();
                if (!trimmed.isEmpty() && !patterns.contains(trimmed)) {
                    patterns.add(trimmed);
                }
            }
        }
        configuration.setAllowedOriginPatterns(patterns);
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "X-Total-Count", "X-Idempotency-Key"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
