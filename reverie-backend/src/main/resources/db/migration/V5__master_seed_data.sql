-- =========================================================================
-- REVERIE Schema Migration V5: Haute Horlogerie Master Seed Data
-- =========================================================================

-- 1. Master Categories
INSERT INTO categories (id, name, slug, description, display_order)
VALUES
    ('c1000000-0000-0000-0000-000000000001', 'Grand Complications', 'grand-complications', 'The pinnacle of mechanical horology featuring minute repeaters, perpetual calendars, and celestial indications.', 1),
    ('c1000000-0000-0000-0000-000000000002', 'Tourbillons & Regulators', 'tourbillons-regulators', 'Gravitational compensation mechanisms crafted with exquisite artisanal hand-finishing.', 2),
    ('c1000000-0000-0000-0000-000000000003', 'Perpetual Calendars', 'perpetual-calendars', 'Mechanical brains tracking the Gregorian calendar through leap years with unerring precision.', 3),
    ('c1000000-0000-0000-0000-000000000004', 'Skeleton & Metiers d''Art', 'skeleton-metiers-dart', 'Openworked architecture showcasing hand-bevelled anglage, guilloché, and grand feu enamelling.', 4),
    ('c1000000-0000-0000-0000-000000000005', 'High-Frequency Chronographs', 'high-frequency-chronographs', 'Precision column-wheel split-seconds and flyback chronographs for discerning connoisseurs.', 5),
    ('c1000000-0000-0000-0000-000000000006', 'Ultra-Thin Haute Dress', 'ultra-thin-haute-dress', 'Sartorial micro-mechanical marvels in precious metals engineered with slender profiles.', 6)
ON CONFLICT (slug) DO NOTHING;

-- 2. Master Collections
INSERT INTO collections (id, name, slug, tagline, description, reference_code, hero_image_url)
VALUES
    ('b1000000-0000-0000-0000-000000000001', 'The Holy Trinity of Haute Horlogerie', 'the-holy-trinity', 'Geneva & Le Brassus High Horology', 'Masterpieces from Patek Philippe, Audemars Piguet, and Vacheron Constantin.', 'COL-HT-01', 'https://cdn.reverie.luxury/collections/holy-trinity-banner.webp'),
    ('b1000000-0000-0000-0000-000000000002', 'Independent Master Watchmakers', 'independent-masters', 'Uncompromising Independent Craftsmanship', 'Artisanal creations from F.P. Journe, MB&F, and H. Moser & Cie.', 'COL-IND-02', 'https://cdn.reverie.luxury/collections/independent-masters-banner.webp'),
    ('b1000000-0000-0000-0000-000000000003', 'Saxon Precision & Glashütte Artistry', 'saxon-precision', 'German Horological Supremacy', 'German fine watchmaking defined by three-quarter plates and untreated German silver from A. Lange & Söhne.', 'COL-SAX-03', 'https://cdn.reverie.luxury/collections/saxon-precision-banner.webp'),
    ('b1000000-0000-0000-0000-000000000004', 'Avant-Garde Architectural Complications', 'avant-garde-architecture', 'Kinetic Sculptures in Time', 'Futuristic mechanical sculptures redefining three-dimensional time display.', 'COL-AVG-04', 'https://cdn.reverie.luxury/collections/avant-garde-banner.webp')
ON CONFLICT (slug) DO NOTHING;

-- 3. Master Products
INSERT INTO products (id, category_id, collection_id, name, slug, reference_number, short_description, description, base_price_paise, sale_price_paise, gender, status, primary_image_url, rating, reviews_count, created_at, updated_at)
VALUES
    -- Product 1: Patek Philippe Celestial Grand Complication
    ('a1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001',
     'Patek Philippe Celestial Grand Complication', 'patek-philippe-celestial-grand-complication', '6102P-001',
     'Nocturnal sky over Geneva in Platinum 950.',
     'The Celestial 6102P displays the nocturnal sky over Geneva with a rotating sapphire crystal disk charting the stars, meridian passage of Sirius, and moon phases with astronomical precision.',
     3850000000, 3850000000, 'Unisex', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/patek-6102p-front.webp', 5.0, 12, NOW(), NOW()),

    -- Product 2: A. Lange & Söhne Datograph Perpetual Tourbillon
    ('a1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003',
     'A. Lange & Söhne Datograph Perpetual Tourbillon', 'lange-sohne-datograph-perpetual-tourbillon', '740.056FE',
     'Flyback chronograph, perpetual calendar & tourbillon in 18K Honeygold.',
     'Combining a flyback chronograph, jumping minute counter, perpetual calendar, moon-phase display, and a one-minute tourbillon in patented 18-carat Honeygold.',
     2950000000, 2950000000, 'Men', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/lange-datograph-honeygold-front.webp', 5.0, 8, NOW(), NOW()),

    -- Product 3: Vacheron Constantin Les Cabinotiers Armillary Tourbillon
    ('a1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001',
     'Vacheron Constantin Les Cabinotiers Armillary Tourbillon', 'vacheron-constantin-cabinotiers-armillary-tourbillon', '9810C-000G',
     'Bi-axial spherical armillary tourbillon with double retrograde indications.',
     'A bi-axial spherical armillary tourbillon featuring instantaneous double retrograde hours and minutes with the prestigious Hallmark of Geneva.',
     4200000000, 4200000000, 'Unisex', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/vc-cabinotiers-armillary-front.webp', 5.0, 6, NOW(), NOW()),

    -- Product 4: F.P. Journe Chronomètre Souverain Nacre
    ('a1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000002',
     'F.P. Journe Chronomètre Souverain Invenit et Fecit', 'fp-journe-chronometre-souverain', 'CS-PT-MOP',
     'Solid 18K rose gold calibre with twin chronometer-grade barrels in Platinum 950.',
     'Crafted entirely in 18k solid rose gold movement plates with twin chronometer-grade barrels delivering stable isochronous torque, housed in Platinum 950.',
     1650000000, 1650000000, 'Unisex', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/fp-journe-cs-front.webp', 5.0, 15, NOW(), NOW()),

    -- Product 5: Audemars Piguet Royal Oak Concept Flying Tourbillon GMT
    ('a1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001',
     'Audemars Piguet Royal Oak Concept Flying Tourbillon GMT', 'ap-royal-oak-concept-flying-tourbillon-gmt', '26589IO.OO.D002CA.01',
     'Sandblasted titanium and green ceramic architecture with flying tourbillon.',
     'Sandblasted titanium and green ceramic architecture incorporating flying tourbillon, second timezone GMT, and crown position indicator with 237-hour power reserve.',
     2250000000, 2250000000, 'Men', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/ap-ro-concept-green-front.webp', 5.0, 9, NOW(), NOW()),

    -- Product 6: MB&F Legacy Machine Perpetual EVO
    ('a1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002',
     'MB&F Legacy Machine Perpetual EVO Zirconium', 'mbf-legacy-machine-perpetual-evo-zirconium', '07.ZL.BL',
     'Stephen McDonnell mechanical processor perpetual calendar in Zirconium.',
     'Stephen McDonnell revolutionary mechanical processor perpetual calendar with suspended balance wheel over dial, encased in ultra-rare Zirconium metal with FlexRing shock absorber.',
     1980000000, 1980000000, 'Unisex', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/mbf-lm-perpetual-evo-front.webp', 5.0, 7, NOW(), NOW()),

    -- Product 7: H. Moser & Cie Streamliner Flyback Chronograph Automatic
    ('a1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002',
     'H. Moser & Cie Streamliner Flyback Chronograph Funky Blue', 'moser-streamliner-flyback-chronograph-funky-blue', '6902-1201',
     'AgenGraphe central chronograph with integrated steel cushion bracelet.',
     'Featuring the revolutionary AgenGraphe central chronograph movement with coaxial minute and seconds hands over a fumé dial with integrated cushion-link bracelet.',
     620000000, 620000000, 'Men', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/moser-streamliner-blue-front.webp', 5.0, 19, NOW(), NOW()),

    -- Product 8: Cartier Privé Tank Chinoise Skeleton Platinum
    ('a1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001',
     'Cartier Privé Tank Chinoise Skeleton Limited Edition', 'cartier-prive-tank-chinoise-skeleton-platinum', 'WHTA0016',
     'Numbered limited edition in 950 platinum with lacquer portico dial.',
     'Numbered limited edition in 950 platinum with openworked red and black lacquer dial architecture inspired by traditional Chinese porticos.',
     780000000, 780000000, 'Unisex', 'PUBLISHED', 'https://cdn.reverie.luxury/watches/cartier-tank-chinoise-front.webp', 5.0, 11, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- 4. Master Product Attributes
INSERT INTO product_attributes (id, product_id, case_diameter, thickness, case_material, movement, power_reserve, complications, dial_color, origin, warranty_months)
VALUES
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000001', '44 mm', '10.58 mm', 'Platinum 950 (Top Wesselton Diamond set at 6 o''clock)', 'Calibre 240 LU CL C Automatic', '48 Hours', 'Sky Chart, Celestial Meridian, Sirius Transit, Moon Phase, Date by Hand', 'Deep Blue Sapphire', 'Switzerland', 24),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000002', '41.5 mm', '14.6 mm', '18K Honeygold (Lange Exclusive Alloy)', 'Calibre L952.2 Manually Wound', '50 Hours', 'Flyback Chronograph, Perpetual Calendar, One-Minute Tourbillon, Outsize Date', 'Solid Silver Argente', 'Germany', 24),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000003', '45 mm', '14.3 mm', '18K White Gold', 'Calibre 1990 Manual Wind Poinçon de Genève', '65 Hours', 'Bi-Axial Armillary Spherical Tourbillon, Double Retrograde Hours and Minutes', 'Anthracite Openworked', 'Switzerland', 24),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000004', '40 mm', '8.6 mm', 'Platinum 950', 'Calibre 1304 18K Rose Gold Movement', '56 Hours', 'Twin Barrel Chronometer, Sub-seconds, Power Reserve Indicator', 'Tahitian Mother-of-Pearl', 'Switzerland', 24),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000005', '44 mm', '16.1 mm', 'Sandblasted Titanium & Green Ceramic', 'Calibre 2954 Manual Wind', '237 Hours', 'Flying Tourbillon, GMT 24h, Crown Function Selector', 'Openworked Architecture', 'Switzerland', 24),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000006', '44 mm', '17.5 mm', 'Zirconium Metal', 'LM Perpetual Fully Integrated Engine by Stephen McDonnell', '72 Hours', 'Mechanical Processor Perpetual Calendar, Suspended Balance, Retrograde Date', 'Atomic Blue CVD', 'Switzerland', 24),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000007', '42.3 mm', '14.2 mm', 'Stainless Steel', 'Calibre HMC 902 AgenGraphe Automatic', '54 Hours', 'Coaxial Central Flyback Chronograph, Dynamic Water Resistance 120m', 'Funky Blue Fumé', 'Switzerland', 24),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000008', '39.5 mm x 29.2 mm', '7.7 mm', 'Platinum 950', 'Calibre 9627 MC Manual Wind Skeleton', '38 Hours', 'Skeleton Architectural Movement, Red & Black Lacquer Accents', 'Openworked Skeleton', 'Switzerland', 24)
ON CONFLICT (product_id) DO NOTHING;

-- 5. Master Product Variants
INSERT INTO product_variants (id, product_id, sku, name, dial_color, strap_type, price_paise, sale_price_paise, status, created_at)
VALUES
    ('b2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'PP-6102P-BLUE-PLT',
     'Celestial Platinum Blue Sapphire Dial', 'Deep Blue Celestial Sapphire', 'Hand-stitched Alligator Leather Navy', 3850000000, 3850000000, 'ACTIVE', NOW()),

    ('b2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'ALS-740-HONEYGOLD',
     'Datograph Perpetual Honeygold Limited 100', 'Solid Silver Argente', 'Hand-stitched Reddish-Brown Alligator', 2950000000, 2950000000, 'ACTIVE', NOW()),

    ('b2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 'VC-9810C-WG-SKELETON',
     'Les Cabinotiers Armillary White Gold', 'NAC Treated Anthracite Openworked', 'Dark Blue Mississippiensis Alligator', 4200000000, 4200000000, 'ACTIVE', NOW()),

    ('b2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004', 'FPJ-CS-PT-MOP',
     'Chronomètre Souverain Platinum Mother-of-Pearl', 'Tahitian Natural Mother-of-Pearl', 'Semi-matte Black Alligator', 1650000000, 1650000000, 'ACTIVE', NOW()),

    ('b2000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005', 'AP-26589IO-GREEN',
     'Royal Oak Concept Flying Tourbillon Green Ceramic', 'Openworked Architecture', 'Textured Green Rubber Strap', 2250000000, 2250000000, 'ACTIVE', NOW()),

    ('b2000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000006', 'MBF-07-ZR-BLUE',
     'LM Perpetual EVO Zirconium Blue Dial', 'Atomic Blue CVD Plate', 'Integrated White FKM Rubber', 1980000000, 1980000000, 'ACTIVE', NOW()),

    ('b2000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000007', 'HMC-6902-FUNKYBLUE',
     'Streamliner Flyback Chronograph Funky Blue', 'Funky Blue Fumé Sunburst', 'Integrated Steel Cushion Link Bracelet', 620000000, 620000000, 'ACTIVE', NOW()),

    ('b2000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000008', 'CRT-WHTA0016-PLAT',
     'Tank Chinoise Skeleton Platinum Limited 100', 'Openworked Red/Black Lacquered Portico', 'Semi-matte Grey Alligator', 780000000, 780000000, 'ACTIVE', NOW())
ON CONFLICT (sku) DO NOTHING;

-- 6. Master Product Media
INSERT INTO product_media (id, product_id, media_type, url, alt_text, display_order, is_primary)
VALUES
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000001', 'IMAGE', 'https://cdn.reverie.luxury/watches/patek-6102p-front.webp', 'Patek Philippe Celestial 6102P Dial View', 1, true),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000001', 'IMAGE', 'https://cdn.reverie.luxury/watches/patek-6102p-caseback.webp', 'Patek Philippe Celestial 6102P Sapphire Caseback', 2, false),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000002', 'IMAGE', 'https://cdn.reverie.luxury/watches/lange-datograph-honeygold-front.webp', 'A. Lange & Söhne Datograph Perpetual Dial', 1, true),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000002', 'IMAGE', 'https://cdn.reverie.luxury/watches/lange-datograph-honeygold-movement.webp', 'A. Lange & Söhne Calibre L952.2 Engraved Balance Cock', 2, false),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000003', 'IMAGE', 'https://cdn.reverie.luxury/watches/vc-cabinotiers-armillary-front.webp', 'Vacheron Constantin Cabinotiers Armillary Tourbillon Front', 1, true),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000004', 'IMAGE', 'https://cdn.reverie.luxury/watches/fp-journe-cs-front.webp', 'F.P. Journe Chronomètre Souverain Mother of Pearl Dial', 1, true),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000005', 'IMAGE', 'https://cdn.reverie.luxury/watches/ap-ro-concept-green-front.webp', 'Audemars Piguet Royal Oak Concept Flying Tourbillon Front', 1, true),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000006', 'IMAGE', 'https://cdn.reverie.luxury/watches/mbf-lm-perpetual-evo-front.webp', 'MB&F Legacy Machine Perpetual EVO Atomic Blue Dial', 1, true),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000007', 'IMAGE', 'https://cdn.reverie.luxury/watches/moser-streamliner-blue-front.webp', 'H. Moser & Cie Streamliner Flyback Chronograph Dial', 1, true),
    (gen_random_uuid(), 'a1000000-0000-0000-0000-000000000008', 'IMAGE', 'https://cdn.reverie.luxury/watches/cartier-tank-chinoise-front.webp', 'Cartier Privé Tank Chinoise Skeleton Dial', 1, true)
ON CONFLICT DO NOTHING;

-- 7. Master Inventories & Movement Logs
INSERT INTO inventories (id, variant_id, available, reserved, sold, returned, low_stock_threshold)
VALUES
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000001', 2, 0, 0, 0, 1),
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000002', 1, 0, 0, 0, 1),
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000003', 1, 0, 0, 0, 1),
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000004', 3, 0, 0, 0, 1),
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000005', 2, 0, 0, 0, 1),
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000006', 1, 0, 0, 0, 1),
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000007', 4, 0, 0, 0, 2),
    (gen_random_uuid(), 'b2000000-0000-0000-0000-000000000008', 2, 0, 0, 0, 1)
ON CONFLICT (variant_id) DO NOTHING;

-- 8. Master FAQ Items
INSERT INTO faq_items (id, category, question, answer, display_order, is_published)
VALUES
    (gen_random_uuid(), 'AUTHENTICITY', 'How does REVERIE verify the provenance and authenticity of each timepiece?',
     'Every horological masterpiece offered on REVERIE undergoes a rigorous multi-point authentication and physical inspection by our certified master horologists. All timepieces are verified against manufacturer archives and accompanied by official Certificates of Provenance, manufacture warranties, and original box and papers.', 1, true),

    (gen_random_uuid(), 'LOGISTICS', 'What security measures are implemented during high-value armored transport?',
     'All shipments above ₹2,00,000 INR are dispatched via specialized high-security armored logistics (Malca-Amit / Brinks / Blue Dart Valuable Cargo). Deliveries feature dual-signatory verification, GPS-tracked armored vault vehicles, and 100% comprehensive transit insurance up to full declared value.', 2, true),

    (gen_random_uuid(), 'PAYMENTS', 'What payment arrangements are available for ultra-high-net-worth purchases exceeding standard gateway limits?',
     'For transactions exceeding standard digital payment thresholds (up to ₹50,00,000+), REVERIE supports multi-tranche payments, direct institutional RTGS/NEFT bank escrow, and dedicated VIP Private Banking concierge settlement coordination.', 3, true),

    (gen_random_uuid(), 'CONCIERGE', 'Can I schedule a private viewing in a VIP suite or request in-person consultation?',
     'Yes. Our Private Client Concierge offers bespoke consultations in our private viewing suites in Mumbai, New Delhi, and Geneva, as well as private residential presentations by appointment with a Master Horologist.', 4, true),

    (gen_random_uuid(), 'RETURNS', 'What is the inspection and return policy for delivered timepieces?',
     'REVERIE offers a dedicated 7-day luxury return window. Upon request, timepieces are retrieved via armored courier and physically inspected at our Horology Lab to verify the security seal, pristine condition, and full documentation. Approved returns are refunded instantly to your REVERIE Wallet or original payment method.', 5, true)
ON CONFLICT DO NOTHING;

-- 9. Master Brand Heritage Stories
INSERT INTO brand_stories (id, slug, title, subtitle, content, cover_image_url, author_name, is_published)
VALUES
    (gen_random_uuid(), 'the-geneva-seal-and-patek-seal-sovereignty',
     'The Sovereignty of Horological Standards: Poinçon de Genève to the Patek Philippe Seal',
     'A historical exploration of the world''s most demanding standards of chronometric and decorative excellence.',
     'Since 1886, the Poinçon de Genève (Geneva Seal) has stood as the hallmark of supreme watchmaking craftsmanship, established by the Grand Council of the Republic and Canton of Geneva. To earn the seal, every component of a mechanical movement must be crafted, assembled, and regulated exclusively within the Canton of Geneva according to twelve strict criteria. In 2009, Patek Philippe raised the standard further with the proprietary Patek Philippe Seal, incorporating extreme chronometric rate tolerances of -3/+2 seconds per 24 hours for all mechanical movements across their entire service life.',
     'https://cdn.reverie.luxury/stories/geneva-seal.webp', 'Philippe Stern Horology Foundation', true),

    (gen_random_uuid(), 'the-chronometric-genius-of-fp-journe',
     'Invenit et Fecit: The Mechanical Soul of François-Paul Journe',
     'How one independent master watchmaker revitalized the resonance chronometer and high-horology calibres in solid rose gold.',
     'Born in Marseille and trained in the antique restoration ateliers of Paris, François-Paul Journe adopted the motto Invenit et Fecit (Invented and Made) to declare complete authorial sovereignty over his movements. Journe revolutionized haute horlogerie by constructing movement baseplates and bridges entirely in 18-carat solid rose gold (Calibre 1304, Calibre 1499), creating timepieces of unmatched visual warmth, permanence, and chronometric resonance.',
     'https://cdn.reverie.luxury/stories/fp-journe-story.webp', 'REVERIE Curatorial Board', true)
ON CONFLICT (slug) DO NOTHING;
