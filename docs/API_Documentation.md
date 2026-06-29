# API Documentation

## POST `/api/v1/predict`

Request:

```json
{ "email_text": "URGENT verify your password", "sender": "support@example.xyz" }
```

Response:

```json
{ "label": "Phishing Email", "confidence": 91, "risk_level": "high", "reasons": [] }
```
