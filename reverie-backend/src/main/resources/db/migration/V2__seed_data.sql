-- =============================================================================
-- REVERIE Seed Data Migration V2: Deterministic Development & Local Baseline
-- All monetary amounts stored as integer INR paise (e.g. ₹1,25,000 = 12500000 paise)
-- =============================================================================

-- 1. Seed Categories
INSERT INTO categories (id, name, slug, description, display_order)
VALUES 
    ('c0000000-0000-0000-0000-000000000001', 'Classic', 'classic', 'Timeless horological silhouettes with pure proportions.', 1),
    ('c0000000-0000-0000-0000-000000000002', 'Sport', 'sport', 'High-performance engineering built for underwater & track resilience.', 2),
    ('c0000000-0000-0000-0000-000000000003', 'Heritage', 'heritage', 'Vintage-inspired calibres celebrating centuries of Swiss hand-finishing.', 3)
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Collections
INSERT INTO collections (id, name, slug, tagline, description, reference_code, hero_image_url)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'The Orion', 'orion', 'Timeless by Design', 'The hallmark mechanical flagship with astronomical precision.', 'R01 – R05', '/assets/collection-classic.jpg'),
    ('a0000000-0000-0000-0000-000000000002', 'Velara Royale', 'velara-royale', 'Imperial Haute Horlogerie', 'Sculpted cases in 316L surgical steel with hand-beveled dial indices.', 'R11 – R15', '/assets/collection-sport.jpg'),
    ('a0000000-0000-0000-0000-000000000003', 'Heritage Chrono', 'heritage-chrono', 'A Legacy of Speed and Grace', 'Dual-register column-wheel chronographs inspired by 1960s motorsport.', 'R46 – R50', '/assets/collection-heritage.jpg')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Products
INSERT INTO products (
    id, name, slug, reference_number, category_id, collection_id, gender,
    short_description, description, base_price_paise, sale_price_paise, status,
    is_preorder, edition_size, max_per_customer, model_3d_url, primary_image_url, rating, reviews_count
) VALUES 
    (
        '10000000-0000-0000-0000-000000000001',
        'Velara Classic Royale Blue',
        'velara-classic-royale-blue',
        'V-001',
        'c0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000002',
        'Men',
        'Steel case with royal navy sunburst dial, faceted indices and blue alligator leather strap.',
        'The Velara Classic Royale Blue is an architectural tour-de-force featuring the ultra-thin Calibre V-101. Hand-finished Geneva stripes and chamfered bridges visible through the sapphire exhibition caseback.',
        12500000, -- ₹1,25,000
        NULL,
        'PUBLISHED',
        FALSE,
        500,
        1,
        '/assets/models/watch.glb',
        '/assets/watch-classic-blue-front.jpg',
        4.95,
        86
    ),
    (
        '10000000-0000-0000-0000-000000000002',
        'Velara Classic 18k Rose Gold',
        'velara-classic-18k-rose-gold',
        'V-002',
        'c0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000003',
        'Men',
        'Polished 18k rose gold case with champagne dial, Roman numerals, and dark alligator strap.',
        'Warm 18k rose gold plating encased around an in-house automatic caliber. Imbued with classical Roman typography and an anti-reflective double-domed sapphire crystal.',
        14500000, -- ₹1,45,000
        NULL,
        'PUBLISHED',
        FALSE,
        250,
        1,
        '/assets/models/watch.glb',
        '/assets/watch-heritage-gold-front.jpg',
        4.90,
        62
    ),
    (
        '10000000-0000-0000-0000-000000000003',
        'The Orion Automatic',
        'the-orion-automatic',
        'R-001',
        'c0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000001',
        'Unisex',
        'The signature REVERIE mechanical timepiece with deep midnight dial and exhibition back.',
        'A perfect synthesis of modern restraint and mechanical soul. Engineered in Genève with a 48-hour power reserve automatic escapement.',
        12990000, -- ₹1,29,900
        NULL,
        'PUBLISHED',
        FALSE,
        NULL,
        2,
        '/assets/models/watch.glb',
        '/assets/hero-watch.jpg',
        4.88,
        114
    )
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Product Attributes
INSERT INTO product_attributes (
    id, product_id, case_diameter, thickness, case_material, movement,
    power_reserve, crystal, water_resistance, strap_width, complications, dial_color, origin, warranty_months
) VALUES 
    (
        'b0000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000001',
        '40mm', '9.8mm', '316L Stainless Steel', 'Calibre V-101 Ultra-Thin Automatic',
        '48 Hours', 'Double-domed Sapphire with Multi-AR', '50m (5 ATM)', '20mm', 'Date aperture at 6 o''clock', 'Royal Navy Sunburst', 'Switzerland', 24
    ),
    (
        'b0000000-0000-0000-0000-000000000002',
        '10000000-0000-0000-0000-000000000002',
        '39mm', '9.5mm', '18k 5N Rose Gold Plated Steel', 'Calibre V-102 Automatic',
        '48 Hours', 'Domed Sapphire Crystal', '50m (5 ATM)', '20mm', 'Small Seconds Subdial', 'Champagne Sunburst', 'Switzerland', 24
    ),
    (
        'b0000000-0000-0000-0000-000000000003',
        '10000000-0000-0000-0000-000000000003',
        '41mm', '10.2mm', '316L Marine Grade Steel', 'Calibre R-200 Swiss Automatic',
        '48 Hours', 'Sapphire with Anti-Reflective Coating', '100m (10 ATM)', '20mm', 'Center sweep seconds', 'Midnight Navy', 'Switzerland', 36
    )
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Variants
INSERT INTO product_variants (id, product_id, sku, name, dial_color, strap_type, price_paise, sale_price_paise, status)
VALUES 
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'REV-V001-STEEL', 'Velara Royale Blue / Steel Bracelet', 'Royal Navy', 'Steel Bracelet', 12500000, NULL, 'ACTIVE'),
    ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'REV-V001-LTHR', 'Velara Royale Blue / Alligator Leather', 'Royal Navy', 'Alligator Leather', 12500000, NULL, 'ACTIVE'),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'REV-V002-LTHR', 'Velara 18k Rose Gold / Dark Leather', 'Champagne', 'Dark Leather', 14500000, NULL, 'ACTIVE'),
    ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000003', 'REV-R001-NAVY', 'The Orion / Midnight Navy Bracelet', 'Midnight Navy', 'Steel Bracelet', 12990000, NULL, 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Variant Inventory
INSERT INTO inventories (id, variant_id, available, reserved, sold, returned, low_stock_threshold, version)
VALUES 
    ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 15, 0, 0, 0, 3, 0),
    ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 8, 0, 0, 0, 3, 0),
    ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 5, 0, 0, 0, 2, 0),
    ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004', 20, 0, 0, 0, 5, 0)
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Initial Test Users
-- Password for all test users: 'Password@123' (BCrypt: $2a$10$7Q7xQeGvhj9.dF5qA4v2t.Gf889Q/N0q0jL8g.jPzC8x8e5Vj8vYm)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active, is_verified)
VALUES 
    (
        '40000000-0000-0000-0000-000000000001',
        'admin@reverie.app',
        '$2a$10$7Q7xQeGvhj9.dF5qA4v2t.Gf889Q/N0q0jL8g.jPzC8x8e5Vj8vYm',
        'Master',
        'Administrator',
        'SUPER_ADMIN',
        TRUE,
        TRUE
    ),
    (
        '40000000-0000-0000-0000-000000000002',
        'client@reverie.app',
        '$2a$10$7Q7xQeGvhj9.dF5qA4v2t.Gf889Q/N0q0jL8g.jPzC8x8e5Vj8vYm',
        'Alexander',
        'Vane',
        'CUSTOMER',
        TRUE,
        TRUE
    )
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Promotions / Coupons
INSERT INTO coupons (id, code, discount_type, discount_value, min_order_paise, max_discount_paise, usage_limit, usage_count, is_active, starts_at, expires_at)
VALUES 
    ('d0000000-0000-0000-0000-000000000001', 'HOROLOGY10', 'PERCENT', 10.00, 5000000, 2000000, 1000, 0, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '365 days'),
    ('d0000000-0000-0000-0000-000000000002', 'VELARA5000', 'FLAT', 500000.00, 10000000, 500000, 500, 0, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '180 days')
ON CONFLICT (id) DO NOTHING;
