package com.reverie.catalog.repository;

import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {

    @Query("SELECT p FROM Product p " +
           "LEFT JOIN FETCH p.category " +
           "LEFT JOIN FETCH p.collection " +
           "LEFT JOIN FETCH p.attributes " +
           "WHERE p.slug = :slug")
    Optional<Product> findBySlugWithDetails(@Param("slug") String slug);

    Optional<Product> findBySlug(String slug);

    Page<Product> findByStatus(ProductStatus status, Pageable pageable);

    @Query("SELECT p FROM Product p " +
           "WHERE p.status = 'PUBLISHED' " +
           "AND (:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "     OR LOWER(p.shortDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "     OR LOWER(p.referenceNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:categorySlug IS NULL OR p.category.slug = :categorySlug) " +
           "AND (:collectionSlug IS NULL OR p.collection.slug = :collectionSlug) " +
           "AND (:gender IS NULL OR LOWER(p.gender) = LOWER(:gender)) " +
           "AND (:minPricePaise IS NULL OR p.basePricePaise >= :minPricePaise) " +
           "AND (:maxPricePaise IS NULL OR p.basePricePaise <= :maxPricePaise)")
    Page<Product> searchProducts(
            @Param("keyword") String keyword,
            @Param("categorySlug") String categorySlug,
            @Param("collectionSlug") String collectionSlug,
            @Param("gender") String gender,
            @Param("minPricePaise") Long minPricePaise,
            @Param("maxPricePaise") Long maxPricePaise,
            Pageable pageable
    );
}
