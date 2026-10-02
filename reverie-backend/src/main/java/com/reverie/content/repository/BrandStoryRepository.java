package com.reverie.content.repository;

import com.reverie.content.entity.BrandStory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BrandStoryRepository extends JpaRepository<BrandStory, UUID> {

    Optional<BrandStory> findBySlugAndIsPublishedTrue(String slug);

    Optional<BrandStory> findBySlug(String slug);

    Page<BrandStory> findByIsPublishedTrueOrderByCreatedAtDesc(Pageable pageable);
}
