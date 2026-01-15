# Technical Design: AI 재고·수요 예측 운영툴

## 1. System Architecture

### 1.1 Components
- **Frontend**: React (v18+, Vite), Ant Design (UI Framework), TypeScript.
- **Backend**: NestJS (Node.js Framework), TypeORM (ORM).
- **Database**: PostgreSQL (Transactional & Time-series data).
- **ETL**: Python (Pandas, SQLAlchemy) - Batch Processing.
- **ML**: Python (XGBoost/LightGBM, Scikit-learn) - Training & Inference.

### 1.2 Data Flow
1. **Ingestion**: Transactional data (Orders, Inventory) flows into `Raw Tables`.
2. **Processing (ETL)**:
    - `Raw` -> `Staging` (Validation & Cleaning) -> `Mart` (Aggregation & Feature Engineering).
3. **Intelligence (ML)**:
    - Models read from `Mart`.
    - Predictions written to `Predictions` table.
4. **Consumption (App)**:
    - Backend reads `Mart` & `Predictions`.
    - Frontend displays Dashboard & Workflows.

## 2. Database Schema Design

### 2.1 Core Tables
- `products`: 상품 정보 (Master)
- `inventory`: 재고 스냅샷 (Transactional)
- `orders`, `order_items`: 주문 내역 (Transactional)

### 2.2 Analytical Tables (Mart)
- `sku_daily_stats`: SKU별 일일 판매량, 재고량 집계
- `sku_features`: ML 학습용 파생 변수 모음

### 2.3 AI & Predictions
- `predictions`: `sku_id`, `target_date`, `forecast_qty`, `confidence_score`
- `anomaly_detections`: `sku_id`, `detection_date`, `anomaly_type`, `severity`

### 2.4 Administration
- `purchase_orders`: 발주안 헤더 (Status: DRAFT, PENDING, APPROVED, REJECTED)
- `users`, `roles`: 인증 및 권한
- `audit_logs`: 시스템 작업 이력

## 3. Libraries & Patterns

### 3.1 Backend (NestJS)
- **Architecture**: Modular Architecture (Domain-driven modules).
- **Pattern**: Repository Pattern using TypeORM.
- **Auth**: JWT Strategy + Role Guards.

### 3.2 Frontend (React)
- **State Management**: Context API (Auth), React Query (Server State).
- **UI Components**: Ant Design Table, Form, Charts (Recharts or Ant Plots).
- **Routing**: React Router with Protected Routes.

### 3.3 ETL & ML
- **Scheduling**: Native Cron or Simple Python Scheduler (initially).
- **ML Flow**: Train -> Save Model (Pickle/Joblib) -> Load -> Predict.

## 4. API Specification (Draft)

### 4.1 Auth Module
- `POST /auth/login`: 로그인, JWT 발급
- `GET /auth/profile`: 내 정보 조회

### 4.2 SKU & Predictions
- `GET /skus`: SKU 목록 조회 (검색, 필터, 정렬, 페이지네이션)
- `GET /skus/:id`: SKU 상세 정보
- `GET /skus/:id/predictions`: 해당 SKU의 수요 예측 데이터 조회
- `GET /predictions/anomalies`: 이상 감지 내역 조회

### 4.3 Purchase Orders (발주)
- `GET /purchase-orders`: 발주안 목록 조회
- `POST /purchase-orders`: 발주안 생성 (Draft)
- `GET /purchase-orders/:id`: 발주안 상세
- `PATCH /purchase-orders/:id/status`: 상태 변경 (승인/반려 등)

### 4.4 Dashboard
- `GET /dashboard/stats`: 대시보드 주요 지표 (KPI)
- `GET /audit-logs`: 감사 로그 조회

## 5. Frontend Route Design

### 5.1 Public
- `/login`: 로그인 페이지

### 5.2 Protected (Role Guarded)
- `/`: 대시보드 (Dashboard)
- `/skus`: SKU 리스트 및 예측 정보
- `/orders`: 발주 관리 (생성, 승인)
- `/forecast`: 수요 예측 상세 및 발주 추천
- `/settings`: 알림 설정 등
