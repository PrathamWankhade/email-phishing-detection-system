import os
import joblib
import pandas as pd
import itertools

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.pipeline import Pipeline

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

DATASET_PATH = os.path.join(PROJECT_ROOT, "datasets", "final", "final_emails.csv")
MODEL_DIR = os.path.join(PROJECT_ROOT, "trained_models")
os.makedirs(MODEL_DIR, exist_ok=True)

print("Loading dataset...")
dataset = pd.read_csv(DATASET_PATH)
X = dataset["email_text"]
y = dataset["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words="english", sublinear_tf=True)),
    ("clf", LogisticRegression(max_iter=2000, class_weight="balanced", random_state=42)),
])

param_grid = {
    "tfidf__max_features": [10000, 30000, 50000],
    "tfidf__ngram_range": [(1, 2), (1, 3)],
    "clf__C": [0.1, 1.0, 10.0],
}

print("Running GridSearchCV...")
grid = GridSearchCV(pipeline, param_grid, cv=3, scoring="accuracy", n_jobs=-1, verbose=1)
grid.fit(X_train, y_train)

print(f"\nBest parameters: {grid.best_params_}")
print(f"Best cross-validation accuracy: {grid.best_score_ * 100:.2f}%")

test_accuracy = accuracy_score(y_test, grid.predict(X_test))
print(f"Test accuracy with best params: {test_accuracy * 100:.2f}%")

print("\nClassification Report:")
print(classification_report(y_test, grid.predict(X_test)))

joblib.dump(grid.best_estimator_, os.path.join(MODEL_DIR, "phishing_model.pkl"))
print(f"\nTuned model saved to {MODEL_DIR}")
