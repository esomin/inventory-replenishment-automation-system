# Requirements: AI 재고·수요 예측 운영툴

## 1. 데이터 수집 및 처리 (Data Processing)
- **REQ-1.1**: **WHEN** 주문, 재고, 상품, 프로모션 데이터가 생성되면, **THE SYSTEM SHALL** 이를 수집하여 Raw 데이터로 저장해야 한다.
- **REQ-1.2**: **THE SYSTEM SHALL** 저장된 데이터를 일별/주별로 집계하여 Mart 테이블로 변환해야 한다.
- **REQ-1.3**: **THE SYSTEM SHALL** 요일, 시즌, 가격 변동, 할인율, 반품률 등의 Feature를 자동으로 계산해야 한다.

## 2. 수요 예측 및 이상 탐지 (AI & Forecasting)
- **REQ-2.1**: **THE SYSTEM SHALL** XGBoost 또는 LightGBM 모델을 사용하여 각 SKU별 향후 7일, 14일, 30일간의 수요를 예측해야 한다.
- **REQ-2.2**: **WHEN** 판매량이 급증/급감하거나 반품률이 폭증하는 경우, **THE SYSTEM SHALL** 이를 이상 징후로 탐지해야 한다.
- **REQ-2.3**: **THE SYSTEM SHALL** 예측 결과에 대한 설명(Feature Importance 또는 Rule-based)을 제공해야 한다.

## 3. 발주 관리 및 추천 (Order Management)
- **REQ-3.1**: **THE SYSTEM SHALL** 수요 예측을 기반으로 재고 소진 예상일과 발주 추천 수량을 계산해야 한다.
- **REQ-3.2**: **WHEN** 품절 위험이 감지되면, **THE SYSTEM SHALL** 해당 SKU를 "품절 위험 TOP" 리스트에 강조 표시해야 한다.
- **REQ-3.3**: **THE SYSTEM SHALL** 발주안 생성, 승인, 반려, 완료의 워크플로우 상태를 관리해야 한다.

## 4. 관리자 기능 및 UI (Admin & Interface)
- **REQ-4.1**: **THE SYSTEM SHALL** 주요 지표(KPI)와 알림 설정을 관리할 수 있는 대시보드를 제공해야 한다.
- **REQ-4.2**: **THE SYSTEM SHALL** 사용자가 SKU 코드를 검색하거나 품절 위험도, 카테고리별로 필터링 및 정렬할 수 있게 해야 한다.
- **REQ-4.3**: **THE SYSTEM SHALL** 운영자, 매니저, 관리자 등 역할 기반 접근 제어(RBAC)를 수행해야 한다.
- **REQ-4.4**: **WHEN** 중요한 시스템 작업이 발생하면, **THE SYSTEM SHALL** 이를 감사 로그(Audit Log)에 기록해야 한다.
