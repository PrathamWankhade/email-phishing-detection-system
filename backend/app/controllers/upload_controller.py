from backend.app.utils.email_parser import parse_raw_email


def parse_uploaded_email(raw_email: str) -> dict[str, str]:
    return parse_raw_email(raw_email)
