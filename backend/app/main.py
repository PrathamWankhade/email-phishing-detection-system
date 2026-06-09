from fastapi import FastAPI
from fastapi.middleware.cors import (
    CORSMiddleware,
)

from backend.app.api.router import (
    api_router,
)

from backend.app.api.routes.history import (
    router as history_router,
)

from backend.app.api.routes.dashboard import (
    router as dashboard_router,
)

from backend.app.config.constants import (
    API_PREFIX,
)

from backend.app.database.db import (
    init_db,
)

# FastAPI App
app = FastAPI(
    title="AI Phishing Detection API",
    version="1.0.0",
    description="AI-powered phishing email detection system using Machine Learning, NLP, FastAPI and SQLite",
)


# Initialize SQLite Database
@app.on_event("startup")
def startup():
    init_db()
    print(
        "✅ SQLite database initialized"
    )


# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root Route
@app.get("/")
def root():
    return {
        "message":
            "AI Phishing Detection API Running",
        "docs":
            "/docs",
        "version":
            "1.0.0",
        "dashboard":
            "/api/v1/dashboard",
    }


# Health Check Route
@app.get("/health")
def health():
    return {
        "status":
            "healthy",
        "service":
            "phishing-detection-api",
    }


# Main API Routes
app.include_router(
    api_router,
    prefix=API_PREFIX,
)


# Scan History Route
app.include_router(
    history_router,
    prefix=API_PREFIX,
)


# Dashboard Analytics Route
app.include_router(
    dashboard_router,
    prefix=API_PREFIX,
)