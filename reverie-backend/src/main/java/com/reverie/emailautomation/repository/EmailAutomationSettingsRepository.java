package com.reverie.emailautomation.repository;

import com.reverie.emailautomation.entity.EmailAutomationSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailAutomationSettingsRepository extends JpaRepository<EmailAutomationSettings, String> {

    default Optional<EmailAutomationSettings> findGlobalSettings() {
        return findById("GLOBAL");
    }
}
