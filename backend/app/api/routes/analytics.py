from fastapi import APIRouter
from backend.app.controllers.analytics_controller import get_summary

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/summary")
def summary() -> dict:
    return get_summary()
