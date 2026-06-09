import re
from html import unescape


def clean_text(text: str) -> str:
    text = unescape(text or "").lower()
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[^a-z0-9:/@._-]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()
