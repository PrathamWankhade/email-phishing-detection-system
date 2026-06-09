from pydantic import BaseModel, Field


class EmailScanRequest(BaseModel):
    email_text: str = Field(..., min_length=10, description="Subject and body of the email to scan")
    sender: str | None = Field(default="", description="Optional sender email address")
