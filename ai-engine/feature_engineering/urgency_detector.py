URGENCY_TERMS_HIGH = {
    "immediately", "urgent", "expires", "expired", "suspended",
    "blocked", "terminated", "limited", "deadline", "final warning",
    "within 24 hours", "within 48 hours", "act now", "as soon as possible",
    "immediate action required", "account will be closed",
    "your account has been", "violation", "security breach",
}

URGENCY_TERMS_MEDIUM = {
    "now", "warning", "alert", "important", "critical", "attention",
    "required", "overdue", "past due", "pending", "action needed",
    "time sensitive", "do not delay", "hurry", "last chance",
    "confirm immediately", "update required", "verify now",
}


def detect_urgency(text: str) -> dict:
    text_lower = text.lower()
    high_count = sum(1 for term in URGENCY_TERMS_HIGH if term in text_lower)
    medium_count = sum(1 for term in URGENCY_TERMS_MEDIUM if term in text_lower)

    severity = "none"
    if high_count >= 2 or (high_count >= 1 and medium_count >= 2):
        severity = "high"
    elif high_count >= 1 or medium_count >= 3:
        severity = "medium"
    elif medium_count >= 1:
        severity = "low"

    return {
        "high_urgency_count": high_count,
        "medium_urgency_count": medium_count,
        "severity": severity,
        "total_urgency_signals": high_count + medium_count,
    }
