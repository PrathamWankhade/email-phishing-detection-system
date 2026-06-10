from fastapi import APIRouter
import sqlite3
from pathlib import Path

router = APIRouter()

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parents[4]
)

DB_PATH = (
    BASE_DIR
    / "phishing_detection.db"
)

@router.get("/history")
def get_history():

    conn = sqlite3.connect(
        DB_PATH
    )

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            sender,
            prediction,
            confidence,
            risk_level,
            created_at
        FROM scan_history
        ORDER BY
            created_at DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    return [
        {
            "sender":
                row[0],

            "prediction":
                row[1],

            "confidence":
                row[2],

            "risk_level":
                row[3],

            "created_at":
                row[4],
        }
        for row in rows
    ]
