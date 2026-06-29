from backend.app.services.sender_analyzer import analyze_sender


def test_suspicious_tld():
    result = analyze_sender("admin@bank-secure.xyz")
    assert result["risk"] > 0
    assert len(result["reasons"]) > 0


def test_impersonation_domain():
    result = analyze_sender("support@paypal-secure-login.com")
    assert result["risk"] > 0
    assert any("impersonation" in r.lower() for r in result["reasons"])


def test_trusted_domain():
    result = analyze_sender("john@gmail.com")
    assert result["risk"] == 0


def test_excessive_subdomains():
    result = analyze_sender("alert@security.alert.bank.verify.com")
    assert result["risk"] > 0


def test_empty_sender():
    result = analyze_sender("")
    assert result["risk"] == 0


def test_none_sender():
    result = analyze_sender(None)
    assert result["risk"] == 0
