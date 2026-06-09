from backend.app.services.url_analyzer import analyze_urls


def test_url_analyzer_finds_suspicious_url():
    result = analyze_urls("Click https://paypa1-security-login.xyz immediately")
    assert result["count"] == 1
    assert result["suspicious_urls"]
