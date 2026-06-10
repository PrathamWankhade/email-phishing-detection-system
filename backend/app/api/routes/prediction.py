from pathlib import Path
import sqlite3
import hashlib
import joblib

from fastapi import APIRouter
from pydantic import BaseModel

from backend.app.services.gemini_explainer import (
    generate_ai_explanation
)

router = APIRouter()

# ==========================================
# PATHS
# ==========================================

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parents[4]
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

DB_PATH = (
    BASE_DIR
    / "phishing_detection.db"
)

# ==========================================
# LOAD MODEL
# ==========================================

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
# DATABASE INIT
# ==========================================

def initialize_database():

    conn = sqlite3.connect(
        DB_PATH
    )

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS
        scan_history (
            id INTEGER
            PRIMARY KEY AUTOINCREMENT,

            email_hash TEXT
            UNIQUE,

            sender TEXT,

            prediction TEXT,

            confidence REAL,

            risk_level TEXT,

            created_at TIMESTAMP
            DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


initialize_database()

# ==========================================
# PREDICT ROUTE
# ==========================================

@router.post("/predict")
def predict_email(
    request: PredictionRequest
):

    # ======================
    # COMBINE TEXT
    # ======================

    text = (
        request.email_text
        + " "
        + request.sender
    )

    # ======================
    # VECTORIZE
    # ======================

    vectorized = (
        vectorizer.transform(
            [text]
        )
    )

    # ======================
    # MODEL PREDICTION
    # ======================

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

    label = (
        "Phishing Email"
        if prediction
        == "phishing"
        else "Safe Email"
    )

    # ======================
    # RISK LEVEL
    # ======================

    risk_level = (
        "high"
        if confidence >= 75
        else "medium"
        if confidence >= 50
        else "low"
    )

    # ======================
    # GEMINI EXPLANATION
    # ======================

    reasons = (
        generate_ai_explanation(
            request.email_text,
            request.sender,
            label,
            confidence
        )
    )

    # fallback if Gemini fails
    if not reasons:

        reasons = [
            "AI explanation unavailable."
        ]

    # ======================
    # RESPONSE RESULT
    # ======================

    result = {
        "label":
            label,

        "confidence":
            confidence,

        "risk_level":
            risk_level,

        "reasons":
            reasons,
    }

    # ======================
    # CREATE HASH
    # ======================

    email_hash = hashlib.md5(
        (
            request.email_text
            .strip()
            .lower()
            +
            request.sender
            .strip()
            .lower()
        ).encode()
    ).hexdigest()

    conn = sqlite3.connect(
        DB_PATH
    )

    cursor = conn.cursor()

    # ======================
    # CHECK EXISTING ENTRY
    # ======================

    cursor.execute("""
        SELECT id
        FROM scan_history
        WHERE email_hash = ?
    """, (
        email_hash,
    ))

    existing = (
        cursor.fetchone()
    )

    # ======================
    # UPDATE EXISTING SCAN
    # ======================

    if existing:

        cursor.execute("""
            UPDATE scan_history
            SET
                sender = ?,
                prediction = ?,
                confidence = ?,
                risk_level = ?,
                created_at =
                    CURRENT_TIMESTAMP
            WHERE
                email_hash = ?
        """, (
            request.sender,
            label,
            confidence,
            risk_level,
            email_hash,
        ))

    # ======================
    # INSERT NEW SCAN
    # ======================

    else:

        cursor.execute("""
            INSERT INTO
            scan_history (
                email_hash,
                sender,
                prediction,
                confidence,
                risk_level
            )
            VALUES (?, ?, ?, ?, ?)
        """, (
            email_hash,
            request.sender,
            label,
            confidence,
            risk_level,
        ))

    conn.commit()
    conn.close()

    return result