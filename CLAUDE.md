# CLAUDE.md

Claude Code 작업 지침입니다. 프로젝트 설명은 README.md를 참조하세요.

## Quick Commands

```bash
# Database
docker-compose up -d
cd backend && npm run migration:run

# Backend
cd backend && npm run start:dev
cd backend && npm test

# Frontend
cd frontend && npm start

# ETL
cd etl && source venv/bin/activate && python scripts/run_etl.py

# ML
cd ml && source venv/bin/activate && python scripts/train_model.py
```

## Code Conventions

### Backend (NestJS)

- 모든 엔티티는 `BaseEntity`를 상속 (id, created_at, updated_at, deleted_at)
- Soft delete 사용: `deleted_at` 필드로 논리 삭제
- 모듈 구조: `config/`, `database/`, `entities/`, `auth/`, `sku/`, `predictions/`, `purchase-orders/`, `notifications/`, `audit-logs/`

### Database

핵심 인덱스:
- `idx_orders_sku_date`: SKU + order_date
- `idx_sku_daily_stats_sku_date`: SKU + stat_date
- `idx_predictions_sku_target`: SKU + target_date + horizon_days

유니크 제약:
- `ux_inventory_sku_location_date`: SKU/location/date 당 하나
- `ux_sku_daily_stats_sku_date`: SKU/date 당 하나

### Enums

**Purchase Order Status**: `DRAFT` → `PENDING` → `APPROVED`/`REJECTED` → `COMPLETED`

**User Roles**:
- `OPERATOR`: 발주 생성/조회
- `MANAGER`: 발주 승인
- `ADMIN`: 전체 권한

**Anomaly Types**: `SALES_SPIKE`, `SALES_DROP`, `RETURN_SURGE`, `INVENTORY_ANOMALY`

## Execution Protocol

이 저장소는 단계별 실행 프로토콜을 사용합니다:

1. **PHASE 0: SPEC** - 요구사항 명확화 (종료: "SPEC CONFIRMED")
2. **PHASE 1: PLAN** - 실행 계획 작성 (종료: "PLAN APPROVED")
3. **PHASE 2: EXECUTION** - 태스크 순차 실행
4. **PHASE 3: REVIEW** - 일관성 검증
5. **PHASE 4: DONE** - 요약

상세 규칙은 `.agent/rules/RULE.md` 참조.

## File References

| 파일 | 설명 |
|------|------|
| `plan/plan.md` | 개발 태스크 목록 |
| `backend/docs/SCHEMA.md` | DB 스키마 문서 |
| `migrations/001_init_schema.sql` | 초기 마이그레이션 |
| `.agent/rules/RULE.md` | 실행 프로토콜 상세 |
