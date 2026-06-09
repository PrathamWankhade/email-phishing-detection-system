from backend.app.database.db import get_connection


def save_scan(
    sender,
    email_text,
    url,
    prediction,
    confidence,
    risk_level
):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO scan_history (
            sender,
            email_text,
            url,
            prediction,
            confidence,
            risk_level
        )
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        sender,
        email_text,
        url,
        prediction,
        confidence,
        risk_level
    ))

    conn.commit()
    conn.close()


def get_scan_history():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM scan_history
        ORDER BY created_at DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]