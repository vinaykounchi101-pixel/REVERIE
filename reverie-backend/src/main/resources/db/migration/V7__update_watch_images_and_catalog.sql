-- =========================================================================
-- REVERIE Schema Migration V7: Synchronize High-Res Watch Imagery & Complete Catalog
-- =========================================================================

-- 1. Update Women's Haute Horlogerie Image Assets
UPDATE products 
SET primary_image_url = '/assets/watch-celeste-diamond-front.jpg',
    model_3d_url = '/assets/watch-celeste-diamond-side.jpg'
WHERE slug = 'aura-petit-diamond-pave';

UPDATE products 
SET primary_image_url = '/assets/watch-etoile-front.jpg',
    model_3d_url = '/assets/watch-etoile-wrist.jpg'
WHERE slug = 'luna-pearl-minimalist';

UPDATE products 
SET primary_image_url = '/assets/watch-heritage-gold-front.jpg',
    model_3d_url = '/assets/collection-heritage.jpg'
WHERE slug = 'sovereign-rose-classic';

UPDATE products 
SET primary_image_url = '/assets/watch-skeleton-women-front.jpg',
    model_3d_url = '/assets/craft-movement.jpg'
WHERE slug = 'elysium-sapphire-automatic';

-- 2. Update Men's & Flagship Product Images
UPDATE products 
SET primary_image_url = '/assets/watch-classic-blue-front.jpg',
    model_3d_url = '/assets/watch-classic-blue-side.jpg'
WHERE slug = 'velara-classic-royale-blue' OR reference_number = 'V-001';

UPDATE products 
SET primary_image_url = '/assets/watch-heritage-gold-front.jpg',
    model_3d_url = '/assets/watch-heritage-gold-front.jpg'
WHERE slug = 'velara-classic-18k-rose-gold' OR reference_number = 'V-002';

UPDATE products 
SET primary_image_url = '/assets/watch-chrono-front.jpg',
    model_3d_url = '/assets/watch-diver-side.jpg'
WHERE slug = 'heritage-column-wheel-chrono' OR reference_number = 'V-003';

UPDATE products 
SET primary_image_url = '/assets/watch-malachite-front.jpg',
    model_3d_url = '/assets/watch-malachite-front.jpg'
WHERE slug = 'sovereign-malachite-limited' OR reference_number = 'V-004';

-- 3. Seed Product Media Gallery for Multi-Angle Inspection
INSERT INTO product_media (id, product_id, url, alt_text, display_order)
SELECT 
    gen_random_uuid(),
    p.id,
    '/assets/craft-movement.jpg',
    'Swiss Calibre In-House Movement Exhibition',
    2
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM product_media pm WHERE pm.product_id = p.id AND pm.url = '/assets/craft-movement.jpg'
);

INSERT INTO product_media (id, product_id, url, alt_text, display_order)
SELECT 
    gen_random_uuid(),
    p.id,
    '/assets/craft-crown.jpg',
    'Precision Fluted Crown & Sapphire Crystal Chamfer',
    3
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM product_media pm WHERE pm.product_id = p.id AND pm.url = '/assets/craft-crown.jpg'
);
