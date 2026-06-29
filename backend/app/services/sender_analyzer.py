import re

SUSPICIOUS_TLDS = {"xyz", "top", "click", "zip", "ru", "cn", "tk", "ml", "ga", "cf", "gq", "loan", "work", "bid", "date", "men", "download", "review", "stream", "trade", "webcam"}
IMPERSONATION_WORDS = ["security-alert", "verify", "login", "support-", "help-desk", "no-reply", "donotreply", "account", "service", "team", "admin", "update", "confirm", "notification", "alert", "secure", "banking", "customercare"]
TRUSTED_DOMAINS = {"gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "protonmail.com", "aol.com", "mail.com", "zoho.com", "yandex.com", "github.com", "gitlab.com", "bitbucket.org", "slack.com", "discord.com", "teams.microsoft.com", "zoom.us", "notion.so", "figma.com", "miro.com", "atlassian.net", "asana.com", "trello.com", "google.com", "microsoft.com", "apple.com", "amazon.com", "netflix.com", "spotify.com", "linkedin.com", "twitter.com", "facebook.com", "instagram.com", "reddit.com"}


def analyze_sender(sender: str | None) -> dict:
    sender = (sender or "").lower().strip()
    match = re.search(r"@([a-z0-9.-]+)", sender)
    domain = match.group(1) if match else ""
    tld = domain.rsplit('.', 1)[-1] if '.' in domain else ""
    local_part = sender.split("@")[0] if "@" in sender else ""

    reasons = []
    risk = 0

    if tld in SUSPICIOUS_TLDS:
        reasons.append("Sender uses a suspicious top-level domain")
        risk += 10

    matched_words = [w for w in IMPERSONATION_WORDS if w in domain]
    if matched_words:
        reasons.append(f"Sender domain contains impersonation keywords: {', '.join(matched_words[:3])}")
        risk += 10

    trusted_base = any(sender.endswith(f"@{d}") for d in TRUSTED_DOMAINS)
    if not trusted_base and tld not in SUSPICIOUS_TLDS:
        for trusted in TRUSTED_DOMAINS:
            base = trusted.split(".")[0]
            if domain != trusted and domain.endswith("." + trusted):
                reasons.append(f"Possible domain impersonation: {domain} looks like {trusted}")
                risk += 8
                break

    if local_part and re.search(r"(admin|support|service|help|info|contact|team|noreply|donotreply)", local_part) and tld in SUSPICIOUS_TLDS:
        reasons.append(f"Suspicious sender pattern: '{local_part}@{domain}' mimics a legitimate address")
        risk += 5

    if domain.count(".") >= 3:
        reasons.append(f"Excessive subdomains in sender domain: {domain}")
        risk += 5

    return {
        "sender": sender,
        "domain": domain,
        "risk": min(30, risk),
        "reasons": reasons,
    }
