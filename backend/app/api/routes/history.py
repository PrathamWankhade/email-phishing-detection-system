from fastapi import APIRouter
from backend.app.database.models import get_scan_history

router = APIRouter()


@router.get("/history")
def get_history():
    results = get_scan_history()
    return [
        {
            "sender": row.get("sender", ""),
            "prediction": row.get("prediction", ""),
            "confidence": row.get("confidence", 0),
            "risk_level": row.get("risk_level", "low"),
            "created_at": row.get("created_at", ""),
        }
        for row in results
    ]
