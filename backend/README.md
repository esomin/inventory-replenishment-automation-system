# Backend Module

NestJS 기반 백엔드 API 서버.

## 설치

```bash
npm install
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=inventory_db
JWT_SECRET=your-secret-key
```

## 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run build
npm run start:prod
```

서버가 http://localhost:3000 에서 실행됩니다.

## 데이터베이스 마이그레이션

```bash
npm run migration:run
```
