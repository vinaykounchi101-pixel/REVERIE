package com.reverie.content.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateBrandStoryRequest {

    @NotBlank(message = "Slug is required")
    private String slug;

    @NotBlank(message = "Title is required")
    private String title;

    private String subtitle;

    @NotBlank(message = "Content is required")
    private String content;

    private String coverImageUrl;
    private String authorName = "REVERIE Editorial";
    private Boolean isPublished = true;

    public CreateBrandStoryRequest() {}

    public CreateBrandStoryRequest(String slug, String title, String subtitle, String content, String coverImageUrl, String authorName, Boolean isPublished) {
        this.slug = slug;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.coverImageUrl = coverImageUrl;
        this.authorName = authorName != null ? authorName : "REVERIE Editorial";
        this.isPublished = isPublished != null ? isPublished : true;
    }

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
}
