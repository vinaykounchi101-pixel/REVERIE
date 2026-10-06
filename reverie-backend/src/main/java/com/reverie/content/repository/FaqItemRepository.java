package com.reverie.content.repository;

import com.reverie.content.entity.FaqItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FaqItemRepository extends JpaRepository<FaqItem, UUID> {

    List<FaqItem> findByIsPublishedTrueOrderByDisplayOrderAsc();

    List<FaqItem> findByCategoryAndIsPublishedTrueOrderByDisplayOrderAsc(String category);

    List<FaqItem> findAllByOrderByDisplayOrderAsc();
}
