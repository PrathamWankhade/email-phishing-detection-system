import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "ai-engine"))

from inference.predict import predict_email


def test_phishing_email_gets_high_risk():
    result = predict_email(
        "URGENT click https://secure-login.example.xyz to verify your password and OTP immediately",
        "support@security-alert.xyz",
    )
    assert result["risk_level"] == "high"
    assert result["confidence"] >= 70
