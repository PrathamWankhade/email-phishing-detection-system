from fastapi import APIRouter
from backend.app.api.routes import analytics, health, prediction, upload

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(prediction.router)
api_router.include_router(upload.router)
api_router.include_router(analytics.router)
