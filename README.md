# AI 재고·수요 예측 운영툴

이커머스 재고 및 수요 예측 운영툴. "수요 예측 → 발주 추천 → 이상징후 탐지" 워크플로우를 제공합니다.

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
