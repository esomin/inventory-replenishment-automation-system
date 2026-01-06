# AI 재고·수요 예측 운영툴

AI 재고·수요 예측 운영툴은 수요 예측부터 발주 추천, 이상 징후 탐지까지 자동화하는 시스템입니다.


## 프로젝트 구조

```
.
├── frontend/          # React + AntD 프론트엔드
├── backend/           # NestJS 백엔드 API
├── etl/               # Python ETL 파이프라인
├── ml/                # Python ML 모델
├── spec/              # 요구사항 명세
└── plan/              # 실행 계획

```

1. Backend (NestJS + PostgreSQL): 핵심 비즈니스 로직과 API를 담당합니다. TypeORM을 사용하여 DB와 상호작용하며, 모듈 단위(Auth, SKU, Prediction 등)로 구조화되어 있습니다.
2. Frontend (React + AntD): 관리자용 웹 대시보드로, 데이터 시각화와 직관적인 발주 운영을 지원합니다.
3. ETL (Python): 다양한 소스(주문, 재고 등)에서 데이터를 수집(Raw)하여 학습용 데이터(Mart)로 가공하는 파이프라인입니다.
4. ML (Python): XGBoost/LightGBM 등을 활용해 수요를 예측하고 이상치를 탐지합니다.

## 기술 스택

- **Frontend**: React + Ant Design + TypeScript
- **Backend**: NestJS + PostgreSQL + TypeORM
- **ETL**: Python + SQLAlchemy
- **ML**: Python + XGBoost/LightGBM

## 빠른 시작

### 1. 데이터베이스 실행

```bash
docker-compose up -d
```

### 2. 백엔드 실행

```bash
cd backend
npm install
npm run start:dev
```

### 3. 프론트엔드 실행

```bash
cd frontend
npm install
npm start
```

### 4. ETL 실행

```bash
cd etl
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python scripts/generate_fake_data.py
python scripts/run_etl.py
```

### 5. ML 모델 실행

```bash
cd ml
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python scripts/train_model.py
python scripts/predict.py
```

## 주요 기능

- SKU 단위 수요 예측 (7일/14일/30일)
- 재고 소진 예상일 및 발주 추천
- 품절 위험 알림
- 이상징후 탐지 (판매 급증/급감, 반품률 폭증)
- 발주안 생성/승인 워크플로우
- 설명 가능한 AI (특징 기여도/룰 기반 설명)

## 개발 가이드

각 모듈의 상세한 실행 방법은 해당 디렉토리의 README.md를 참조하세요.
