PHISHING_KEYWORDS = {
    "urgent", "verify", "password", "otp", "bank", "suspended",
    "click", "login", "payment", "limited", "account", "immediately",
    "security", "update", "confirm", "restricted", "blocked",
    "unauthorized", "unusual activity", "alert", "warning",
    "compromised", "required", "attention", "action required",
    "reactivate", "deactivate", "credit card", "debit card",
    "ssn", "social security", "routing number", "wire transfer",
    "western union", "money gram", "gift card", "cryptocurrency",
    "bitcoin", "investment", "guaranteed", "prize", "winner",
    "lottery", "inheritance", "donation", "charity", "funds",
    "overdue", "past due", "invoice", "statement", "confidential",
    "internal", "exclusive", "limited time", "expires", "expiration",
    "valid until", "noreply", "do not reply", "click here",
    "open attachment", "download now", "free", "congratulations",
    "selected", "you won", "claim now", "microsoft", "paypal",
    "apple", "amazon", "netflix", "google", "dropbox", "office 365",
}


def extract_keywords(text: str) -> list:
    text_lower = text.lower()
    found = []
    for keyword in PHISHING_KEYWORDS:
        if keyword in text_lower:
            found.append(keyword)
    return found
