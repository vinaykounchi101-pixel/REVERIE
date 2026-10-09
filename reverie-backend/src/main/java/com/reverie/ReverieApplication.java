package com.reverie;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
@ConfigurationPropertiesScan
public class ReverieApplication {

    private static final Logger log = LoggerFactory.getLogger(ReverieApplication.class);

    public static void main(String[] args) {
        loadDotEnvIfPresent();
        normalizeDatabaseConfiguration();
        SpringApplication.run(ReverieApplication.class, args);
    }

    private static void normalizeDatabaseConfiguration() {
        String dbHost = getEnvOrProp("DB_HOST");
        String dbPort = getEnvOrProp("DB_PORT", "5432");
        String dbName = getEnvOrProp("DB_NAME", "postgres");
        String dbUser = getEnvOrProp("DB_USER", getEnvOrProp("POSTGRES_USER", "postgres"));
        String dbPass = getEnvOrProp("DB_PASSWORD", getEnvOrProp("POSTGRES_PASSWORD", ""));
        String sslMode = getEnvOrProp("DB_SSLMODE", "require");

        String rawDbUrl = getEnvOrProp("SPRING_DATASOURCE_URL", getEnvOrProp("DATABASE_URL", getEnvOrProp("DB_URL")));

        if (rawDbUrl != null && !rawDbUrl.isBlank() && !rawDbUrl.contains("${")) {
            try {
                if (rawDbUrl.startsWith("postgres://") || rawDbUrl.startsWith("postgresql://")) {
                    String cleanUri = rawDbUrl.startsWith("postgres://") ? "http://" + rawDbUrl.substring(11) : "http://" + rawDbUrl.substring(13);
                    URI uri = URI.create(cleanUri);
                    String host = uri.getHost();
                    int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                    String path = uri.getPath() != null && uri.getPath().length() > 1 ? uri.getPath().substring(1) : "postgres";
                    
                    if (uri.getUserInfo() != null && !uri.getUserInfo().isBlank()) {
                        String[] userPass = uri.getUserInfo().split(":", 2);
                        if (userPass.length > 0) dbUser = URLDecoder.decode(userPass[0], StandardCharsets.UTF_8);
                        if (userPass.length > 1) dbPass = URLDecoder.decode(userPass[1], StandardCharsets.UTF_8);
                    }
                    
                    String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + "/" + path + "?sslmode=" + sslMode;
                    System.setProperty("spring.datasource.url", jdbcUrl);
                    System.setProperty("spring.datasource.username", dbUser);
                    System.setProperty("spring.datasource.password", dbPass);
                    log.info("[DB NORMALIZER] Normalized URI database URL to target {}:{}/{} for user {} (SSL: {})", host, port, path, dbUser, sslMode);
                    return;
                } else if (rawDbUrl.startsWith("jdbc:postgresql://")) {
                    String finalUrl = rawDbUrl;
                    if (!finalUrl.contains("sslmode=")) {
                        finalUrl += (finalUrl.contains("?") ? "&" : "?") + "sslmode=" + sslMode;
                    }
                    System.setProperty("spring.datasource.url", finalUrl);
                    if (dbUser != null && !dbUser.isBlank()) System.setProperty("spring.datasource.username", dbUser);
                    if (dbPass != null) System.setProperty("spring.datasource.password", dbPass);
                    log.info("[DB NORMALIZER] Configured JDBC datasource with SSL mode {}", sslMode);
                    return;
                }
            } catch (Exception ex) {
                log.warn("[DB NORMALIZER] Failed parsing raw database URL: {}", ex.getMessage());
            }
        }

        if (dbHost != null && !dbHost.isBlank() && !dbHost.contains("${")) {
            String jdbcUrl = "jdbc:postgresql://" + dbHost + ":" + dbPort + "/" + dbName + "?sslmode=" + sslMode;
            System.setProperty("spring.datasource.url", jdbcUrl);
            System.setProperty("spring.datasource.username", dbUser);
            System.setProperty("spring.datasource.password", dbPass);
            log.info("[DB NORMALIZER] Configured PostgreSQL connection target: {}:{}/{} for user: {} (SSL: {})", dbHost, dbPort, dbName, dbUser, sslMode);
        }
    }

    private static String getEnvOrProp(String key) {
        return getEnvOrProp(key, null);
    }

    private static String getEnvOrProp(String key, String fallback) {
        String val = System.getProperty(key);
        if (val != null && !val.isBlank() && !val.contains("${")) return val.trim();
        val = System.getenv(key);
        if (val != null && !val.isBlank() && !val.contains("${")) return val.trim();
        return fallback;
    }

    private static void loadDotEnvIfPresent() {
        String userDir = System.getProperty("user.dir", ".");
        File[] candidates = new File[] {
            new File(".env"),
            new File("../.env"),
            new File(userDir, ".env"),
            new File(new File(userDir).getParentFile(), ".env"),
            new File("E:/Projects/REVERIE/.env")
        };
        for (File file : candidates) {
            if (file != null && file.exists() && file.isFile()) {
                try (BufferedReader reader = new BufferedReader(new FileReader(file, StandardCharsets.UTF_8))) {
                    String line;
                    int loadedCount = 0;
                    while ((line = reader.readLine()) != null) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#") || !line.contains("=")) {
                            continue;
                        }
                        int eqIdx = line.indexOf('=');
                        String key = line.substring(0, eqIdx).trim();
                        String value = line.substring(eqIdx + 1).trim();
                        if ((value.startsWith("\"") && value.endsWith("\"")) ||
                            (value.startsWith("'") && value.endsWith("'"))) {
                            value = value.substring(1, value.length() - 1);
                        }
                        System.setProperty(key, value);
                        loadedCount++;
                    }
                    log.info("[ENV LOADER] Initialized {} environment properties from active environment file at {}", loadedCount, file.getAbsolutePath());
                } catch (Exception ignored) {
                }
                break;
            }
        }
    }
}
