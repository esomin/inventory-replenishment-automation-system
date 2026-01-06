# 실행 계획: AI 재고·수요 예측 운영툴

## 프로젝트 개요
이커머스 재고 및 수요 예측 운영툴 구축. "수요 예측 → 발주 추천 → 이상징후 탐지" 워크플로우 구현.

---

## TASK 1: 프로젝트 초기 설정 및 구조 생성 (완료)

**Goal**: 프로젝트 기본 구조와 설정 파일 생성

**Input**: 
- spec/spec.md 요구사항

**Output**:
- 프로젝트 루트 디렉토리 구조
- package.json (프론트엔드, 백엔드, ETL, ML 각각)
- README.md
- .gitignore
- docker-compose.yml (PostgreSQL 포함)

**Constraints**:
- 프론트엔드, 백엔드, ETL, ML 모듈 분리
- 각 모듈 독립 실행 가능하도록 구성

**Verification checklist**:
- [x] 프로젝트 루트에 frontend/, backend/, etl/, ml/ 디렉토리 생성됨
- [x] 각 모듈에 package.json 존재
- [x] docker-compose.yml로 PostgreSQL 실행 가능
- [x] .gitignore에 node_modules, .env 등 제외 설정

---

## TASK 2: 데이터베이스 스키마 설계 및 생성 (완료)

**Goal**: PostgreSQL 데이터베이스 스키마 설계 및 마이그레이션 파일 생성

**Input**:
- spec.md의 데이터 소스 요구사항 (주문/결제, 재고, 상품, 프로모션, 광고 집행)

**Output**:
- backend/migrations/ 디렉토리 및 마이그레이션 파일들
- Raw 테이블: orders, payments, inventory, products, promotions, ad_campaigns
- Staging 테이블: staging_orders, staging_inventory 등
- Mart 테이블: sku_daily_stats, sku_features 등
- Prediction 테이블: predictions, anomaly_detections
- Admin 테이블: users, roles, purchase_orders, notifications, audit_logs

**Constraints**:
- 실무 수준의 스키마 설계 (외래키, 인덱스, 제약조건 포함)
- 타임스탬프 필드 포함
- 소프트 삭제 지원

**Verification checklist**:
- [x] 모든 Raw 테이블 스키마 정의됨
- [x] Staging, Mart 테이블 스키마 정의됨
- [x] Prediction 테이블 스키마 정의됨
- [x] Admin 관련 테이블 스키마 정의됨
- [x] 마이그레이션 파일로 데이터베이스 생성 가능

---

## TASK 3: 백엔드 기본 구조 및 데이터베이스 연결 (완료)

**Goal**: NestJS 백엔드 기본 구조 설정 및 PostgreSQL 연결

**Input**:
- TASK 2의 데이터베이스 스키마

**Output**:
- backend/src/main.ts (애플리케이션 진입점)
- backend/src/app.module.ts
- backend/src/database/ 디렉토리 (TypeORM 설정)
- backend/src/config/ 디렉토리 (환경변수 설정)
- backend/.env.example

**Constraints**:
- NestJS 프레임워크 사용
- TypeORM 사용
- 환경변수로 데이터베이스 연결 정보 관리

**Verification checklist**:
- [x] NestJS 애플리케이션 실행 가능
- [x] PostgreSQL 연결 성공
- [x] 환경변수 설정 파일 존재

---

## TASK 4: 백엔드 엔티티 및 리포지토리 생성

**Goal**: TypeORM 엔티티 및 리포지토리 생성

**Input**:
- TASK 2의 데이터베이스 스키마

**Output**:
- backend/src/entities/ 디렉토리 (모든 엔티티 클래스)
- backend/src/repositories/ 디렉토리 (필요시 커스텀 리포지토리)

**Constraints**:
- TypeORM 데코레이터 사용
- 엔티티 간 관계 정의 (OneToMany, ManyToOne 등)
- 각 엔티티에 createdAt, updatedAt 포함

**Verification checklist**:
- [ ] 모든 Raw 테이블에 대응하는 엔티티 생성됨
- [ ] Staging, Mart, Prediction 엔티티 생성됨
- [ ] Admin 엔티티 생성됨
- [ ] 엔티티 간 관계 정의됨
- [ ] 마이그레이션 실행 가능

---

## TASK 5: 백엔드 인증 및 권한 시스템

**Goal**: JWT 기반 인증 및 역할 기반 권한 시스템 구현

**Input**:
- spec.md의 권한 요구사항 (운영자/매니저/관리자)

**Output**:
- backend/src/auth/ 디렉토리 (인증 모듈)
- backend/src/auth/auth.module.ts
- backend/src/auth/auth.service.ts
- backend/src/auth/auth.controller.ts
- backend/src/auth/jwt.strategy.ts
- backend/src/auth/guards/ (JWT Guard, Role Guard)
- backend/src/auth/decorators/ (Roles 데코레이터)

**Constraints**:
- JWT 토큰 기반 인증
- Passport.js 사용
- 역할: OPERATOR, MANAGER, ADMIN
- 비밀번호 해싱 (bcrypt)

**Verification checklist**:
- [ ] 로그인 API 동작
- [ ] JWT 토큰 발급 및 검증
- [ ] 역할 기반 접근 제어 동작
- [ ] 가드 적용 가능

---

## TASK 6: 프론트엔드 기본 구조 및 설정

**Goal**: React + AntD 프론트엔드 기본 구조 생성

**Input**:
- spec.md의 프론트엔드 요구사항

**Output**:
- frontend/package.json
- frontend/src/ 디렉토리 구조
- frontend/src/App.tsx
- frontend/src/index.tsx
- frontend/src/config/ 디렉토리 (API 설정)
- frontend/src/services/ 디렉토리 (API 클라이언트)
- frontend/src/utils/ 디렉토리
- frontend/.env.example
- frontend/README.md

**Constraints**:
- React 18+
- Ant Design 사용
- TypeScript 사용
- Axios 또는 fetch로 API 호출

**Verification checklist**:
- [ ] React 애플리케이션 실행 가능
- [ ] Ant Design 컴포넌트 사용 가능
- [ ] API 클라이언트 설정됨
- [ ] 환경변수 설정 가능

---

## TASK 7: 프론트엔드 인증 및 라우팅

**Goal**: 로그인 페이지 및 라우팅 설정

**Input**:
- TASK 5의 백엔드 인증 API

**Output**:
- frontend/src/pages/Login.tsx
- frontend/src/components/Auth/ 디렉토리
- frontend/src/contexts/AuthContext.tsx
- frontend/src/routes/ 디렉토리
- frontend/src/routes/ProtectedRoute.tsx
- frontend/src/routes/AppRoutes.tsx
- frontend/src/services/auth.service.ts

**Constraints**:
- JWT 토큰 로컬스토리지 저장
- 역할 기반 라우팅
- 로그인 상태 관리

**Verification checklist**:
- [ ] 로그인 페이지 렌더링됨
- [ ] 로그인 기능 동작 (백엔드 연동)
- [ ] 토큰 저장 및 관리됨
- [ ] 보호된 라우트 동작
- [ ] 역할 기반 접근 제어 동작

---

## TASK 8: 백엔드 SKU 및 예측 API

**Goal**: SKU 리스트, 수요 예측, 발주 추천 관련 API 구현

**Input**:
- TASK 4의 엔티티

**Output**:
- backend/src/sku/ 디렉토리 (SKU 모듈)
- backend/src/sku/sku.controller.ts (GET /api/skus, 필터/정렬)
- backend/src/sku/sku.service.ts
- backend/src/predictions/ 디렉토리 (예측 모듈)
- backend/src/predictions/predictions.controller.ts
- backend/src/predictions/predictions.service.ts
- backend/src/purchase-orders/ 디렉토리 (발주안 모듈)
- backend/src/purchase-orders/purchase-orders.controller.ts
- backend/src/purchase-orders/purchase-orders.service.ts

**Constraints**:
- RESTful API 설계
- 필터링: SKU 코드, 카테고리, 품절 위험도 등
- 정렬: 품절 위험도, 예상 소진일 등
- 페이지네이션 지원

**Verification checklist**:
- [ ] SKU 리스트 조회 API 동작
- [ ] 필터/정렬 기능 동작
- [ ] 수요 예측 데이터 조회 API 동작
- [ ] 발주안 생성/조회 API 동작
- [ ] 품절 위험 TOP 조회 API 동작

---

## TASK 9: 프론트엔드 SKU 리스트 페이지

**Goal**: SKU 리스트, 필터, 정렬, 품절 위험 TOP 표시

**Input**:
- TASK 8의 백엔드 SKU API

**Output**:
- frontend/src/pages/SKUList.tsx
- frontend/src/components/SKU/ 디렉토리
- frontend/src/components/SKU/SKUTable.tsx
- frontend/src/components/SKU/SKUFilters.tsx
- frontend/src/components/SKU/StockoutRiskBadge.tsx
- frontend/src/services/sku.service.ts

**Constraints**:
- Ant Design Table 사용
- 필터: SKU 코드, 카테고리, 품절 위험도
- 정렬: 품절 위험도, 예상 소진일 등
- 페이지네이션
- 품절 위험 TOP 하이라이트

**Verification checklist**:
- [ ] SKU 리스트 테이블 렌더링됨
- [ ] 필터 기능 동작
- [ ] 정렬 기능 동작
- [ ] 품절 위험 TOP 표시됨
- [ ] 페이지네이션 동작

---

## TASK 10: 백엔드 발주안 워크플로우 및 알림

**Goal**: 발주안 승인 워크플로우 및 알림 시스템 구현

**Input**:
- TASK 8의 발주안 모듈

**Output**:
- backend/src/purchase-orders/purchase-orders.service.ts 확장 (상태 관리)
- backend/src/notifications/ 디렉토리 (알림 모듈)
- backend/src/notifications/notifications.service.ts (슬랙/이메일 모킹)
- backend/src/notifications/notifications.controller.ts
- backend/src/audit-logs/ 디렉토리 (감사로그 모듈)
- backend/src/audit-logs/audit-logs.service.ts
- backend/src/audit-logs/audit-logs.interceptor.ts

**Constraints**:
- 발주안 상태: DRAFT, PENDING, APPROVED, REJECTED, COMPLETED
- 상태 변경 시 알림 발송 (모킹)
- 모든 중요 작업에 감사로그 기록

**Verification checklist**:
- [ ] 발주안 상태 변경 API 동작
- [ ] 승인 워크플로우 동작
- [ ] 알림 발송 기능 동작 (모킹)
- [ ] 감사로그 기록 기능 동작
- [ ] 감사로그 조회 API 동작

---

## TASK 11: 프론트엔드 발주안 관리 페이지

**Goal**: 발주안 생성, 승인, 상태 관리 워크플로우

**Input**:
- TASK 10의 백엔드 발주안 워크플로우 API

**Output**:
- frontend/src/pages/PurchaseOrders.tsx
- frontend/src/components/PurchaseOrder/ 디렉토리 확장
- frontend/src/components/PurchaseOrder/PurchaseOrderTable.tsx
- frontend/src/components/PurchaseOrder/PurchaseOrderForm.tsx
- frontend/src/components/PurchaseOrder/ApprovalWorkflow.tsx
- frontend/src/components/PurchaseOrder/StatusBadge.tsx

**Constraints**:
- Ant Design Form 사용
- 상태별 필터링
- 승인/거부 버튼 (권한에 따라)
- 워크플로우 시각화

**Verification checklist**:
- [ ] 발주안 리스트 표시됨
- [ ] 발주안 생성 폼 동작
- [ ] 상태 변경 기능 동작
- [ ] 승인 워크플로우 동작
- [ ] 권한에 따른 버튼 표시/숨김 동작

---

## TASK 12: Core System E2E Verification (신규 추가)

**Goal**: 코어 기능(로그인 → SKU 확인 → 발주 생성 → 승인) 통합 테스트 및 앱 정상 실행 확인

**Input**:
- 지금까지 구현된 Backend, Frontend 기능

**Action Items**:
1. 로컬 환경에서 Backend, Frontend, DB 모두 실행
2. 브라우저로 Frontend 접속
3. 관리자 계정 로그인
4. SKU 리스트 확인 (더미 데이터 일부 수동 주입 필요할 수 있음)
5. 발주안 생성 프로세스 수행
6. 승인/거부 워크플로우 수행
7. DB에 데이터 정상 반영 확인

**Verification checklist**:
- [ ] Frontend에서 로그인 후 메인 화면 진입 성공
- [ ] SKU 리스트 조회 가능
- [ ] 발주안 생성 및 상태 변경이 정상적으로 DB에 반영됨
- [ ] 전체적인 UX 흐름에 끊김이 없음

---

## TASK 13: ETL 파이프라인 기본 구조

**Goal**: Python ETL 파이프라인 기본 구조 및 설정 생성

**Input**:
- spec.md의 ETL 요구사항

**Output**:
- etl/requirements.txt
- etl/src/config.py (데이터베이스 연결 설정)
- etl/src/database/ 디렉토리 (DB 연결 유틸)
- etl/src/etl/ 디렉토리 (ETL 모듈)
- etl/src/etl/base.py (기본 ETL 클래스)
- etl/README.md

**Constraints**:
- Python 3.8+ 사용
- psycopg2 또는 SQLAlchemy 사용
- 환경변수로 설정 관리

**Verification checklist**:
- [ ] Python 가상환경 설정 가능
- [ ] 데이터베이스 연결 테스트 통과
- [ ] 기본 ETL 구조 생성됨

---

## TASK 14: ETL Raw → Staging 파이프라인

**Goal**: Raw 데이터를 Staging으로 추출 및 변환

**Input**:
- TASK 2의 Raw 및 Staging 테이블 스키마

**Output**:
- etl/src/etl/extractors/ 디렉토리
- etl/src/etl/transformers/ 디렉토리
- etl/src/etl/loaders/ 디렉토리
- etl/src/etl/pipelines/raw_to_staging.py

**Constraints**:
- 배치 처리 방식
- 데이터 검증 로직 포함
- 에러 핸들링 및 로깅

**Verification checklist**:
- [ ] Raw 데이터 추출 기능 동작
- [ ] Staging 변환 로직 동작
- [ ] Staging 적재 기능 동작
- [ ] 전체 파이프라인 실행 가능

---

## TASK 15: ETL Staging → Mart 파이프라인 및 Feature 생성

**Goal**: Staging 데이터를 Mart로 집계하고 Feature 생성

**Input**:
- TASK 14의 Staging 데이터
- spec.md의 Feature 요구사항

**Output**:
- etl/src/etl/aggregators/ 디렉토리
- etl/src/etl/features/ 디렉토리
- etl/src/etl/pipelines/staging_to_mart.py
- etl/src/etl/pipelines/feature_generation.py

**Constraints**:
- SKU 단위 집계
- 일별/주별 집계 테이블 생성
- Feature 계산 로직 구현

**Verification checklist**:
- [ ] Mart 집계 테이블 생성됨
- [ ] 모든 Feature 계산 로직 구현됨
- [ ] Feature 데이터 Mart에 저장됨
- [ ] 파이프라인 실행 가능

---

## TASK 16: 가짜 데이터 생성 스크립트

**Goal**: 개발/테스트용 가짜 데이터 생성

**Input**:
- TASK 2의 데이터베이스 스키마

**Output**:
- etl/src/data_generation/ 디렉토리
- etl/scripts/generate_fake_data.py

**Constraints**:
- 실무 수준의 데이터 스키마 준수
- 현실적인 데이터 패턴 (시계열, 계절성 등)
- 다양한 SKU, 카테고리, 프로모션 시나리오

**Verification checklist**:
- [ ] 모든 Raw 테이블에 가짜 데이터 생성 가능
- [ ] 데이터 간 관계 유지됨
- [ ] 현실적인 데이터 패턴 반영됨
- [ ] 스크립트 실행 가능

---

## TASK 17: ML 모델 기본 구조 및 수요 예측 모델

**Goal**: 수요 예측 모델 (XGBoost/LightGBM) 구현

**Input**:
- TASK 15의 Feature 데이터

**Output**:
- ml/requirements.txt
- ml/src/config.py
- ml/src/models/ 디렉토리
- ml/scripts/train_model.py
- ml/scripts/predict.py

**Constraints**:
- XGBoost 또는 LightGBM 사용
- 7일/14일/30일 예측 지원
- 모델 저장 및 로드 기능
- 예측 결과를 Prediction 테이블에 저장

**Verification checklist**:
- [ ] 모델 학습 스크립트 실행 가능
- [ ] 모델 저장/로드 기능 동작
- [ ] 예측 스크립트 실행 가능
- [ ] 예측 결과 데이터베이스 저장됨

---

## TASK 18: ML 이상탐지 모델

**Goal**: 이상탐지 모델 구현 (판매 급증/급감, 반품률 폭증 등)

**Input**:
- TASK 15의 Feature 데이터

**Output**:
- ml/src/models/anomaly_detection.py
- ml/src/models/anomaly_types.py
- ml/scripts/detect_anomalies.py

**Constraints**:
- 통계적 방법 또는 Isolation Forest 등 사용
- 다양한 이상 유형 탐지
- 결과를 anomaly_detections 테이블에 저장

**Verification checklist**:
- [ ] 이상탐지 모델 학습/실행 가능
- [ ] 판매급증/급감 탐지 동작
- [ ] 결과 데이터베이스 저장됨

---

## TASK 19: ML 설명 가능성 기능

**Goal**: 예측 결과 설명 기능 (특징 기여도/룰 기반)

**Input**:
- TASK 17의 예측 모델

**Output**:
- ml/src/explainability/ 디렉토리
- ml/src/explainability/feature_importance.py
- ml/src/explainability/rule_based_explainer.py

**Constraints**:
- SHAP 또는 모델 내장 feature importance 사용
- 룰 기반 설명 로직 구현
- 설명 결과를 예측 결과와 함께 저장

**Verification checklist**:
- [ ] 특징 기여도 계산 기능 동작
- [ ] 룰 기반 설명 생성 기능 동작
- [ ] 설명 결과 저장됨

---

## TASK 20: 프론트엔드 수요 예측 및 발주 추천 페이지

**Goal**: 수요 예측 상세 및 발주 추천 표시

**Input**:
- TASK 8의 백엔드 예측 API (프론트엔드 연결)

**Output**:
- frontend/src/pages/DemandForecast.tsx
- frontend/src/pages/PurchaseRecommendation.tsx
- frontend/src/components/Forecast/ 차트 컴포넌트

**Constraints**:
- 차트 라이브러리 사용
- 예측 기간 선택 (7/14/30일)
- 설명 가능성 정보 표시

**Verification checklist**:
- [ ] 수요 예측 차트 렌더링됨
- [ ] 예측 기간 선택 동작
- [ ] 발주 추천 카드 렌더링됨
- [ ] 발주안 생성 기능 동작

---

## TASK 21: 프론트엔드 알림 설정 및 대시보드

**Goal**: 알림 설정 페이지 및 대시보드 구현

**Input**:
- TASK 10의 백엔드 알림 API

**Output**:
- frontend/src/pages/Dashboard.tsx
- frontend/src/pages/NotificationSettings.tsx
- frontend/src/components/Dashboard/SummaryCards.tsx

**Constraints**:
- 대시보드에 주요 지표 표시
- 알림 설정 폼
- 최근 알림 목록

**Verification checklist**:
- [ ] 대시보드 렌더링됨
- [ ] 주요 지표 표시됨
- [ ] 알림 설정 페이지 동작

---

## TASK 22: ETL 배치 스케줄링 설정

**Goal**: ETL 파이프라인 배치 실행 스케줄링 설정

**Input**:
- TASK 14, 15의 ETL 파이프라인

**Output**:
- etl/src/scheduler/ 디렉토리
- etl/scripts/run_etl.py

**Constraints**:
- 로컬 실행 가능한 스케줄러
- 환경변수로 스케줄 설정

**Verification checklist**:
- [ ] ETL 파이프라인 스케줄 실행 가능
- [ ] 로깅 동작

---

## TASK 23: ML 배치 예측 스케줄링

**Goal**: ML 모델 배치 예측 스케줄링 설정

**Input**:
- TASK 17, 18의 ML 모델

**Output**:
- ml/src/scheduler/Prediction_scheduler.py
- ml/scripts/run_predictions.py

**Constraints**:
- 일일 배치 예측 실행
- 모델 자동 로드

**Verification checklist**:
- [ ] 배치 예측 스케줄 실행 가능
- [ ] 예측 결과 자동 저장됨

---

## TASK 24: 통합 테스트 및 문서화

**Goal**: 전체 시스템 통합 테스트 및 최종 문서화

**Input**:
- 모든 이전 작업의 결과물

**Output**:
- README.md 업데이트
- API 문서
- 실행 가이드 문서

**Constraints**:
- 전체 시스템 실행 방법 문서화

**Verification checklist**:
- [ ] README 완성됨
- [ ] API 문서 생성됨
- [ ] 전체 시스템 통합 테스트 통과
