# Technical Design: AI 재고·수요 예측 운영툴

## 1. System Architecture

### 1.1 Components
- **Frontend**: React (v18+), Ant Design (UI Framework), TypeScript.
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
