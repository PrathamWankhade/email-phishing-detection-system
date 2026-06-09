def simple_stem(token: str) -> str:
    for suffix in ("ing", "ed", "ly", "s"):
        if len(token) > len(suffix) + 3 and token.endswith(suffix):
            return token[: -len(suffix)]
    return token


def stem_tokens(tokens: list[str]) -> list[str]:
    return [simple_stem(token) for token in tokens]
