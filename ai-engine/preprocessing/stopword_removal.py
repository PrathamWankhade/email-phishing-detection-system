STOPWORDS = {"the", "is", "and", "a", "an", "to", "of", "for", "your", "you", "in", "on"}


def remove_stopwords(tokens: list[str]) -> list[str]:
    return [token for token in tokens if token not in STOPWORDS]
