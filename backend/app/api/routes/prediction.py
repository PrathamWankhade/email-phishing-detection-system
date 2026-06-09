from pathlib import Path
import joblib
import re

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# ==========================================
# LOAD MODEL
# ==========================================

BASE_DIR = Path(__file__).resolve().parents[4]

MODEL_PATH = (
    BASE_DIR
    / "ai-engine"
    / "models"
    / "phishing_model.pkl"
)

VECTORIZER_PATH = (
    BASE_DIR
    / "ai-engine"
    / "models"
    / "vectorizer.pkl"
)

model = joblib.load(
    MODEL_PATH
)

vectorizer = joblib.load(
    VECTORIZER_PATH
)

print("ML model loaded!")

# ==========================================
# REQUEST MODEL
# ==========================================

class PredictionRequest(
    BaseModel
):
    email_text: str
    sender: str = ""

# ==========================================
# HELPER
# ==========================================

suspicious_terms = [
    "urgent",
    "verify",
    "password",
    "otp",
    "bank",
    "suspended",
    "click",
    "login",
    "payment",
    "limited",
]

def analyze_reasons(
    email_text,
    sender,
):
    reasons = []

    lower = email_text.lower()

    matched = [
        term
        for term in suspicious_terms
        if term in lower
    ]

    for term in matched[:5]:
        reasons.append(
            f"Suspicious keyword detected: {term}"
        )

    url_count = len(
        re.findall(
            r"https?://|www\.",
            email_text,
        )
    )

    if url_count:
        reasons.append(
            f"{url_count} suspicious link(s) found"
        )

    if re.search(
        r"\.(xyz|top|click|zip|ru)\b",
        sender.lower(),
    ):
        reasons.append(
            "Suspicious sender domain detected"
        )

    if not reasons:
        reasons.append(
            "No strong phishing indicators found"
        )

    return reasons

# ==========================================
# PREDICT ROUTE
# ==========================================

@router.post("/predict")
def predict_email(
    request: PredictionRequest
):

    text = (
        request.email_text
        + " "
        + request.sender
    )

    vectorized = (
        vectorizer.transform(
            [text]
        )
    )

    prediction = model.predict(
        vectorized
    )[0]

    probabilities = (
        model.predict_proba(
            vectorized
        )[0]
    )

    confidence = round(
        max(probabilities) * 100,
        2,
    )

    risk_level = (
        "high"
        if confidence >= 75
        else "medium"
        if confidence >= 50
        else "low"
    )

    return {
        "label":
            "Phishing Email"
            if prediction
            == "phishing"
            else "Safe Email",

        "confidence":
            confidence,

        "risk_level":
            risk_level,

        "reasons":
            analyze_reasons(
                request.email_text,
                request.sender,
            ),
    }