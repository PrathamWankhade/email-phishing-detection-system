from backend.app.services.url_analyzer import analyze_urls


def test_url_analyzer_finds_suspicious_url():
    result = analyze_urls("Click https://paypa1-security-login.xyz immediately")
    assert result["count"] == 1
    assert len(result["suspicious_urls"]) > 0


def test_homograph_detection():
    result = analyze_urls("Visit https://раураl.com/login")  # Cyrillic 'а'
    assert len(result["suspicious_urls"]) > 0
    assert any("homograph" in d.lower() for d in result["details"])


def test_shortened_url():
    result = analyze_urls("Click https://bit.ly/3xyzabc for details")
    assert len(result["suspicious_urls"]) > 0


def test_ip_based_url():
    result = analyze_urls("Visit http://192.168.1.1/admin")
    assert any("IP-based" in d for d in result["details"])


def test_excessive_subdomains():
    result = analyze_urls("Visit https://secure.login.verify.account.bank.xyz")
    assert any("subdomain" in d.lower() for d in result["details"])


def test_clean_url_no_flags():
    result = analyze_urls("Visit https://github.com for code")
    assert len(result["suspicious_urls"]) == 0


def test_multiple_urls():
    result = analyze_urls("Link1: https://phish.xyz Link2: https://safe.com Link3: http://evil.top")
    assert result["count"] == 3
    assert len(result["suspicious_urls"]) >= 2
