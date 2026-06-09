import sys
from pathlib import Path

ENGINE_PATH = Path(__file__).resolve().parents[3] / "ai-engine"
if str(ENGINE_PATH) not in sys.path:
    sys.path.insert(0, str(ENGINE_PATH))

from inference.predict import predict_email  # noqa: E402
from backend.app.services.explanation_engine import build_explanations
from backend.app.services.sender_analyzer import analyze_sender
from backend.app.services.url_analyzer import analyze_urls


def detect_phishing(email_text: str, sender: str = "") -> dict:
    prediction = predict_email(email_text, sender)
    url_analysis = analyze_urls(email_text)
    sender_analysis = analyze_sender(sender)
    confidence = min(99, prediction["confidence"] + len(url_analysis["suspicious_urls"]) * 8 + sender_analysis["risk"])
    risk_level = "high" if confidence >= 70 else "medium" if confidence >= 40 else "low"
    label = "Phishing Email" if risk_level == "high" else "Suspicious Email" if risk_level == "medium" else "Safe Email"
    return {
        "label": label,
        "confidence": confidence,
        "risk_level": risk_level,
        "reasons": build_explanations(prediction, url_analysis, sender_analysis),
    }
