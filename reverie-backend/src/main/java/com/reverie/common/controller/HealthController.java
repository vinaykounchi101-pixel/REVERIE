package com.reverie.common.controller;

import com.reverie.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping({"/api/health", "/health", "/actuator/health"})
@Tag(name = "Health & Diagnostics", description = "System liveness and environment diagnostics")
public class HealthController {

    @Value("${app.environment:local}")
    private String environment;

    @GetMapping
    @Operation(summary = "Liveness check", description = "Returns system status, environment profile, and current UTC timestamp")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealth() {
        Map<String, Object> healthData = Map.of(
                "status", "UP",
                "service", "reverie-backend",
                "version", "2.0.0",
                "environment", environment,
                "timestamp", Instant.now()
        );
        return ResponseEntity.ok(ApiResponse.success("REVERIE API Engine Operational", healthData));
    }
}
