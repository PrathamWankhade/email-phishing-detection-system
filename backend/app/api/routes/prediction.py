import hashlib
import json
import re

from fastapi import APIRouter
from pydantic import BaseModel

from backend.app.services.openrouter_explainer import generate_ai_explanation
from backend.app.services.phishing_detector import detect_phishing
from backend.app.database.db import get_connection

router = APIRouter()


class PredictionRequest(BaseModel):
    email_text: str
    sender: str = ""


def sanitize_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)
    return text[:100000]


@router.post("/predict")
def predict_email(request: PredictionRequest):
    safe_text = sanitize_text(request.email_text)
    safe_sender = sanitize_text(request.sender)

    result = detect_phishing(safe_text, safe_sender)

    reasons = generate_ai_explanation(safe_text, safe_sender, result["label"], result["confidence"])
    if reasons:
        result["reasons"] = reasons

    email_hash = hashlib.md5(
        (safe_text.strip().lower() + safe_sender.strip().lower()).encode()
    ).hexdigest()

    result["email_hash"] = email_hash

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, scan_count FROM scan_history WHERE email_hash = ?", (email_hash,))
    existing = cursor.fetchone()

    reasons_json = json.dumps(reasons)

    if existing:
        cursor.execute("""
            UPDATE scan_history
            SET sender=?, prediction=?, confidence=?, risk_level=?, reasons=?,
                scan_count=scan_count+1, created_at=CURRENT_TIMESTAMP
            WHERE email_hash=?
        """, (safe_sender, result["label"], result["confidence"], result["risk_level"], reasons_json, email_hash))
    else:
        cursor.execute("""
            INSERT INTO scan_history (email_hash, sender, email_text, prediction, confidence, risk_level, reasons, scan_count)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        """, (email_hash, safe_sender, safe_text, result["label"], result["confidence"], result["risk_level"], reasons_json))

    conn.commit()
    conn.close()

    return result
