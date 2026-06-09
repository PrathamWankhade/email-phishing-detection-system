def normalize_sender(sender: str | None) -> str:
    return (sender or "").strip().lower()
