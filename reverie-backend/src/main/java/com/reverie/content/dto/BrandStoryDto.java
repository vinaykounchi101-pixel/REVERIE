package com.reverie.content.dto;

import com.reverie.content.entity.BrandStory;

import java.time.Instant;
import java.util.UUID;

public class BrandStoryDto {

    private UUID id;
    private String slug;
    private String title;
    private String subtitle;
    private String content;
    private String coverImageUrl;
    private String authorName;
    private Boolean isPublished;
    private Instant createdAt;

    public BrandStoryDto() {}

    public static BrandStoryDto fromEntity(BrandStory story) {
        BrandStoryDto dto = new BrandStoryDto();
        dto.setId(story.getId());
        dto.setSlug(story.getSlug());
        dto.setTitle(story.getTitle());
        dto.setSubtitle(story.getSubtitle());
        dto.setContent(story.getContent());
        dto.setCoverImageUrl(story.getCoverImageUrl());
        dto.setAuthorName(story.getAuthorName());
        dto.setIsPublished(story.getIsPublished());
        dto.setCreatedAt(story.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean published) { isPublished = published; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
