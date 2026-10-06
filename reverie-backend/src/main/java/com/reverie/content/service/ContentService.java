package com.reverie.content.service;

import com.reverie.audit.service.AuditService;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.content.dto.BrandStoryDto;
import com.reverie.content.dto.CreateBrandStoryRequest;
import com.reverie.content.dto.CreateFaqRequest;
import com.reverie.content.dto.FaqDto;
import com.reverie.content.entity.BrandStory;
import com.reverie.content.entity.FaqItem;
import com.reverie.content.repository.BrandStoryRepository;
import com.reverie.content.repository.FaqItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContentService {

    private final FaqItemRepository faqRepository;
    private final BrandStoryRepository storyRepository;
    private final AuditService auditService;

    public ContentService(
            FaqItemRepository faqRepository,
            BrandStoryRepository storyRepository,
            AuditService auditService) {
        this.faqRepository = faqRepository;
        this.storyRepository = storyRepository;
        this.auditService = auditService;
    }

    // --- FAQs ---

    @Transactional(readOnly = true)
    public List<FaqDto> getAllPublishedFaqs() {
        return faqRepository.findByIsPublishedTrueOrderByDisplayOrderAsc().stream()
                .map(FaqDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FaqDto> getFaqsByCategory(String category) {
        return faqRepository.findByCategoryAndIsPublishedTrueOrderByDisplayOrderAsc(category).stream()
                .map(FaqDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public FaqDto createFaq(CreateFaqRequest request, UUID adminId) {
        FaqItem item = new FaqItem(
                request.getCategory(),
                request.getQuestion(),
                request.getAnswer(),
                request.getDisplayOrder(),
                request.getIsPublished()
        );
        item = faqRepository.save(item);

        auditService.logAction("ADMIN", adminId, "FAQ_CREATE", "FAQ", item.getId(), "SUCCESS", "127.0.0.1", "Category: " + item.getCategory());

        return FaqDto.fromEntity(item);
    }

    @Transactional(readOnly = true)
    public List<FaqDto> getAllFaqsForAdmin() {
        return faqRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(FaqDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteFaq(UUID faqId, UUID adminId) {
        FaqItem item = faqRepository.findById(faqId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "FAQ not found"));
        faqRepository.delete(item);

        auditService.logAction("ADMIN", adminId, "FAQ_DELETE", "FAQ", faqId, "SUCCESS", "127.0.0.1", null);
    }

    // --- Brand Stories & Editorial ---

    @Transactional(readOnly = true)
    public Page<BrandStoryDto> getPublishedStories(Pageable pageable) {
        return storyRepository.findByIsPublishedTrueOrderByCreatedAtDesc(pageable)
                .map(BrandStoryDto::fromEntity);
    }

    @Transactional(readOnly = true)
    public Page<BrandStoryDto> getAllStoriesForAdmin(Pageable pageable) {
        return storyRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(BrandStoryDto::fromEntity);
    }

    @Transactional(readOnly = true)
    public BrandStoryDto getStoryBySlug(String slug) {
        BrandStory story = storyRepository.findBySlugAndIsPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Brand story not found: " + slug));
        return BrandStoryDto.fromEntity(story);
    }

    @Transactional
    public BrandStoryDto createOrUpdateStory(CreateBrandStoryRequest request, UUID adminId) {
        BrandStory story = storyRepository.findBySlug(request.getSlug())
                .orElseGet(BrandStory::new);

        story.setSlug(request.getSlug());
        story.setTitle(request.getTitle());
        story.setSubtitle(request.getSubtitle());
        story.setContent(request.getContent());
        story.setCoverImageUrl(request.getCoverImageUrl());
        story.setAuthorName(request.getAuthorName());
        story.setIsPublished(request.getIsPublished());

        story = storyRepository.save(story);

        auditService.logAction("ADMIN", adminId, "STORY_SAVE", "BRAND_STORY", story.getId(), "SUCCESS", "127.0.0.1", "Slug: " + story.getSlug());

        return BrandStoryDto.fromEntity(story);
    }

    @Transactional
    public void deleteStory(UUID storyId, UUID adminId) {
        BrandStory story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Brand story not found"));
        storyRepository.delete(story);

        auditService.logAction("ADMIN", adminId, "STORY_DELETE", "BRAND_STORY", storyId, "SUCCESS", "127.0.0.1", null);
    }
}
