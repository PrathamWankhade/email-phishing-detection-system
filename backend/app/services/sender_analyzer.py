import re

SUSPICIOUS_TLDS = {"xyz", "top", "click", "zip", "ru", "cn"}


def analyze_sender(sender: str | None) -> dict:
    sender = (sender or "").lower().strip()
    match = re.search(r"@([a-z0-9.-]+)", sender)
    domain = match.group(1) if match else ""
    tld = domain.rsplit('.', 1)[-1] if '.' in domain else ""
    reasons = []
    if tld in SUSPICIOUS_TLDS:
        reasons.append("Sender uses a suspicious top-level domain")
    if any(word in domain for word in ["security-alert", "verify", "login", "support-"]):
        reasons.append("Sender domain contains impersonation-style security words")
    return {"sender": sender, "domain": domain, "risk": min(30, 15 * len(reasons)), "reasons": reasons}
