import pytest

fastapi = pytest.importorskip("fastapi")
pytest.importorskip("httpx")

from fastapi.testclient import TestClient
from backend.app.main import app


def test_predict_endpoint():
    client = TestClient(app)
    response = client.post(
        "/api/v1/predict",
        json={"email_text": "URGENT verify your password at https://login.example.xyz", "sender": "alert@example.xyz"},
    )
    assert response.status_code == 200
    assert response.json()["risk_level"] in {"medium", "high"}
