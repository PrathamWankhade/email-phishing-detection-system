import re


def extract_url_features(text: str) -> dict[str, int]:
    urls = re.findall(r"https?://[^\s]+|www\.[^\s]+", text, flags=re.IGNORECASE)
    return {
        "url_count": len(urls),
        "shortened_count": sum(any(host in url.lower() for host in ["bit.ly", "tinyurl", "t.co"]) for url in urls),
        "digit_domain_count": sum(bool(re.search(r"https?://[^/]*\d", url.lower())) for url in urls),
    }
