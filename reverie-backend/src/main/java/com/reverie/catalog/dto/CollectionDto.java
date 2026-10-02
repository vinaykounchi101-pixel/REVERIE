package com.reverie.catalog.dto;

import com.reverie.catalog.entity.Collection;
import java.util.UUID;

public class CollectionDto {

    private UUID id;
    private String name;
    private String slug;
    private String tagline;
    private String description;
    private String referenceCode;
    private String heroImageUrl;

    public CollectionDto() {}

    public static CollectionDto fromEntity(Collection collection) {
        if (collection == null) return null;
        CollectionDto dto = new CollectionDto();
        dto.setId(collection.getId());
        dto.setName(collection.getName());
        dto.setSlug(collection.getSlug());
        dto.setTagline(collection.getTagline());
        dto.setDescription(collection.getDescription());
        dto.setReferenceCode(collection.getReferenceCode());
        dto.setHeroImageUrl(collection.getHeroImageUrl());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getReferenceCode() { return referenceCode; }
    public void setReferenceCode(String referenceCode) { this.referenceCode = referenceCode; }

    public String getHeroImageUrl() { return heroImageUrl; }
    public void setHeroImageUrl(String heroImageUrl) { this.heroImageUrl = heroImageUrl; }
}
