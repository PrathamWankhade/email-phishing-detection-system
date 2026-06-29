def build_explanations(prediction: dict, url_analysis: dict, sender_analysis: dict) -> list[str]:
    reasons = list(prediction.get("reasons", []))

    if url_analysis.get("details"):
        reasons.extend(url_analysis["details"])
    elif url_analysis["count"]:
        reasons.append(f"{url_analysis['count']} link(s) found in the email body")

    reasons.extend(sender_analysis.get("reasons", []))

    seen = set()
    unique = []
    for r in reasons:
        if r not in seen:
            seen.add(r)
            unique.append(r)

    return unique or ["No strong phishing indicators found"]
