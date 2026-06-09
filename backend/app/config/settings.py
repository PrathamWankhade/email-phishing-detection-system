from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AI Phishing Detection System"
    api_prefix: str = "/api/v1"
    database_url: str = Field(default="sqlite:///./phishing_detection.db")
    model_path: str = "trained_models/phishing_model.pkl"
    tfidf_path: str = "trained_models/tfidf_vectorizer.pkl"


settings = Settings()
