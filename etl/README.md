# ETL Module

Python 기반 ETL 파이프라인. Raw → Staging → Mart 데이터 변환 및 Feature 생성.

## 설치

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=inventory_db
```

## 실행

```bash
# 가짜 데이터 생성
python scripts/generate_fake_data.py

# ETL 파이프라인 실행
python scripts/run_etl.py
```
