import os
import joblib
import pandas as pd

from sklearn.model_selection import (
    train_test_split,
)

from sklearn.feature_extraction.text import (
    TfidfVectorizer,
)

from sklearn.linear_model import (
    LogisticRegression,
)

from sklearn.metrics import (
    accuracy_score,
    classification_report,
)

# =====================================
# PATHS
# =====================================

PROJECT_ROOT = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

DATASET_PATH = os.path.join(
    PROJECT_ROOT,
    "datasets",
    "final",
    "final_emails.csv",
)

MODEL_DIR = os.path.join(
    PROJECT_ROOT,
    "ai-engine",
    "models",
)

os.makedirs(
    MODEL_DIR,
    exist_ok=True,
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "phishing_model.pkl",
)

VECTORIZER_PATH = os.path.join(
    MODEL_DIR,
    "vectorizer.pkl",
)

# =====================================
# LOAD DATASET
# =====================================

print("Loading dataset...")

dataset = pd.read_csv(
    DATASET_PATH
)

print(
    f"Total emails: {len(dataset)}"
)

print(
    dataset["label"]
    .value_counts()
)

# =====================================
# FEATURES
# =====================================

X = dataset[
    "email_text"
]

y = dataset[
    "label"
]

# =====================================
# SPLIT
# =====================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

# =====================================
# TF-IDF
# =====================================

print("Vectorizing text...")

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=50000,
)

X_train_tfidf = (
    vectorizer.fit_transform(
        X_train
    )
)

X_test_tfidf = (
    vectorizer.transform(
        X_test
    )
)

# =====================================
# TRAIN MODEL
# =====================================

print("Training model...")

model = LogisticRegression(
    max_iter=1000,
)

model.fit(
    X_train_tfidf,
    y_train,
)

# =====================================
# EVALUATION
# =====================================

predictions = model.predict(
    X_test_tfidf
)

accuracy = accuracy_score(
    y_test,
    predictions,
)

print(
    f"\nAccuracy: {accuracy * 100:.2f}%"
)

print(
    classification_report(
        y_test,
        predictions,
    )
)

# =====================================
# SAVE
# =====================================

joblib.dump(
    model,
    MODEL_PATH,
)

joblib.dump(
    vectorizer,
    VECTORIZER_PATH,
)

print("\nModel saved!")

print(
    MODEL_PATH
)

print(
    VECTORIZER_PATH
)