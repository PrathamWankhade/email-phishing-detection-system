import json
from fastapi import APIRouter
from backend.app.database.models import get_scan_history

router = APIRouter()


@router.get("/history")
def get_history():
    results = get_scan_history()
    return [
        {
            "id": row.get("id"),
            "sender": row.get("sender", ""),
            "prediction": row.get("prediction", ""),
            "confidence": row.get("confidence", 0),
            "risk_level": row.get("risk_level", "low"),
            "reasons": json.loads(row["reasons"]) if row.get("reasons") else [],
            "scan_count": row.get("scan_count", 1),
            "created_at": row.get("created_at", ""),
        }
        for row in results
    ]
