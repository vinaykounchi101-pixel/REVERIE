package com.reverie.content.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.content.dto.*;
import com.reverie.content.service.ContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@Tag(name = "Content CMS & FAQs", description = "Endpoints for luxury horology knowledge base, FAQs and brand stories")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    // --- FAQs ---

    @GetMapping("/faqs")
    @Operation(summary = "Get published FAQs", description = "Retrieves all published FAQ items ordered by display sequence")
    public ResponseEntity<ApiResponse<List<FaqDto>>> getFaqs() {
        List<FaqDto> faqs = contentService.getAllPublishedFaqs();
        return ResponseEntity.ok(ApiResponse.success(faqs));
    }

    @GetMapping("/faqs/category/{category}")
    @Operation(summary = "Get FAQs by category", description = "Retrieves published FAQs filtered by specific category (e.g., AUTHENTICITY, SHIPPING)")
    public ResponseEntity<ApiResponse<List<FaqDto>>> getFaqsByCategory(@PathVariable String category) {
        List<FaqDto> faqs = contentService.getFaqsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(faqs));
    }

    @GetMapping("/faqs/admin")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CONTENT_MGR')")
    @Operation(summary = "Admin: Get all FAQ items", description = "Retrieves all FAQs including unpublished drafts")
    public ResponseEntity<ApiResponse<List<FaqDto>>> getFaqsAdmin() {
        List<FaqDto> faqs = contentService.getAllFaqsForAdmin();
        return ResponseEntity.ok(ApiResponse.success(faqs));
    }

    @PostMapping("/faqs/admin")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CONTENT_MGR')")
    @Operation(summary = "Admin: Create FAQ item", description = "Adds a new knowledge base item to FAQs")
    public ResponseEntity<ApiResponse<FaqDto>> createFaq(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateFaqRequest request) {
        FaqDto faq = contentService.createFaq(request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("FAQ created", faq));
    }

    @DeleteMapping("/faqs/admin/{faqId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CONTENT_MGR')")
    @Operation(summary = "Admin: Delete FAQ item", description = "Deletes an existing FAQ item")
    public ResponseEntity<ApiResponse<Void>> deleteFaq(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID faqId) {
        contentService.deleteFaq(faqId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("FAQ deleted", null));
    }

    // --- Brand Stories ---

    @GetMapping("/stories")
    @Operation(summary = "Get published brand stories", description = "Retrieves paginated list of horology heritage and brand articles")
    public ResponseEntity<ApiResponse<Page<BrandStoryDto>>> getStories(@PageableDefault(size = 10) Pageable pageable) {
        Page<BrandStoryDto> stories = contentService.getPublishedStories(pageable);
        return ResponseEntity.ok(ApiResponse.success(stories));
    }

    @GetMapping("/stories/admin")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CONTENT_MGR')")
    @Operation(summary = "Admin: Get all brand stories", description = "Retrieves all editorial stories including drafts")
    public ResponseEntity<ApiResponse<Page<BrandStoryDto>>> getStoriesAdmin(@PageableDefault(size = 20) Pageable pageable) {
        Page<BrandStoryDto> stories = contentService.getAllStoriesForAdmin(pageable);
        return ResponseEntity.ok(ApiResponse.success(stories));
    }

    @GetMapping("/stories/{slug}")
    @Operation(summary = "Get brand story by slug", description = "Retrieves full editorial article by URL slug")
    public ResponseEntity<ApiResponse<BrandStoryDto>> getStoryBySlug(@PathVariable String slug) {
        BrandStoryDto story = contentService.getStoryBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(story));
    }

    @PostMapping("/stories/admin")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CONTENT_MGR')")
    @Operation(summary = "Admin: Publish/Update brand story", description = "Publishes or edits a heritage story article")
    public ResponseEntity<ApiResponse<BrandStoryDto>> saveStory(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateBrandStoryRequest request) {
        BrandStoryDto story = contentService.createOrUpdateStory(request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Brand story saved", story));
    }

    @DeleteMapping("/stories/admin/{storyId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CONTENT_MGR')")
    @Operation(summary = "Admin: Delete brand story", description = "Removes a brand story article")
    public ResponseEntity<ApiResponse<Void>> deleteStory(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID storyId) {
        contentService.deleteStory(storyId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Brand story deleted", null));
    }
}
