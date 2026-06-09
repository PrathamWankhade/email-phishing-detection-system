URGENCY_TERMS = {"urgent", "immediately", "limited", "expire", "suspended", "now", "warning"}


def detect_urgency(tokens: list[str]) -> int:
    return sum(token in URGENCY_TERMS for token in tokens)
