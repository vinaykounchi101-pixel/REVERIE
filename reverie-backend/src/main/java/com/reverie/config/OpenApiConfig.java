package com.reverie.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI reverieOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("REVERIE — Luxury Mechanical Watch E-Commerce API")
                        .description("REST API documentation for the REVERIE luxury horology platform. Authoritative for catalog, cart, checkout, payments, inventory, and order management.")
                        .version("2.0.0")
                        .contact(new Contact()
                                .name("REVERIE Engineering Team")
                                .email("engineering@reverie.app"))
                        .license(new License()
                                .name("Proprietary")
                                .url("https://reverie.app/terms")))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Provide valid Bearer JWT access token.")));
    }
}
