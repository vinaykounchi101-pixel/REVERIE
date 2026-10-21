package com.reverie.emailautomation.repository;

import com.reverie.emailautomation.entity.EmailCampaign;
import com.reverie.emailautomation.entity.EmailCampaignSend;
import com.reverie.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmailCampaignSendRepository extends JpaRepository<EmailCampaignSend, UUID> {

    boolean existsByCampaignAndCustomer(EmailCampaign campaign, User customer);

    Optional<EmailCampaignSend> findByCampaignAndCustomer(EmailCampaign campaign, User customer);

    Page<EmailCampaignSend> findByCampaignOrderByCreatedAtDesc(EmailCampaign campaign, Pageable pageable);

    long countByCampaignAndStatus(EmailCampaign campaign, String status);
}
