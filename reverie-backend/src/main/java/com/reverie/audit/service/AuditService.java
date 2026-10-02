package com.reverie.audit.service;

import com.reverie.audit.entity.AuditLog;
import com.reverie.audit.repository.AuditLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuditService {

    private static final Logger log = LoggerFactory.getLogger(AuditService.class);

    private final AuditLogRepository auditLogRepository;

    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public void logAction(String actorType, UUID actorId, String action, String resourceType, UUID resourceId, String result, String ip, String metadataJson) {
        try {
            AuditLog auditLog = new AuditLog(actorType, actorId, action, resourceType, resourceId, result, ip, metadataJson);
            auditLogRepository.save(auditLog);
            log.info("Audit logged: [actor={}, action={}, resource={}]", actorId, action, resourceType);
        } catch (Exception ex) {
            log.error("Failed to persist audit log", ex);
        }
    }
}
