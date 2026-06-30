# Tests — Test Suite

Pytest test suite covering API endpoints, ML model accuracy, URL analysis, sender analysis, and prediction logic.

## Test Files

| File | Tests | Description |
|---|---|---|
| `test_api.py` | API integration | Tests `/api/v1/predict`, `/api/v1/dashboard`, `/api/v1/history`, `/health` |
| `test_prediction.py` | Classification | Tests label output, confidence range, risk level mapping |
| `test_url_analysis.py` | URL detection | Tests TLD blocklist, homograph detection, shortened URL flagging |
| `test_sender_analysis.py` | Sender validation | Tests domain blocklist, impersonation patterns, empty sender handling |
| `test_model_accuracy.py` | Model validation | Benchmarks accuracy against the 97% threshold |

## Running

```bash
# Activate virtual environment first
pytest tests/ -v
```

## Adding Tests

- Use pytest conventions (test functions prefixed with `test_`)
- API tests use `TestClient` from FastAPI
- URL/sender tests are pure unit tests with no database dependency
- Accuracy test loads the model and runs against the validation set
