from pathlib import Path
import joblib
import re

# ==========================================
# LOAD MODEL ONCE
# ==========================================

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parents[2]
)

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

print("Loading ML model...")

model = joblib.load(
    MODEL_PATH
)

vectorizer = joblib.load(
    VECTORIZER_PATH
)

print("Model loaded!")

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

def generate_reasons(
    email_text,
    sender,
):
    reasons = []

    text_lower = (
        email_text.lower()
    )

    matched = [
        term
        for term
        in suspicious_terms
        if term in text_lower
    ]

    for term in matched[:5]:
        reasons.append(
            f"Suspicious keyword detected: {term}"
        )

    url_count = len(
        re.findall(
            r"https?://|www\.",
            email_text
        )
    )

    if url_count:
        reasons.append(
            f"{url_count} suspicious link(s) detected"
        )

    if re.search(
        r"\.(xyz|ru|click|top|zip)$",
        sender.lower(),
    ):
        reasons.append(
            "Suspicious sender domain"
        )

    if not reasons:
        reasons.append(
            "No strong phishing indicators found"
        )

    return reasons

# ==========================================
# MAIN PREDICTION
# ==========================================

def predict_email(
    email_text: str,
    sender: str = ""
):

    text = (
        email_text
        + " "
        + sender
    )

    vectorized = (
        vectorizer.transform(
            [text]
        )
    )

    prediction = (
        model.predict(
            vectorized
        )[0]
    )

    probabilities = (
        model.predict_proba(
            vectorized
        )[0]
    )

    confidence = round(
        max(probabilities)
        * 100,
        2,
    )

    if confidence >= 75:
        risk_level = "high"
    elif confidence >= 50:
        risk_level = "medium"
    else:
        risk_level = "low"

    label = (
        "Phishing Email"
        if prediction
        == "phishing"
        else "Safe Email"
    )

    reasons = (
        generate_reasons(
            email_text,
            sender,
        )
    )

    return {
        "label":
            label,
        "prediction":
            prediction,
        "confidence":
            confidence,
        "risk_level":
            risk_level,
        "reasons":
            reasons,
        "source":
            "ml-model",
    }