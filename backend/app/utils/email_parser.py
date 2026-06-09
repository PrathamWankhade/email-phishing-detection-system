from email import policy
from email.parser import Parser


def parse_raw_email(raw_email: str) -> dict[str, str]:
    message = Parser(policy=policy.default).parsestr(raw_email)
    body = message.get_body(preferencelist=("plain",))
    return {
        "sender": message.get("from", ""),
        "subject": message.get("subject", ""),
        "body": body.get_content() if body else raw_email,
    }
