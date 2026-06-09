PHISHING_KEYWORDS = {"urgent", "verify", "password", "otp", "bank", "suspended", "login", "payment", "immediately", "limited", "click", "account"}


def extract_keywords(tokens: list[str]) -> list[str]:
    return [token for token in tokens if token in PHISHING_KEYWORDS]
