import re

SUSPICIOUS_TLDS = {"xyz", "top", "click", "zip", "ru", "cn", "tk", "ml", "ga", "cf", "gq", "loan", "work", "bid", "date", "men", "download", "review", "stream", "trade", "webcam"}
IMPERSONATION_WORDS = ["security", "verify", "login", "support", "help", "account", "service", "team", "admin", "update", "confirm", "notification", "alert", "secure", "banking", "customercare", "helpdesk", "noreply", "donotreply"]
TRUSTED_DOMAINS = {"gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "protonmail.com", "aol.com", "zoho.com"}


def extract_sender_features(sender: str) -> dict:
    sender = (sender or "").lower().strip()
    match = re.search(r"@([a-z0-9.-]+)", sender)
    domain = match.group(1) if match else ""
    tld = domain.rsplit('.', 1)[-1] if '.' in domain else ""
    local_part = sender.split("@")[0] if "@" in sender else ""

    has_suspicious_tld = 1 if tld in SUSPICIOUS_TLDS else 0
    contains_security_words = 1 if any(w in domain for w in IMPERSONATION_WORDS) else 0
    domain_trusted = 1 if any(sender.endswith(f"@{d}") for d in TRUSTED_DOMAINS) else 0

    impersonation_risk = 0
    if not domain_trusted:
        for trusted in TRUSTED_DOMAINS:
            base = trusted.split(".")[0]
            if base in domain and not sender.endswith(f"@{trusted}"):
                impersonation_risk = 1
                break

    suspicious_pattern = 1 if (local_part and re.search(r"(admin|support|service|help|info|contact|team|noreply)", local_part) and has_suspicious_tld) else 0
    excessive_subdomains = 1 if domain.count(".") >= 3 else 0

    risk_score = 0
    if has_suspicious_tld:
        risk_score += 15
    if contains_security_words:
        risk_score += 10
    if impersonation_risk:
        risk_score += 10
    if suspicious_pattern:
        risk_score += 5
    if excessive_subdomains:
        risk_score += 5

    return {
        "has_suspicious_tld": has_suspicious_tld,
        "contains_security_words": contains_security_words,
        "domain_trusted": domain_trusted,
        "impersonation_risk": impersonation_risk,
        "suspicious_pattern": suspicious_pattern,
        "excessive_subdomains": excessive_subdomains,
        "risk_score": risk_score,
        "domain": domain,
    }
