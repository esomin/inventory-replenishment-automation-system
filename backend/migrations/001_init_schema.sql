-- Initial schema for AI inventory & demand forecasting tool
-- Raw, Staging, Mart, Prediction, Admin tables

BEGIN;

/* =========================================================
 * RAW TABLES
 * ========================================================= */

-- Products (상품 마스터)
CREATE TABLE IF NOT EXISTS products (
    id              BIGSERIAL PRIMARY KEY,
    sku             VARCHAR(64) NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    category        VARCHAR(128),
    brand           VARCHAR(128),
    price           NUMERIC(12, 2),
    cost            NUMERIC(12, 2),
    status          VARCHAR(32) DEFAULT 'ACTIVE', -- ACTIVE / INACTIVE
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products (brand);


-- Orders (주문/판매 데이터, SKU 단위 라인 아이템)
CREATE TABLE IF NOT EXISTS orders (
    id              BIGSERIAL PRIMARY KEY,
    order_number    VARCHAR(64) NOT NULL,
    order_date      TIMESTAMPTZ NOT NULL,
    sku_id          BIGINT NOT NULL REFERENCES products(id),
    quantity        INTEGER NOT NULL CHECK (quantity > 0),
    unit_price      NUMERIC(12, 2) NOT NULL,
    currency        VARCHAR(8) DEFAULT 'KRW',
    customer_id     VARCHAR(64),
    channel         VARCHAR(64), -- e.g. WEB, APP, MARKETPLACE
    status          VARCHAR(32) DEFAULT 'CONFIRMED', -- CONFIRMED / CANCELED / RETURNED 등
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders (order_date);
CREATE INDEX IF NOT EXISTS idx_orders_sku_date ON orders (sku_id, order_date);
CREATE INDEX IF NOT EXISTS idx_orders_channel ON orders (channel);


-- Payments (결제 데이터)
CREATE TABLE IF NOT EXISTS payments (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id),
    amount          NUMERIC(12, 2) NOT NULL,
    currency        VARCHAR(8) DEFAULT 'KRW',
    method          VARCHAR(32), -- CARD / BANK_TRANSFER / POINT 등
    status          VARCHAR(32) DEFAULT 'PAID', -- PAID / REFUNDED / FAILED
    paid_at         TIMESTAMPTZ,
    refund_amount   NUMERIC(12, 2),
    refund_at       TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments (order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments (status);


-- Inventory (재고 스냅샷 / 재고 수량)
CREATE TABLE IF NOT EXISTS inventory (
    id                  BIGSERIAL PRIMARY KEY,
    sku_id              BIGINT NOT NULL REFERENCES products(id),
    location_code       VARCHAR(64), -- 창고/지점 코드
    quantity_on_hand    INTEGER NOT NULL,
    quantity_reserved   INTEGER DEFAULT 0,
    safety_stock        INTEGER DEFAULT 0,
    snapshot_date       DATE NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_inventory_sku_location_date
    ON inventory (sku_id, location_code, snapshot_date);


-- Promotions (프로모션 / 할인)
CREATE TABLE IF NOT EXISTS promotions (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    promotion_type  VARCHAR(32), -- COUPON / DISCOUNT / EVENT 등
    discount_type   VARCHAR(16), -- RATE / AMOUNT
    discount_value  NUMERIC(12, 4), -- 비율 또는 금액
    start_at        TIMESTAMPTZ NOT NULL,
    end_at          TIMESTAMPTZ NOT NULL,
    target_sku_id   BIGINT REFERENCES products(id),
    target_category VARCHAR(128),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_promotions_period ON promotions (start_at, end_at);
CREATE INDEX IF NOT EXISTS idx_promotions_target_sku ON promotions (target_sku_id);


-- Ad Campaigns (광고 집행)
CREATE TABLE IF NOT EXISTS ad_campaigns (
    id                  BIGSERIAL PRIMARY KEY,
    name                VARCHAR(255) NOT NULL,
    channel             VARCHAR(64), -- GOOGLE / FACEBOOK / NAVER 등
    external_campaign_id VARCHAR(128),
    sku_id              BIGINT REFERENCES products(id),
    daily_budget        NUMERIC(12, 2),
    start_at            TIMESTAMPTZ NOT NULL,
    end_at              TIMESTAMPTZ NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_ad_campaigns_period ON ad_campaigns (start_at, end_at);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_sku ON ad_campaigns (sku_id);


/* =========================================================
 * STAGING TABLES
 * ========================================================= */

-- Staging Orders (정제된 주문 집계 입력)
CREATE TABLE IF NOT EXISTS staging_orders (
    id              BIGSERIAL PRIMARY KEY,
    order_number    VARCHAR(64) NOT NULL,
    order_date      DATE NOT NULL,
    sku_id          BIGINT NOT NULL,
    quantity        INTEGER NOT NULL,
    revenue         NUMERIC(12, 2) NOT NULL,
    source_system   VARCHAR(64),
    ingestion_time  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staging_orders_sku_date
    ON staging_orders (sku_id, order_date);


-- Staging Inventory
CREATE TABLE IF NOT EXISTS staging_inventory (
    id              BIGSERIAL PRIMARY KEY,
    sku_id          BIGINT NOT NULL,
    snapshot_date   DATE NOT NULL,
    location_code   VARCHAR(64),
    quantity_on_hand INTEGER NOT NULL,
    quantity_reserved INTEGER DEFAULT 0,
    ingestion_time  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staging_inventory_sku_date
    ON staging_inventory (sku_id, snapshot_date);


/* =========================================================
 * MART TABLES (집계/특징 테이블)
 * ========================================================= */

-- SKU 일별 집계 (판매/재고/반품 등)
CREATE TABLE IF NOT EXISTS sku_daily_stats (
    id                  BIGSERIAL PRIMARY KEY,
    sku_id              BIGINT NOT NULL REFERENCES products(id),
    stat_date           DATE NOT NULL,
    units_sold          INTEGER NOT NULL DEFAULT 0,
    gross_revenue       NUMERIC(14, 2) NOT NULL DEFAULT 0,
    net_revenue         NUMERIC(14, 2) NOT NULL DEFAULT 0,
    units_returned      INTEGER NOT NULL DEFAULT 0,
    ending_inventory    INTEGER,
    ad_spend            NUMERIC(14, 2) DEFAULT 0,
    promo_flag          BOOLEAN DEFAULT FALSE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_sku_daily_stats_sku_date
    ON sku_daily_stats (sku_id, stat_date);

CREATE INDEX IF NOT EXISTS idx_sku_daily_stats_date ON sku_daily_stats (stat_date);


-- SKU Feature 테이블 (모델 입력용 특징)
CREATE TABLE IF NOT EXISTS sku_features (
    id                  BIGSERIAL PRIMARY KEY,
    sku_id              BIGINT NOT NULL REFERENCES products(id),
    feature_date        DATE NOT NULL, -- 기준 날짜
    horizon_days        INTEGER NOT NULL DEFAULT 7, -- 예측 기간(7/14/30)
    day_of_week         SMALLINT, -- 0-6
    is_weekend          BOOLEAN,
    season              VARCHAR(32),
    base_price          NUMERIC(12, 2),
    current_price       NUMERIC(12, 2),
    discount_rate       NUMERIC(6, 4), -- 0~1
    lead_time_days      INTEGER,
    inventory_turnover  NUMERIC(10, 4),
    return_rate         NUMERIC(10, 4),
    promo_intensity     NUMERIC(10, 4),
    ad_intensity        NUMERIC(10, 4),
    raw_features        JSONB, -- 추가 feature 보관용
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sku_features_sku_date_horizon
    ON sku_features (sku_id, feature_date, horizon_days);


/* =========================================================
 * PREDICTION TABLES
 * ========================================================= */

-- 수요 예측 결과
CREATE TABLE IF NOT EXISTS predictions (
    id                      BIGSERIAL PRIMARY KEY,
    sku_id                  BIGINT NOT NULL REFERENCES products(id),
    prediction_date         DATE NOT NULL, -- 예측 생성 기준일
    target_date             DATE NOT NULL, -- 예측 대상 날짜
    horizon_days            INTEGER NOT NULL, -- 7 / 14 / 30
    predicted_demand        NUMERIC(14, 4) NOT NULL,
    predicted_stockout_date DATE,
    recommended_order_qty   INTEGER,
    model_name              VARCHAR(64), -- XGBOOST / LIGHTGBM / PROPHET 등
    model_version           VARCHAR(64),
    feature_importance      JSONB, -- SHAP 등 특징 기여도
    explanation             JSONB, -- 룰 기반/요약 설명
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_predictions_sku_target
    ON predictions (sku_id, target_date, horizon_days);

CREATE INDEX IF NOT EXISTS idx_predictions_created_at
    ON predictions (created_at);


-- 이상탐지 결과
CREATE TABLE IF NOT EXISTS anomaly_detections (
    id                  BIGSERIAL PRIMARY KEY,
    sku_id              BIGINT NOT NULL REFERENCES products(id),
    event_date          DATE NOT NULL,
    anomaly_type        VARCHAR(64) NOT NULL, -- SALES_SPIKE / SALES_DROP / RETURN_SURGE 등
    severity            VARCHAR(16) NOT NULL, -- LOW / MEDIUM / HIGH / CRITICAL
    observed_value      NUMERIC(14, 4),
    expected_value      NUMERIC(14, 4),
    delta_value         NUMERIC(14, 4),
    details             JSONB,
    status              VARCHAR(32) DEFAULT 'OPEN', -- OPEN / ACKED / RESOLVED
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at         TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_anomaly_sku_date
    ON anomaly_detections (sku_id, event_date);

CREATE INDEX IF NOT EXISTS idx_anomaly_status
    ON anomaly_detections (status);


/* =========================================================
 * ADMIN TABLES (권한 / 발주 워크플로우 / 알림 / 감사로그)
 * ========================================================= */

-- Roles (역할: 운영자/매니저/관리자)
CREATE TABLE IF NOT EXISTS roles (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(32) NOT NULL UNIQUE, -- OPERATOR / MANAGER / ADMIN
    description     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Users
CREATE TABLE IF NOT EXISTS users (
    id              BIGSERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    name            VARCHAR(128),
    role_id         BIGINT NOT NULL REFERENCES roles(id),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_role_id ON users (role_id);


-- Purchase Orders (발주안)
CREATE TABLE IF NOT EXISTS purchase_orders (
    id                          BIGSERIAL PRIMARY KEY,
    po_number                   VARCHAR(64) NOT NULL UNIQUE,
    sku_id                      BIGINT NOT NULL REFERENCES products(id),
    quantity                    INTEGER NOT NULL CHECK (quantity > 0),
    status                      VARCHAR(32) NOT NULL DEFAULT 'DRAFT', -- DRAFT / PENDING / APPROVED / REJECTED / COMPLETED
    recommended_by_prediction_id BIGINT REFERENCES predictions(id),
    requested_by_user_id        BIGINT REFERENCES users(id),
    approved_by_user_id         BIGINT REFERENCES users(id),
    expected_arrival_date       DATE,
    supplier_name               VARCHAR(255),
    notes                       TEXT,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at                  TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_purchase_orders_sku ON purchase_orders (sku_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders (status);


-- Notifications (알림 설정)
CREATE TABLE IF NOT EXISTS notifications (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    channel         VARCHAR(32) NOT NULL, -- SLACK / EMAIL
    target_address  VARCHAR(255), -- 이메일 / 웹훅 URL
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    config          JSONB, -- 임계치, 조건 등
    created_by      BIGINT REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_notifications_channel ON notifications (channel);


-- Audit Logs (감사로그)
CREATE TABLE IF NOT EXISTS audit_logs (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id),
    action          VARCHAR(128) NOT NULL,
    entity_type     VARCHAR(128),
    entity_id       BIGINT,
    metadata        JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs (entity_type, entity_id);


COMMIT;
