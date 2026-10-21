package com.reverie.testutil;

import com.reverie.ReverieApplication;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DatabaseResetRunner {

    @Test
    public void resetSchema() throws Exception {
        Method loadEnv = ReverieApplication.class.getDeclaredMethod("loadDotEnvIfPresent");
        loadEnv.setAccessible(true);
        loadEnv.invoke(null);

        Method normalize = ReverieApplication.class.getDeclaredMethod("normalizeDatabaseConfiguration");
        normalize.setAccessible(true);
        normalize.invoke(null);

        String jdbcUrl = System.getProperty("spring.datasource.url");
        String user = System.getProperty("spring.datasource.username");
        String pass = System.getProperty("spring.datasource.password");

        System.out.println("[RESET] Connecting to Supabase database...");
        Class.forName("org.postgresql.Driver");
        try (Connection conn = DriverManager.getConnection(jdbcUrl, user, pass);
             Statement stmt = conn.createStatement()) {
            System.out.println("[RESET] Dropping schema public CASCADE...");
            stmt.execute("DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;");
            System.out.println("[RESET] Schema public dropped and recreated successfully!");
        }
    }
}
