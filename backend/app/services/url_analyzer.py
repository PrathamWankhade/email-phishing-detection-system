import re
from urllib.parse import urlparse

SUSPICIOUS_TLDS = {"xyz", "top", "click", "zip", "ru", "cn", "tk", "ml", "ga", "cf", "gq", "loan", "work", "bid", "date", "men", "download", "review", "stream", "trade", "webcam"}
URL_SHORTENERS = {"bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "tiny.cc", "tr.im", "shorturl.at", "cut.ly", "rb.gy", "short.link", "click", "b.link", "cutt.ly", "shorte.st", "adf.ly", "bc.vc"}
PHISHING_PATTERNS = re.compile(r"(credential|authenticate|reset-password|secure-login|banking-verify)", re.IGNORECASE)


def is_homograph(domain: str) -> bool:
    latin_chars = set("abcdefghijklmnopqrstuvwxyz.-")
    non_latin = sum(1 for c in domain.lower() if c not in latin_chars)
    return non_latin > 0


def analyze_urls(text: str) -> dict:
    urls = re.findall(r"https?://[^\s)]+|www\.[^\s)]+", text, flags=re.IGNORECASE)
    suspicious = []
    details = []

    for url in urls:
        normalized = url if url.startswith(("http://", "https://")) else f"http://{url}"
        parsed = urlparse(normalized)
        domain = parsed.netloc.lower()

        if domain.startswith("www."):
            domain = domain[4:]

        tld = domain.rsplit('.', 1)[-1] if '.' in domain else ""
        is_suspicious = False

        if tld in SUSPICIOUS_TLDS:
            suspicious.append(url)
            details.append(f"Suspicious TLD (.{tld}) in {url}")
            is_suspicious = True

        if re.search(r"\d{2,}", domain.replace(".", "")):
            suspicious.append(url)
            details.append(f"Domain with excessive digits: {domain}")
            is_suspicious = True

        if is_homograph(domain):
            suspicious.append(url)
            details.append(f"Homograph attack detected in domain: {domain}")
            is_suspicious = True

        if PHISHING_PATTERNS.search(domain):
            suspicious.append(url)
            details.append(f"Phishing-related keywords in domain: {domain}")
            is_suspicious = True

        if domain in URL_SHORTENERS:
            suspicious.append(url)
            details.append(f"URL shortener detected: {domain}")
            is_suspicious = True

        if re.match(r"^\d+\.\d+\.\d+\.\d+", domain):
            suspicious.append(url)
            details.append(f"IP-based URL (bypasses domain filtering): {url}")
            is_suspicious = True

        if domain.count(".") >= 3:
            suspicious.append(url)
            details.append(f"Excessive subdomains in {domain}")
            is_suspicious = True

    return {
        "urls": urls,
        "count": len(urls),
        "suspicious_urls": list(set(suspicious)),
        "details": details,
    }
