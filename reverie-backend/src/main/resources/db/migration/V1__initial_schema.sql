-- =============================================================================
-- REVERIE Schema Migration V1: Core Relational Architecture
-- Target: PostgreSQL 15+ / Standard SQL
-- =============================================================================

-- 1. Identity & Access Management
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS otp_tokens (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    identifier VARCHAR(255) NOT NULL,
    otp_hash VARCHAR(255) NOT NULL,
    token_type VARCHAR(50) NOT NULL,
    attempts INT NOT NULL DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    phone VARCHAR(30) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Catalog Taxonomy & Products
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    tagline VARCHAR(255),
    description TEXT,
    reference_code VARCHAR(50),
    hero_image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    reference_number VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
    gender VARCHAR(30) NOT NULL DEFAULT 'Unisex',
    short_description TEXT,
    description TEXT,
    base_price_paise BIGINT NOT NULL CHECK (base_price_paise >= 0),
    sale_price_paise BIGINT CHECK (sale_price_paise >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    is_preorder BOOLEAN NOT NULL DEFAULT FALSE,
    expected_ship_date TIMESTAMP WITH TIME ZONE,
    edition_size INT,
    max_per_customer INT NOT NULL DEFAULT 1,
    model_3d_url VARCHAR(500),
    primary_image_url VARCHAR(500),
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    reviews_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_attributes (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    case_diameter VARCHAR(50),
    thickness VARCHAR(50),
    case_material VARCHAR(100),
    movement VARCHAR(150),
    power_reserve VARCHAR(50),
    crystal VARCHAR(100),
    water_resistance VARCHAR(50),
    strap_width VARCHAR(50),
    complications VARCHAR(255),
    dial_color VARCHAR(100),
    origin VARCHAR(100) DEFAULT 'Switzerland',
    warranty_months INT NOT NULL DEFAULT 24
);

CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    dial_color VARCHAR(100),
    strap_type VARCHAR(100),
    price_paise BIGINT NOT NULL CHECK (price_paise >= 0),
    sale_price_paise BIGINT CHECK (sale_price_paise >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_media (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    media_type VARCHAR(50) NOT NULL DEFAULT 'IMAGE',
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3. Inventory & Movements
CREATE TABLE IF NOT EXISTS inventories (
    id UUID PRIMARY KEY,
    variant_id UUID NOT NULL UNIQUE REFERENCES product_variants(id) ON DELETE CASCADE,
    available INT NOT NULL DEFAULT 0 CHECK (available >= 0),
    reserved INT NOT NULL DEFAULT 0 CHECK (reserved >= 0),
    sold INT NOT NULL DEFAULT 0 CHECK (sold >= 0),
    returned INT NOT NULL DEFAULT 0 CHECK (returned >= 0),
    low_stock_threshold INT NOT NULL DEFAULT 5,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS inventory_movements (
    id UUID PRIMARY KEY,
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    delta INT NOT NULL,
    movement_type VARCHAR(50) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    actor_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Shopping, Cart & Wishlist
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY,
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    selected_strap VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wishlist_items (
    id UUID PRIMARY KEY,
    wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_wishlist_product UNIQUE (wishlist_id, product_id)
);

-- 5. Promotions & Coupons
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_type VARCHAR(30) NOT NULL DEFAULT 'PERCENT',
    discount_value NUMERIC(10, 2) NOT NULL,
    min_order_paise BIGINT NOT NULL DEFAULT 0,
    max_discount_paise BIGINT,
    usage_limit INT NOT NULL DEFAULT 100,
    usage_count INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Checkout & Commerce State
CREATE TABLE IF NOT EXISTS checkout_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    source VARCHAR(50) NOT NULL DEFAULT 'CART',
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    line_snapshot_json TEXT NOT NULL,
    address_snapshot_json TEXT,
    shipping_method VARCHAR(50),
    coupon_code VARCHAR(50),
    wallet_amount_paise BIGINT NOT NULL DEFAULT 0,
    totals_snapshot_json TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Orders & Payments
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY,
    order_number VARCHAR(60) NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_PAYMENT',
    address_snapshot_json TEXT NOT NULL,
    subtotal_paise BIGINT NOT NULL CHECK (subtotal_paise >= 0),
    discount_paise BIGINT NOT NULL DEFAULT 0 CHECK (discount_paise >= 0),
    tax_paise BIGINT NOT NULL DEFAULT 0 CHECK (tax_paise >= 0),
    cgst_paise BIGINT NOT NULL DEFAULT 0 CHECK (cgst_paise >= 0),
    sgst_paise BIGINT NOT NULL DEFAULT 0 CHECK (sgst_paise >= 0),
    igst_paise BIGINT NOT NULL DEFAULT 0 CHECK (igst_paise >= 0),
    shipping_paise BIGINT NOT NULL DEFAULT 0 CHECK (shipping_paise >= 0),
    wallet_paise BIGINT NOT NULL DEFAULT 0 CHECK (wallet_paise >= 0),
    total_paise BIGINT NOT NULL CHECK (total_paise >= 0),
    payable_paise BIGINT NOT NULL CHECK (payable_paise >= 0),
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    high_value_flag BOOLEAN NOT NULL DEFAULT FALSE,
    idempotency_key VARCHAR(100) UNIQUE,
    placed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    sku VARCHAR(100) NOT NULL,
    name_snapshot VARCHAR(255) NOT NULL,
    attributes_snapshot_json TEXT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_paise BIGINT NOT NULL CHECK (unit_price_paise >= 0),
    discount_paise BIGINT NOT NULL DEFAULT 0 CHECK (discount_paise >= 0),
    tax_paise BIGINT NOT NULL DEFAULT 0 CHECK (tax_paise >= 0),
    hsn_code VARCHAR(50) DEFAULT '9102',
    unit_id VARCHAR(100),
    edition_number INT
);

CREATE TABLE IF NOT EXISTS order_status_history (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    from_status VARCHAR(50),
    to_status VARCHAR(50) NOT NULL,
    note VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    checkout_id UUID,
    provider VARCHAR(50) NOT NULL DEFAULT 'MOCK',
    provider_ref VARCHAR(150),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    amount_paise BIGINT NOT NULL CHECK (amount_paise >= 0),
    method VARCHAR(50),
    attempt_no INT NOT NULL DEFAULT 1,
    failure_reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY,
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    provider_event_id VARCHAR(150),
    amount_paise BIGINT NOT NULL CHECK (amount_paise >= 0),
    raw_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID PRIMARY KEY,
    provider VARCHAR(50) NOT NULL,
    event_id VARCHAR(150) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payload_json TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'RECEIVED',
    received_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT uq_provider_event UNIQUE (provider, event_id)
);

CREATE TABLE IF NOT EXISTS refunds (
    id UUID PRIMARY KEY,
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    order_item_id UUID REFERENCES order_items(id),
    amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
    destination VARCHAR(50) NOT NULL DEFAULT 'ORIGINAL_PAYMENT',
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
    created_by UUID,
    idempotency_key VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipments (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL DEFAULT 'MANUAL',
    awb VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'LABEL_CREATED',
    method VARCHAR(50) NOT NULL DEFAULT 'EXPRESS_INSURED',
    estimated_delivery TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS return_requests (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'REQUESTED',
    reason_code VARCHAR(50) NOT NULL,
    notes TEXT,
    decided_by UUID,
    decision_note VARCHAR(255),
    requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Customer Service & Audit
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    priority VARCHAR(50) NOT NULL DEFAULT 'NORMAL',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS support_messages (
    id UUID PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL,
    sender_type VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY,
    question VARCHAR(300) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'General',
    display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY,
    actor_type VARCHAR(50) NOT NULL,
    actor_id UUID,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    result VARCHAR(50) NOT NULL DEFAULT 'SUCCESS',
    ip VARCHAR(50),
    metadata_json TEXT,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection_id);
CREATE INDEX IF NOT EXISTS idx_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
