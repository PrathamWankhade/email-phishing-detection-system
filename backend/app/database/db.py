import os
import sqlite3

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

DB_NAME = os.path.join(BASE_DIR, "phishing_detection.db")
_db_initialized = False


def get_connection():
    global _db_initialized
    if not _db_initialized:
        init_db()
        _db_initialized = True
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS scan_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email_hash TEXT UNIQUE,
        sender TEXT,
        email_text TEXT,
        prediction TEXT,
        confidence REAL,
        risk_level TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()
    conn.close()
