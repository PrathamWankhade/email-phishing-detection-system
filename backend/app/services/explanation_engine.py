def build_explanations(prediction: dict, url_analysis: dict, sender_analysis: dict) -> list[str]:
    reasons = list(prediction.get("reasons", []))
    if url_analysis["count"]:
        reasons.append(f"{url_analysis['count']} link(s) found in the email body")
    if url_analysis["suspicious_urls"]:
        reasons.append("Suspicious URL pattern detected")
    reasons.extend(sender_analysis.get("reasons", []))
    return list(dict.fromkeys(reasons)) or ["No strong phishing indicators found"]
