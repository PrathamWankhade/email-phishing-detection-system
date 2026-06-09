try:
    from sklearn.feature_extraction.text import TfidfVectorizer
except ImportError:  # pragma: no cover
    TfidfVectorizer = None


def build_vectorizer():
    if TfidfVectorizer is None:
        raise RuntimeError("scikit-learn is required for TF-IDF vectorization")
    return TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
