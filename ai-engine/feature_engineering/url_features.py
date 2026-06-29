import re
from urllib.parse import urlparse

SUSPICIOUS_TLDS = {"xyz", "top", "click", "zip", "ru", "cn", "tk", "ml", "ga", "cf", "gq", "loan", "work", "bid", "date", "men", "download", "review", "stream", "trade", "webcam"}
URL_SHORTENERS = {"bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "tiny.cc", "tr.im", "shorturl.at", "cut.ly", "rb.gy", "short.link", "cutt.ly", "shorte.st"}
PHISHING_PATTERNS = re.compile(r"(login|verify|secure|account|signin|update|confirm|banking|credential|authenticate|password|reset|paypal|apple|dropbox|office365|outlook|webmail|microsoft)", re.IGNORECASE)

HOMOGRAPH_CHARS = set("ɑаеéеооссррххијїąæçđęėįłøőœųūż")


def is_homograph(domain: str) -> bool:
    return any(c in HOMOGRAPH_CHARS for c in domain.lower())


def extract_url_features(text: str) -> dict:
    urls = re.findall(r"https?://[^\s)]+|www\.[^\s)]+", text, flags=re.IGNORECASE)
    suspicious_count = 0
    shortened_count = 0
    digit_domain_count = 0
    ip_url_count = 0
    homograph_count = 0
    phishing_keyword_count = 0

    for url in urls:
        normalized = url if url.startswith(("http://", "https://")) else f"http://{url}"
        parsed = urlparse(normalized)
        domain = parsed.netloc.lower()
        if domain.startswith("www."):
            domain = domain[4:]

        tld = domain.rsplit('.', 1)[-1] if '.' in domain else ""
        if tld in SUSPICIOUS_TLDS:
            suspicious_count += 1

        if domain in URL_SHORTENERS:
            shortened_count += 1

        if re.search(r"\d{2,}", domain.replace(".", "")):
            digit_domain_count += 1

        if re.match(r"^\d+\.\d+\.\d+\.\d+", domain):
            ip_url_count += 1

        if is_homograph(domain):
            homograph_count += 1

        if PHISHING_PATTERNS.search(domain):
            phishing_keyword_count += 1

    return {
        "url_count": len(urls),
        "suspicious_count": suspicious_count,
        "shortened_count": shortened_count,
        "digit_domain_count": digit_domain_count,
        "ip_url_count": ip_url_count,
        "homograph_count": homograph_count,
        "phishing_keyword_urls": phishing_keyword_count,
    }
