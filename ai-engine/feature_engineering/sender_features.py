def extract_sender_features(sender: str) -> dict[str, int]:
    sender = (sender or "").lower()
    return {
        "has_suspicious_tld": int(sender.endswith((".xyz", ".top", ".click", ".zip", ".ru"))),
        "contains_security_words": int(any(word in sender for word in ["verify", "security", "alert", "login"])),
    }
