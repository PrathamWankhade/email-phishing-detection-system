from fastapi import APIRouter, UploadFile
from backend.app.controllers.upload_controller import parse_uploaded_email

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("")
async def upload_email(file: UploadFile) -> dict:
    content = (await file.read()).decode("utf-8", errors="ignore")
    return parse_uploaded_email(content)
