import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.pipeline import Pipeline

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

DATASET_PATH = os.path.join(PROJECT_ROOT, "datasets", "final", "final_emails.csv")
MODEL_DIR = os.path.join(PROJECT_ROOT, "trained_models")
os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_DIR, "phishing_model.pkl")
VECTORIZER_PATH = os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl")

print("Loading dataset...")
dataset = pd.read_csv(DATASET_PATH)
print(f"Total emails: {len(dataset)}")
print(dataset["label"].value_counts())

X = dataset["email_text"]
y = dataset["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("Vectorizing text with n-grams (1,3)...")
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=50000,
    ngram_range=(1, 3),
    sublinear_tf=True,
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

lr = LogisticRegression(max_iter=2000, class_weight="balanced", random_state=42, C=1.0)
rf = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42, n_jobs=-1)

ensemble = VotingClassifier(
    estimators=[("lr", lr), ("rf", rf)],
    voting="soft",
)

print("Training ensemble model (LogisticRegression + RandomForest)...")
ensemble.fit(X_train_tfidf, y_train)

print("Performing 5-fold cross-validation...")
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(ensemble, X_train_tfidf, y_train, cv=cv, scoring="accuracy")
print(f"Cross-validation accuracy: {cv_scores.mean() * 100:.2f}% (+/- {cv_scores.std() * 2:.2f})")

predictions = ensemble.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, predictions)

print(f"\nTest Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, predictions))

cm = confusion_matrix(y_test, predictions)
print(f"Confusion Matrix:\n{cm}")

joblib.dump(ensemble, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print(f"\nModel saved to {MODEL_PATH}")
print(f"Vectorizer saved to {VECTORIZER_PATH}")
