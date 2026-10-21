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
        String dbUser = getEnvOrProp("DB_USER", getEnvOrProp("POSTGRES_USER"));
        String dbPass = getEnvOrProp("DB_PASSWORD", getEnvOrProp("POSTGRES_PASSWORD", ""));
        String sslMode = getEnvOrProp("DB_SSLMODE", "require");

        String rawDbUrl = getEnvOrProp("SPRING_DATASOURCE_URL", getEnvOrProp("DATABASE_URL", getEnvOrProp("DB_URL")));
        String finalJdbcUrl = null;
        String finalUser = dbUser;
        String finalPass = dbPass;

        String rawPassFromUrl = null;
        if (rawDbUrl != null && !rawDbUrl.isBlank() && !rawDbUrl.contains("${")) {
            rawDbUrl = rawDbUrl.trim();
            try {
                if (rawDbUrl.startsWith("postgres://") || rawDbUrl.startsWith("postgresql://")) {
                    String withoutProto = rawDbUrl.startsWith("postgres://") 
                            ? rawDbUrl.substring("postgres://".length()) 
                            : rawDbUrl.substring("postgresql://".length());

                    int atIdx = withoutProto.lastIndexOf('@');
                    String userInfo = atIdx > 0 ? withoutProto.substring(0, atIdx) : null;
                    String hostPortAndRest = atIdx >= 0 ? withoutProto.substring(atIdx + 1) : withoutProto;

                    if (userInfo != null) {
                        int colonIdx = userInfo.indexOf(':');
                        if (colonIdx >= 0) {
                            finalUser = decodeUriComponent(userInfo.substring(0, colonIdx));
                            rawPassFromUrl = userInfo.substring(colonIdx + 1);
                            finalPass = decodeUriComponent(rawPassFromUrl);
                        } else {
                            finalUser = decodeUriComponent(userInfo);
                        }
                    }

                    int queryIdx = hostPortAndRest.indexOf('?');
                    String query = queryIdx >= 0 ? hostPortAndRest.substring(queryIdx + 1) : "";
                    String hostPortDb = queryIdx >= 0 ? hostPortAndRest.substring(0, queryIdx) : hostPortAndRest;

                    int slashIdx = hostPortDb.indexOf('/');
                    String path = slashIdx >= 0 && slashIdx + 1 < hostPortDb.length() ? hostPortDb.substring(slashIdx + 1) : "postgres";
                    String hostPort = slashIdx >= 0 ? hostPortDb.substring(0, slashIdx) : hostPortDb;

                    int portColon = hostPort.lastIndexOf(':');
                    String host = portColon >= 0 ? hostPort.substring(0, portColon) : hostPort;
                    int port = 5432;
                    if (portColon >= 0) {
                        try {
                            port = Integer.parseInt(hostPort.substring(portColon + 1));
                        } catch (NumberFormatException ignored) {
                        }
                    }

                    finalJdbcUrl = "jdbc:postgresql://" + host + ":" + port + "/" + path;
                    if (!query.isBlank()) {
                        finalJdbcUrl += "?" + query;
                        if (!finalJdbcUrl.contains("sslmode=")) {
                            finalJdbcUrl += "&sslmode=" + sslMode;
                        }
                    } else {
                        finalJdbcUrl += "?sslmode=" + sslMode;
                    }
                } else if (rawDbUrl.startsWith("jdbc:postgresql://")) {
                    finalJdbcUrl = rawDbUrl;
                    if (!finalJdbcUrl.contains("sslmode=")) {
                        finalJdbcUrl += (finalJdbcUrl.contains("?") ? "&" : "?") + "sslmode=" + sslMode;
                    }
                }
            } catch (Exception ex) {
                log.error("[DB CONFIG ERROR] Failed parsing raw database URL: {}", ex.getMessage());
            }
        }

        if (finalJdbcUrl == null && dbHost != null && !dbHost.isBlank() && !dbHost.contains("${")) {
            finalJdbcUrl = "jdbc:postgresql://" + dbHost + ":" + dbPort + "/" + dbName + "?sslmode=" + sslMode;
        }

        if (finalJdbcUrl != null) {
            log.info("[DB PRE-FLIGHT PROBE] Detected DB_USER: '{}', URL user: '{}'", dbUser, finalUser);
            log.info("[DB PRE-FLIGHT PROBE] dbPass present: {}, urlPass present: {}", 
                    (dbPass != null && !dbPass.isBlank()), (finalPass != null && !finalPass.isBlank()));

            String primaryUser = finalUser;
            if (dbUser != null && !dbUser.isBlank() && !dbUser.equalsIgnoreCase("postgres")) {
                primaryUser = dbUser;
            } else if (primaryUser == null || primaryUser.isBlank()) {
                primaryUser = dbUser;
            }

            // On Supabase pooler, username requires .<project_ref> suffix if not already present
            if (finalJdbcUrl.contains("pooler.supabase.com") && primaryUser != null && !primaryUser.contains(".")) {
                String projRef = getEnvOrProp("SUPABASE_PROJECT_REF", getEnvOrProp("SUPABASE_PROJECT_ID", getEnvOrProp("PROJECT_REF")));
                if (projRef == null && finalUser != null && finalUser.contains(".")) {
                    projRef = finalUser.substring(finalUser.indexOf('.') + 1);
                }
                if (projRef != null && !projRef.isBlank()) {
                    primaryUser = primaryUser + "." + projRef;
                }
            }

            if (primaryUser != null) {
                primaryUser = primaryUser.trim();
                if ((primaryUser.startsWith("\"") && primaryUser.endsWith("\"") && primaryUser.length() >= 2) ||
                    (primaryUser.startsWith("'") && primaryUser.endsWith("'") && primaryUser.length() >= 2) ||
                    (primaryUser.startsWith("[") && primaryUser.endsWith("]") && primaryUser.length() >= 2)) {
                    primaryUser = primaryUser.substring(1, primaryUser.length() - 1).trim();
                }
            }

            java.util.List<String> passCandidates = new java.util.ArrayList<>();
            if (dbPass != null && !dbPass.isBlank() && !isPlaceholder(dbPass)) {
                String clean = dbPass.trim();
                if ((clean.startsWith("\"") && clean.endsWith("\"") && clean.length() >= 2) ||
                    (clean.startsWith("'") && clean.endsWith("'") && clean.length() >= 2) ||
                    (clean.startsWith("[") && clean.endsWith("]") && clean.length() >= 2)) {
                    clean = clean.substring(1, clean.length() - 1).trim();
                }
                passCandidates.add(clean);
            }
            if (finalPass != null && !finalPass.isBlank() && !isPlaceholder(finalPass)) {
                String clean = finalPass.trim();
                if ((clean.startsWith("\"") && clean.endsWith("\"") && clean.length() >= 2) ||
                    (clean.startsWith("'") && clean.endsWith("'") && clean.length() >= 2) ||
                    (clean.startsWith("[") && clean.endsWith("]") && clean.length() >= 2)) {
                    clean = clean.substring(1, clean.length() - 1).trim();
                }
                if (!passCandidates.contains(clean)) {
                    passCandidates.add(clean);
                }
            }
            if (rawPassFromUrl != null && !rawPassFromUrl.isBlank() && !isPlaceholder(rawPassFromUrl)) {
                String clean = rawPassFromUrl.trim();
                if ((clean.startsWith("\"") && clean.endsWith("\"") && clean.length() >= 2) ||
                    (clean.startsWith("'") && clean.endsWith("'") && clean.length() >= 2) ||
                    (clean.startsWith("[") && clean.endsWith("]") && clean.length() >= 2)) {
                    clean = clean.substring(1, clean.length() - 1).trim();
                }
                if (!passCandidates.contains(clean)) {
                    passCandidates.add(clean);
                }
            }

            String activePass = passCandidates.isEmpty() ? "" : passCandidates.get(0);
            finalUser = primaryUser;

            String maskedJdbcUrl = finalJdbcUrl.replaceAll("(?i)(password=)[^&;]*", "$1******");
            log.info("================================================================================");
            log.info("[DB PRE-FLIGHT PROBE] Connecting to: {}", maskedJdbcUrl);
            log.info("[DB PRE-FLIGHT PROBE] Target User: {}", finalUser);
            log.info("================================================================================");

            boolean connected = false;
            try {
                Class.forName("org.postgresql.Driver");
                for (String testPass : passCandidates) {
                    try (java.sql.Connection conn = java.sql.DriverManager.getConnection(finalJdbcUrl, finalUser, testPass)) {
                        connected = true;
                        activePass = testPass;
                        log.info("================================================================================");
                        log.info("[DB PRE-FLIGHT SUCCESS] Successfully connected to PostgreSQL! Product: {}, Version: {}", 
                                conn.getMetaData().getDatabaseProductName(), 
                                conn.getMetaData().getDatabaseProductVersion());
                        log.info("================================================================================");
                        break;
                    } catch (java.sql.SQLException ex) {
                        log.info("[DB PROBE ATTEMPT RESULT] Error: {}", ex.getMessage());
                    }
                }
            } catch (Exception e) {
                log.error("[DB PRE-FLIGHT ERROR] Unexpected driver error: {}", e.getMessage(), e);
            }

            finalPass = activePass;
            System.setProperty("spring.datasource.url", finalJdbcUrl);
            System.setProperty("spring.flyway.url", finalJdbcUrl);
            if (finalUser != null && !finalUser.isBlank()) {
                System.setProperty("spring.datasource.username", finalUser);
                System.setProperty("spring.flyway.user", finalUser);
            }
            if (finalPass != null) {
                System.setProperty("spring.datasource.password", finalPass);
                System.setProperty("spring.flyway.password", finalPass);
            }
        } else {
            log.error("[DB CONFIG FATAL] No DB_HOST or DATABASE_URL provided. Database connection cannot be established.");
        }
    }

    private static boolean isPlaceholder(String p) {
        if (p == null) return true;
        String lower = p.toLowerCase();
        return lower.contains("your-password") || lower.contains("your_password") || 
               lower.contains("placeholder") || lower.contains("your_secure_db_password");
    }

    private static String decodeUriComponent(String s) {
        if (s == null) return null;
        if (!s.contains("%")) return s;
        try {
            String protectedStr = s.replace("+", "%2B");
            return URLDecoder.decode(protectedStr, StandardCharsets.UTF_8);
        } catch (Exception e) {
            return s;
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
        String customEnv = getEnvOrProp("ENV_FILE");

        if (customEnv != null && !customEnv.isBlank()) {
            File customFile = resolveEnvFile(customEnv, userDir);
            if (customFile != null) {
                loadPropertiesFromFile(customFile);
                return;
            }
        }

        // 1. Load base .env if present
        File baseEnv = resolveEnvFile(".env", userDir);
        if (baseEnv != null) {
            loadPropertiesFromFile(baseEnv);
        }

        // 2. Load .env.deployment if present (overlaying base properties for deployment / cloud)
        File deploymentEnv = resolveEnvFile(".env.deployment", userDir);
        if (deploymentEnv != null) {
            loadPropertiesFromFile(deploymentEnv);
        }
    }

    private static File resolveEnvFile(String filename, String userDir) {
        File base = new File(userDir).getAbsoluteFile();
        File current = base;
        for (int i = 0; i < 4 && current != null; i++) {
            File candidate = new File(current, filename);
            if (candidate.exists() && candidate.isFile()) {
                return candidate;
            }
            current = current.getParentFile();
        }
        File direct = new File(filename);
        if (direct.exists() && direct.isFile()) {
            return direct;
        }
        return null;
    }

    private static void loadPropertiesFromFile(File file) {
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
                if ((value.startsWith("\"") && value.endsWith("\"") && value.length() >= 2) ||
                    (value.startsWith("'") && value.endsWith("'") && value.length() >= 2) ||
                    (value.startsWith("[") && value.endsWith("]") && value.length() >= 2)) {
                    value = value.substring(1, value.length() - 1).trim();
                }
                System.setProperty(key, value);
                if ("SPRING_PROFILES_ACTIVE".equalsIgnoreCase(key)) {
                    System.setProperty("spring.profiles.active", value);
                }
                if ("SERVER_PORT".equalsIgnoreCase(key) || "PORT".equalsIgnoreCase(key)) {
                    System.setProperty("server.port", value);
                }
                loadedCount++;
            }
            log.info("[ENV LOADER] Initialized {} environment properties from active environment file at {}", loadedCount, file.getAbsolutePath());
        } catch (Exception ex) {
            log.warn("[ENV LOADER] Could not read environment file {}: {}", file.getName(), ex.getMessage());
        }
    }
}
