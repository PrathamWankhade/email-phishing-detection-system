import joblib
from pathlib import Path

from backend.app.database.models import (
    save_scan,
)

BASE_DIR = Path(__file__).resolve().parents[3]

MODEL_PATH = BASE_DIR / "trained_models" / "phishing_model.pkl"
VECTORIZER_PATH = BASE_DIR / "trained_models" / "tfidf_vectorizer.pkl"

# Load trained model
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(
    VECTORIZER_PATH
)


def predict_email(
    email_text: str,
    sender: str = "",
    url: str = "",
):
    # Convert text to vector
    text_vector = (
        vectorizer.transform(
            [email_text]
        )
    )

    # Predict
    prediction = (
        model.predict(
            text_vector
        )[0]
    )

    probabilities = (
        model.predict_proba(
            text_vector
        )[0]
    )

    confidence = int(
        max(probabilities) * 100
    )

    # Risk level
    if confidence >= 75:
        risk_level = "high"
    elif confidence >= 45:
        risk_level = "medium"
    else:
        risk_level = "low"

    # Friendly label
    label = (
        "Phishing Email"
        if prediction == "phishing"
        else "Safe Email"
    )

    reasons = []

    suspicious_words = [
        "urgent",
        "verify",
        "password",
        "otp",
        "bank",
        "click",
        "login",
        "payment",
        "suspended",
    ]

    lower_text = (
        email_text.lower()
    )

    for word in suspicious_words:
        if word in lower_text:
            reasons.append(
                f"Suspicious keyword detected: {word}"
            )

    if (
        "http://" in email_text
        or "https://" in email_text
    ):
        reasons.append(
            "URL found in email body"
        )

    result = {
        "label": label,
        "prediction": prediction,
        "confidence": confidence,
        "risk_level": risk_level,
        "reasons": reasons,
        "source": "ml-model",
    }

    # Save to SQLite
    save_scan(
        sender=sender,
        email_text=email_text,
        url=url,
        prediction=prediction,
        confidence=confidence,
        risk_level=risk_level,
    )

    return result