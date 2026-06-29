import sys
from pathlib import Path

ENGINE_PATH = Path(__file__).resolve().parents[3] / "ai-engine"
if str(ENGINE_PATH) not in sys.path:
    sys.path.insert(0, str(ENGINE_PATH))

from inference.predict import predict_email
from backend.app.services.explanation_engine import build_explanations
from backend.app.services.sender_analyzer import analyze_sender
from backend.app.services.url_analyzer import analyze_urls


def detect_phishing(email_text: str, sender: str = "") -> dict:
    prediction = predict_email(email_text, sender)
    url_analysis = analyze_urls(email_text)
    sender_analysis = analyze_sender(sender)

    url_risk = min(20, len(url_analysis["suspicious_urls"]) * 4)
    sender_risk = sender_analysis["risk"]
    confidence = min(99, prediction["confidence"] + url_risk + sender_risk)

    risk_level = "high" if confidence >= 75 else "medium" if confidence >= 45 else "low"
    label = "Phishing Email" if risk_level == "high" else "Suspicious Email" if risk_level == "medium" else "Safe Email"

    result = {
        "label": label,
        "prediction": prediction["prediction"],
        "confidence": confidence,
        "risk_level": risk_level,
        "reasons": build_explanations(prediction, url_analysis, sender_analysis),
        "source": "backend-ai-engine",
    }

    return result
