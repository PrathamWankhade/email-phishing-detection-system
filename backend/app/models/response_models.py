from pydantic import BaseModel


class EmailScanResponse(BaseModel):
    label: str
    confidence: int
    risk_level: str
    reasons: list[str]
    source: str = "backend-ai-engine"
