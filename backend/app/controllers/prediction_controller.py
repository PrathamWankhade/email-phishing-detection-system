from backend.app.models.request_models import EmailScanRequest
from backend.app.models.response_models import EmailScanResponse
from backend.app.services.phishing_detector import detect_phishing
from backend.app.utils.validators import normalize_sender


def scan_email(request: EmailScanRequest) -> EmailScanResponse:
    result = detect_phishing(request.email_text, normalize_sender(request.sender))
    return EmailScanResponse(**result)
