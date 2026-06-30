# AI Engine — ML Training & Inference Pipeline

Modular machine learning pipeline for training and deploying phishing email classifiers. Handles everything from raw data aggregation to model serialization to inference.

## Directory Layout

```
ai-engine/
├── training/                  # Dataset building + model training
│   ├── build_final_dataset.py # Aggregates 19 sources → 195,740 cleaned emails
│   └── train_model.py         # Trains LogisticRegression + TF-IDF pipeline
├── preprocessing/             # Text cleaning, tokenization, stopword removal
├── inference/                 # Lazy-loaded predictor (homograph detection, vectorization)
├── feature_engineering/       # TF-IDF vectorization and n-gram utilities
└── models/                    # Serialized model artifacts
    ├── phishing_model.pkl     # Trained LogisticRegression classifier
    └── tfidf_vectorizer.pkl   # Fitted TF-IDF vectorizer (30k features)
```

## Pipeline

1. **`build_final_dataset.py`** — Reads 11 labeled CSVs + 8 SpamAssassin maildirs, applies HTML decode + tag stripping + lowercase normalization, deduplicates via MD5 hash, shuffles, and writes `datasets/final/final_emails.csv`
2. **`train_model.py`** — Loads the final dataset, splits 80/20 stratified, fits TF-IDF (30k features, unigrams + bigrams), trains LogisticRegression (`C=1.0`, `max_iter=1000`), evaluates, and saves artifacts to `ai-engine/models/`
3. **`inference/`** — The backend's `phishing_detector.py` loads these artifacts lazily on first request

## Model Performance

- **Accuracy**: 97.84%
- **Precision (Phishing)**: 97.3%
- **Recall (Phishing)**: 98.1%
- **Inference**: ~200ms average

## Usage

```bash
# Build the final dataset from raw sources
python ai-engine/training/build_final_dataset.py

# Train the model
python ai-engine/training/train_model.py
```

Artifacts are written to `ai-engine/models/` and symlinked/copied to `trained_models/` for backend access.
