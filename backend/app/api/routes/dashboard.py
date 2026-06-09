from fastapi import APIRouter
from backend.app.database.models import (
    get_scan_history,
)

router = APIRouter()


@router.get("/dashboard")
def dashboard():
    history = get_scan_history()

    total_scans = len(history)

    phishing_count = len([
        item
        for item in history
        if item["prediction"]
        == "phishing"
    ])

    safe_count = len([
        item
        for item in history
        if item["prediction"]
        == "legitimate"
    ])

    avg_confidence = (
        round(
            sum(
                item["confidence"]
                for item in history
            )
            / total_scans,
            1,
        )
        if total_scans > 0
        else 0
    )

    risk_levels = {
        "high": 0,
        "medium": 0,
        "low": 0,
    }

    for item in history:
        risk_levels[
            item["risk_level"]
        ] += 1

    return {
        "total_scans":
            total_scans,
        "phishing_count":
            phishing_count,
        "safe_count":
            safe_count,
        "avg_confidence":
            avg_confidence,
        "risk_levels":
            risk_levels,
    }