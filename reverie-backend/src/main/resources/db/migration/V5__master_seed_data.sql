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
INSERT INTO collections (id, name, slug, description, banner_image_url, is_featured)
VALUES
    ('b1000000-0000-0000-0000-000000000001', 'The Holy Trinity of Haute Horlogerie', 'the-holy-trinity', 'Masterpieces from Patek Philippe, Audemars Piguet, and Vacheron Constantin.', 'https://cdn.reverie.luxury/collections/holy-trinity-banner.webp', true),
    ('b1000000-0000-0000-0000-000000000002', 'Independent Master Watchmakers', 'independent-masters', 'Uncompromising artisanal creations from F.P. Journe, MB&F, and H. Moser & Cie.', 'https://cdn.reverie.luxury/collections/independent-masters-banner.webp', true),
    ('b1000000-0000-0000-0000-000000000003', 'Saxon Precision & Glashütte Artistry', 'saxon-precision', 'German fine watchmaking defined by three-quarter plates and untreated German silver from A. Lange & Söhne.', 'https://cdn.reverie.luxury/collections/saxon-precision-banner.webp', true),
    ('b1000000-0000-0000-0000-000000000004', 'Avant-Garde Architectural Complications', 'avant-garde-architecture', 'Futuristic mechanical sculptures redefining three-dimensional time display.', 'https://cdn.reverie.luxury/collections/avant-garde-banner.webp', false)
ON CONFLICT (slug) DO NOTHING;

-- 3. Master Products
INSERT INTO products (id, category_id, collection_id, name, slug, reference_number, description, base_price_paise, gender, status, is_featured, created_at, updated_at)
VALUES
    -- Product 1: Patek Philippe Celestial Grand Complication
    ('p1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001',
     'Patek Philippe Celestial Grand Complication', 'patek-philippe-celestial-grand-complication', '6102P-001',
     'The Celestial 6102P displays the nocturnal sky over Geneva with a rotating sapphire crystal disk charting the stars, meridian passage of Sirius, and moon phases with astronomical precision.',
     3850000000, 'Unisex', 'PUBLISHED', true, NOW(), NOW()),

    -- Product 2: A. Lange & Söhne Datograph Perpetual Tourbillon
    ('p1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003',
     'A. Lange & Söhne Datograph Perpetual Tourbillon', 'lange-sohne-datograph-perpetual-tourbillon', '740.056FE',
     'Combining a flyback chronograph, jumping minute counter, perpetual calendar, moon-phase display, and a one-minute tourbillon in patented 18-carat Honeygold.',
     2950000000, 'Men', 'PUBLISHED', true, NOW(), NOW()),

    -- Product 3: Vacheron Constantin Les Cabinotiers Armillary Tourbillon
    ('p1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001',
     'Vacheron Constantin Les Cabinotiers Armillary Tourbillon', 'vacheron-constantin-cabinotiers-armillary-tourbillon', '9810C-000G',
     'A bi-axial spherical armillary tourbillon featuring instantaneous double retrograde hours and minutes with the prestigious Hallmark of Geneva.',
     4200000000, 'Unisex', 'PUBLISHED', true, NOW(), NOW()),

    -- Product 4: F.P. Journe Chronomètre Souverain Nacre
    ('p1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000002',
     'F.P. Journe Chronomètre Souverain Invenit et Fecit', 'fp-journe-chronometre-souverain', 'CS-PT-MOP',
     'Crafted entirely in 18k solid rose gold movement plates with twin chronometer-grade barrels delivering stable isochronous torque, housed in Platinum 950.',
     1650000000, 'Unisex', 'PUBLISHED', true, NOW(), NOW()),

    -- Product 5: Audemars Piguet Royal Oak Concept Flying Tourbillon GMT
    ('p1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001',
     'Audemars Piguet Royal Oak Concept Flying Tourbillon GMT', 'ap-royal-oak-concept-flying-tourbillon-gmt', '26589IO.OO.D002CA.01',
     'Sandblasted titanium and green ceramic architecture incorporating flying tourbillon, second timezone GMT, and crown position indicator with 237-hour power reserve.',
     2250000000, 'Men', 'PUBLISHED', true, NOW(), NOW()),

    -- Product 6: MB&F Legacy Machine Perpetual EVO
    ('p1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002',
     'MB&F Legacy Machine Perpetual EVO Zirconium', 'mbf-legacy-machine-perpetual-evo-zirconium', '07.ZL.BL',
     'Stephen McDonnell revolutionary mechanical processor perpetual calendar with suspended balance wheel over dial, encased in ultra-rare Zirconium metal with FlexRing shock absorber.',
     1980000000, 'Unisex', 'PUBLISHED', true, NOW(), NOW()),

    -- Product 7: H. Moser & Cie Streamliner Flyback Chronograph Automatic
    ('p1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002',
     'H. Moser & Cie Streamliner Flyback Chronograph Funky Blue', 'moser-streamliner-flyback-chronograph-funky-blue', '6902-1201',
     'Featuring the revolutionary AgenGraphe central chronograph movement with coaxial minute and seconds hands over a fumé dial with integrated cushion-link bracelet.',
     620000000, 'Men', 'PUBLISHED', true, NOW(), NOW()),

    -- Product 8: Cartier Privé Tank Chinoise Skeleton Platinum
    ('p1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001',
     'Cartier Privé Tank Chinoise Skeleton Limited Edition', 'cartier-prive-tank-chinoise-skeleton-platinum', 'WHTA0016',
     'Numbered limited edition in 950 platinum with openworked red and black lacquer dial architecture inspired by traditional Chinese porticos.',
     780000000, 'Unisex', 'PUBLISHED', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- 4. Master Product Attributes
INSERT INTO product_attributes (id, product_id, attribute_name, attribute_value, display_order)
VALUES
    -- Attributes for Patek Celestial
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'Manufacture', 'Patek Philippe Geneve', 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'Calibre', '240 LU CL C Automatic', 2),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'Case Diameter', '44 mm', 3),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'Case Material', 'Platinum 950 (Top Wesselton Diamond set at 6 o''clock)', 4),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'Complications', 'Sky Chart, Celestial Meridian, Sirius Transit, Moon Phase, Date by Hand', 5),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'Power Reserve', '48 Hours', 6),

    -- Attributes for Lange Datograph
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'Manufacture', 'A. Lange & Söhne Glashütte I/SA', 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'Calibre', 'L952.2 Manually Wound', 2),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'Case Diameter', '41.5 mm', 3),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'Case Material', '18K Honeygold (Lange Exclusive Alloy)', 4),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'Complications', 'Flyback Chronograph, Perpetual Calendar, One-Minute Tourbillon with Stop-Seconds, Outsize Date', 5),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'Power Reserve', '50 Hours', 6),

    -- Attributes for Vacheron Armillary
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', 'Manufacture', 'Vacheron Constantin Geneve', 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', 'Calibre', '1990 Manual Wind Hallmarked Poinçon de Genève', 2),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', 'Case Diameter', '45 mm', 3),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', 'Case Material', '18K White Gold', 4),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', 'Complications', 'Bi-Axial Armillary Spherical Tourbillon, Instantaneous Double Retrograde Hours and Minutes', 5),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', 'Power Reserve', '65 Hours', 6),

    -- Attributes for FP Journe
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', 'Manufacture', 'F.P. Journe Invenit et Fecit', 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', 'Calibre', '1304 18k Rose Gold Movement', 2),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', 'Case Diameter', '40 mm', 3),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', 'Case Material', 'Platinum 950', 4),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', 'Complications', 'Twin Barrel Chronometer, Sub-seconds, Power Reserve Indicator', 5),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', 'Power Reserve', '56 Hours', 6)
ON CONFLICT DO NOTHING;

-- 5. Master Product Variants
INSERT INTO product_variants (id, product_id, sku, name, dial_color, strap_material, price_paise, compare_at_price_paise, created_at, updated_at)
VALUES
    -- Patek Celestial Variant
    ('v1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', 'PP-6102P-BLUE-PLT',
     'Celestial Platinum Blue Sapphire Dial', 'Deep Blue Celestial Sapphire', 'Hand-stitched Alligator Leather Navy', 3850000000, 4100000000, NOW(), NOW()),

    -- Lange Datograph Variant
    ('v1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000002', 'ALS-740-HONEYGOLD',
     'Datograph Perpetual Honeygold Limited 100', 'Solid Silver Argente', 'Hand-stitched Reddish-Brown Alligator', 2950000000, NULL, NOW(), NOW()),

    -- Vacheron Armillary Variant
    ('v1000000-0000-0000-0000-000000000003', 'p1000000-0000-0000-0000-000000000003', 'VC-9810C-WG-SKELETON',
     'Les Cabinotiers Armillary White Gold', 'NAC Treated Anthracite Openworked', 'Dark Blue Mississippiensis Alligator', 4200000000, NULL, NOW(), NOW()),

    -- FP Journe Variant
    ('v1000000-0000-0000-0000-000000000004', 'p1000000-0000-0000-0000-000000000004', 'FPJ-CS-PT-MOP',
     'Chronomètre Souverain Platinum Mother-of-Pearl', 'Tahitian Natural Mother-of-Pearl', 'Semi-matte Black Alligator', 1650000000, NULL, NOW(), NOW()),

    -- Audemars Piguet Concept Variant
    ('v1000000-0000-0000-0000-000000000005', 'p1000000-0000-0000-0000-000000000005', 'AP-26589IO-GREEN',
     'Royal Oak Concept Flying Tourbillon Green Ceramic', 'Openworked Architecture', 'Textured Green Rubber Strap', 2250000000, NULL, NOW(), NOW()),

    -- MB&F LM Perpetual Variant
    ('v1000000-0000-0000-0000-000000000006', 'p1000000-0000-0000-0000-000000000006', 'MBF-07-ZR-BLUE',
     'LM Perpetual EVO Zirconium Blue Dial', 'Atomic Blue CVD Plate', 'Integrated White FKM Rubber', 1980000000, NULL, NOW(), NOW()),

    -- H. Moser Streamliner Variant
    ('v1000000-0000-0000-0000-000000000007', 'p1000000-0000-0000-0000-000000000007', 'HMC-6902-FUNKYBLUE',
     'Streamliner Flyback Chronograph Funky Blue', 'Funky Blue Fumé Sunburst', 'Integrated Steel Cushion Link Bracelet', 620000000, NULL, NOW(), NOW()),

    -- Cartier Prive Tank Chinoise Variant
    ('v1000000-0000-0000-0000-000000000008', 'p1000000-0000-0000-0000-000000000008', 'CRT-WHTA0016-PLAT',
     'Tank Chinoise Skeleton Platinum Limited 100', 'Openworked Red/Black Lacquered Portico', 'Semi-matte Grey Alligator', 780000000, NULL, NOW(), NOW())
ON CONFLICT (sku) DO NOTHING;

-- 6. Master Product Media
INSERT INTO product_media (id, product_id, media_url, media_type, is_primary, display_order)
VALUES
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'https://cdn.reverie.luxury/watches/patek-6102p-front.webp', 'IMAGE', true, 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', 'https://cdn.reverie.luxury/watches/patek-6102p-caseback.webp', 'IMAGE', false, 2),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'https://cdn.reverie.luxury/watches/lange-datograph-honeygold-front.webp', 'IMAGE', true, 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', 'https://cdn.reverie.luxury/watches/lange-datograph-honeygold-movement.webp', 'IMAGE', false, 2),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', 'https://cdn.reverie.luxury/watches/vc-cabinotiers-armillary-front.webp', 'IMAGE', true, 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', 'https://cdn.reverie.luxury/watches/fp-journe-cs-front.webp', 'IMAGE', true, 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000005', 'https://cdn.reverie.luxury/watches/ap-ro-concept-green-front.webp', 'IMAGE', true, 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000006', 'https://cdn.reverie.luxury/watches/mbf-lm-perpetual-evo-front.webp', 'IMAGE', true, 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000007', 'https://cdn.reverie.luxury/watches/moser-streamliner-blue-front.webp', 'IMAGE', true, 1),
    (gen_random_uuid(), 'p1000000-0000-0000-0000-000000000008', 'https://cdn.reverie.luxury/watches/cartier-tank-chinoise-front.webp', 'IMAGE', true, 1)
ON CONFLICT DO NOTHING;

-- 7. Master Inventories & Movement Logs
INSERT INTO inventories (id, variant_id, available, reserved, sold, returned, low_stock_threshold)
VALUES
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000001', 2, 0, 0, 0, 1),
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000002', 1, 0, 0, 0, 1),
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000003', 1, 0, 0, 0, 1),
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000004', 3, 0, 0, 0, 1),
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000005', 2, 0, 0, 0, 1),
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000006', 1, 0, 0, 0, 1),
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000007', 4, 0, 0, 0, 2),
    (gen_random_uuid(), 'v1000000-0000-0000-0000-000000000008', 2, 0, 0, 0, 1)
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
