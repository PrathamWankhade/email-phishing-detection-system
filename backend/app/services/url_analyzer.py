import re
from urllib.parse import urlparse

SUSPICIOUS_TLDS = {"xyz", "top", "click", "zip", "ru", "cn"}


def analyze_urls(text: str) -> dict:
    urls = re.findall(r"https?://[^\s)]+|www\.[^\s)]+", text, flags=re.IGNORECASE)
    suspicious = []
    for url in urls:
        normalized = url if url.startswith(("http://", "https://")) else f"http://{url}"
        parsed = urlparse(normalized)
        domain = parsed.netloc.lower()
        tld = domain.rsplit('.', 1)[-1] if '.' in domain else ''
        if tld in SUSPICIOUS_TLDS or re.search(r"\d|login|verify|secure|account", domain):
            suspicious.append(url)
    return {"urls": urls, "count": len(urls), "suspicious_urls": suspicious}
