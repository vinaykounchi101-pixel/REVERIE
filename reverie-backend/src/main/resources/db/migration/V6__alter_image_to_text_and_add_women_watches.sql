-- =========================================================================
-- REVERIE Schema Migration V6: High-Capacity Imagery & Women's Haute Horlogerie
-- =========================================================================

-- 1. Expand image columns to TEXT for Base64 and high-res CDN assets
ALTER TABLE products ALTER COLUMN primary_image_url TYPE TEXT;
ALTER TABLE products ALTER COLUMN model_3d_url TYPE TEXT;
ALTER TABLE product_media ALTER COLUMN url TYPE TEXT;
ALTER TABLE collections ALTER COLUMN hero_image_url TYPE TEXT;

-- 2. Seed Dedicated Women's Haute Horlogerie Timepieces
INSERT INTO products (
    id, category_id, collection_id, name, slug, reference_number,
    short_description, description, base_price_paise, sale_price_paise,
    gender, status, primary_image_url, rating, reviews_count, created_at, updated_at
) VALUES
    -- Women 1: Aura Petit Diamond Pavé
    ('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001',
     'Aura Petit Diamond Pavé', 'aura-petit-diamond-pave', 'REV-W01-DIA',
     '18K Rose Gold with 48 brilliant-cut VVS diamonds and Tahitian mother-of-pearl dial.',
     'A poetic testament to micro-gemsetting artistry. The Aura Petit features a bespoke 33mm 18k Rose Gold case illuminated by 48 hand-selected pavé diamonds framing a natural iridescent mother-of-pearl dial.',
     450000000, 450000000, 'Women', 'PUBLISHED', '/images/watches/classic-royale.webp', 5.0, 18, NOW(), NOW()),

    -- Women 2: Luna Pearl Minimalist
    ('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000001',
     'Luna Pearl Minimalist Dress Watch', 'luna-pearl-minimalist', 'REV-W02-LUN',
     'Ultra-thin 34mm Platinum 950 case with minimalist opaline silver dial.',
     'Designed with pure sartorial restraint, the Luna Pearl embraces classical slender proportions with an ultra-thin automatic calibre and hand-stitched blush alligator strap.',
     320000000, 320000000, 'Women', 'PUBLISHED', '/images/watches/skeleton-tourbillon.webp', 4.9, 14, NOW(), NOW()),

    -- Women 3: Sovereign Rose Classic
    ('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001',
     'Sovereign Rose Classic Complication', 'sovereign-rose-classic', 'REV-W03-ROSE',
     '36mm Honeygold case with hand-guilloché dial and moon-phase aperture.',
     'Masterfully executed complication presenting poetic moon-phase tracking against a nocturnal star-studded disc, encased in exclusive 18K Honeygold.',
     580000000, 580000000, 'Women', 'PUBLISHED', '/images/watches/celestial-astronomia.webp', 5.0, 22, NOW(), NOW()),

    -- Women 4: Elysium Sapphire Automatic
    ('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000002',
     'Elysium Sapphire Openworked Automatic', 'elysium-sapphire-automatic', 'REV-W04-ELY',
     '35mm Grade 5 Titanium case with celestial skeleton bridges and sapphire crystal.',
     'Openworked haute horlogerie showcasing hand-bevelled anglage and twin barrels providing a 60-hour power reserve.',
     490000000, 490000000, 'Women', 'PUBLISHED', '/images/watches/nautilus-diver.webp', 4.95, 9, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- 3. Seed Attributes for Women's Timepieces
INSERT INTO product_attributes (id, product_id, case_diameter, thickness, case_material, movement, power_reserve, complications, dial_color, origin, warranty_months)
VALUES
    (gen_random_uuid(), 'd1000000-0000-0000-0000-000000000001', '33 mm', '8.2 mm', '18K Rose Gold with 48 VVS Diamonds', 'Calibre REV-402 Ultra-Thin Automatic', '42 Hours', 'Diamond Set Bezel, Small Seconds', 'Tahitian Mother-of-Pearl', 'Switzerland', 24),
    (gen_random_uuid(), 'd1000000-0000-0000-0000-000000000002', '34 mm', '7.4 mm', 'Platinum 950', 'Calibre REV-305 Sartorial Automatic', '48 Hours', 'Central Hours & Minutes', 'Opaline Silver', 'Switzerland', 24),
    (gen_random_uuid(), 'd1000000-0000-0000-0000-000000000003', '36 mm', '9.1 mm', '18K Honeygold', 'Calibre REV-610 Moon-Phase Automatic', '50 Hours', 'Astronomical Moon Phase, Date Aperture', 'Guilloché Champagne', 'Switzerland', 24),
    (gen_random_uuid(), 'd1000000-0000-0000-0000-000000000004', '35 mm', '8.8 mm', 'Grade 5 Titanium & Sapphire', 'Calibre REV-708 Openworked Automatic', '60 Hours', 'Skeleton Architecture, Twin Barrels', 'Celestial Openwork', 'Switzerland', 24)
ON CONFLICT (product_id) DO NOTHING;

-- 4. Seed Variants for Women's Timepieces
INSERT INTO product_variants (id, product_id, sku, name, dial_color, strap_type, price_paise, sale_price_paise, status, created_at)
VALUES
    ('a1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 'REV-W01-01', 'Aura Petit - Rose Gold Diamond', 'Tahitian MOP', 'Alligator Leather', 450000000, 450000000, 'ACTIVE', NOW()),
    ('a1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000002', 'REV-W02-01', 'Luna Pearl - Platinum Minimal', 'Opaline Silver', 'Silk Satin Strap', 320000000, 320000000, 'ACTIVE', NOW()),
    ('a1000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000003', 'REV-W03-01', 'Sovereign Rose - Moonphase', 'Guilloché Champagne', '18K Gold Mesh', 580000000, 580000000, 'ACTIVE', NOW()),
    ('a1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000004', 'REV-W04-01', 'Elysium - Sapphire Titanium', 'Celestial Openwork', 'Rubber Sport Strap', 490000000, 490000000, 'ACTIVE', NOW())
ON CONFLICT (sku) DO NOTHING;

-- 5. Seed Inventories for Women's Timepieces
INSERT INTO inventories (id, variant_id, available, reserved, sold, returned, low_stock_threshold, version)
VALUES
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000001', 8, 0, 0, 0, 2, 0),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000002', 12, 0, 0, 0, 2, 0),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000003', 6, 0, 0, 0, 2, 0),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000004', 10, 0, 0, 0, 2, 0)
ON CONFLICT (variant_id) DO NOTHING;
