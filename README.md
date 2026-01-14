# Inventory Forecaster

AI-powered inventory and demand forecasting system for e-commerce. Automates demand prediction, purchase order recommendations, and anomaly detection.

## Architecture

Full-stack system with 4 independent modules:

| Module | Stack | Description |
|--------|-------|-------------|
| **Backend** | NestJS + PostgreSQL + TypeORM | Core business logic and REST API |
| **Frontend** | React + Ant Design | Admin dashboard for visualization and operations |
| **ETL** | Python + SQLAlchemy | Data pipeline for Raw → Staging → Mart transformation |
| **ML** | Python + XGBoost/LightGBM | Demand forecasting and anomaly detection models |

## System Requirements

Based on EARS syntax defined in `requirements.md`.

### 1. Data Processing
- **Collection**: Real-time ingestion of orders, inventory, and product data into Raw storage.
- **Aggregation**: Automated transformation into Mart tables with feature engineering (seasonality, price trends, etc.).

### 2. AI & Forecasting
- **Forecasting**: Demand prediction (7/14/30 days) using XGBoost/LightGBM.
- **Anomaly Detection**: Detection of abnormal sales spikes/drops and return rate surges.
- **Explainability**: XAI features to explain prediction rationale (Feature Importance).

### 3. Order Management
- **Recommendations**: Automated purchase order recommendations based on forecast and stock depletion.
- **Risk Management**: "Stockout Risk TOP" identification and highlighting.
- **Workflow**: Purchase order approval workflow (Draft → Pending → Approved/Rejected).

### 4. Admin & Interface
- **Dashboard**: KPI monitoring and notification settings.
- **Operations**: Advanced SKU filtering, sorting, and management.
- **Security**: Role-Based Access Control (RBAC) and Audit Logging for critical actions.

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- PostgreSQL 15+

### Database Setup

```bash
# Start PostgreSQL
docker-compose up -d

# Run migrations
cd backend
npm run migration:run
```

### Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev          # Development mode (http://localhost:3000)
```

### Frontend (React)

```bash
cd frontend
npm install
npm start                  # Development server (http://localhost:3001)
```

### ETL (Python)

```bash
cd etl
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

python scripts/generate_fake_data.py  # Generate test data
python scripts/run_etl.py             # Run ETL pipeline
```

### ML (Python)

```bash
cd ml
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

python scripts/train_model.py         # Train model
python scripts/predict.py             # Run predictions
python scripts/detect_anomalies.py    # Run anomaly detection
```

## Data Architecture

### 5-Layer Database Schema

```
External Sources
      ↓
Raw Tables (orders, inventory, products, promotions, ad_campaigns)
      ↓
ETL Pipeline (Python)
      ↓
Staging Tables (data validation & transformation)
      ↓
Mart Tables (sku_daily_stats, sku_features)
      ↓
ML Models (XGBoost/LightGBM)
      ↓
Prediction Tables (predictions, anomaly_detections)
      ↓
Backend API (NestJS)
      ↓
Frontend Dashboard (React + AntD)
```

| Layer | Tables | Purpose |
|-------|--------|---------|
| **Raw** | products, orders, payments, inventory, promotions, ad_campaigns | Original source data |
| **Staging** | staging_orders, staging_inventory | ETL intermediate transformation |
| **Mart** | sku_daily_stats, sku_features | Aggregated data and ML features |
| **Prediction** | predictions, anomaly_detections | ML model outputs |
| **Admin** | users, roles, purchase_orders, notifications, audit_logs | Application management |

## Key Features

### Demand Forecasting
- Predicts demand for 7/14/30-day horizons
- Features: day_of_week, season, price trends, discount_rate, inventory_turnover, etc.
- Explainability via SHAP feature importance

### Anomaly Detection
- `SALES_SPIKE` / `SALES_DROP`: Sudden demand changes
- `RETURN_SURGE`: Abnormal return rates
- `INVENTORY_ANOMALY`: Stock level issues

### Purchase Order Workflow
- Status flow: `DRAFT` → `PENDING` → `APPROVED`/`REJECTED` → `COMPLETED`
- Role-based access: OPERATOR (create), MANAGER (approve), ADMIN (full access)

## Environment Variables

Copy `.env.example` to `.env` in each module directory:

**Backend** (`backend/.env`):
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=inventory_db
JWT_SECRET=your-secret-key
```

**ETL & ML** (`.env` in respective directories):
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=inventory_db
```

## Available Scripts

### Backend
| Command | Description |
|---------|-------------|
| `npm run start:dev` | Development mode with hot reload |
| `npm run build` | Production build |
| `npm test` | Run all tests |
| `npm run test:cov` | Tests with coverage |
| `npm run lint` | ESLint |
| `npm run migration:run` | Run database migrations |
| `npm run migration:generate` | Generate new migration |

### Frontend
| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm run build` | Production build |
| `npm test` | Run tests |

## Documentation

- Database schema: `backend/docs/SCHEMA.md`
- Development plan: `plan/plan.md`

## Development Status

- [x] Project structure
- [x] Database schema & migrations
- [x] Backend basic setup (NestJS + TypeORM)
- [x] TypeORM entities
- [ ] Authentication (JWT)
- [ ] Frontend dashboard
- [ ] ETL pipeline
- [ ] ML models

## License

MIT
