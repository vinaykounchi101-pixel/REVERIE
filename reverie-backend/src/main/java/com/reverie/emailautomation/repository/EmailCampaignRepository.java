package com.reverie.emailautomation.repository;

import com.reverie.emailautomation.entity.EmailCampaign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface EmailCampaignRepository extends JpaRepository<EmailCampaign, UUID> {

    List<EmailCampaign> findByStatus(String status);

    Page<EmailCampaign> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT c FROM EmailCampaign c WHERE (c.status = 'ACTIVE' OR c.status = 'SCHEDULED') " +
           "AND (c.scheduledStartAt IS NULL OR c.scheduledStartAt <= :now) " +
           "AND (c.scheduledEndAt IS NULL OR c.scheduledEndAt >= :now)")
    List<EmailCampaign> findDueCampaigns(@Param("now") Instant now);
}
