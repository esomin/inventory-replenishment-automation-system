# ML Module

Python 기반 머신러닝 모델. 수요 예측 및 이상탐지.

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
# 모델 학습
python scripts/train_model.py

# 예측 실행
python scripts/predict.py

# 이상탐지 실행
python scripts/detect_anomalies.py
```
