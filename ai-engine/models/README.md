# Model Artifacts

Serialized machine learning models and vectorizers produced by `ai-engine/training/train_model.py`. These files are loaded by the backend's `phishing_detector.py` at runtime for inference.

## Files

| File | Description | Size |
|---|---|---|
| `phishing_model.pkl` | Trained LogisticRegression classifier | ~850 KB |
| `tfidf_vectorizer.pkl` | Fitted TF-IDF vectorizer (30k features) | ~3.5 MB |

## Model Details

- **Algorithm**: LogisticRegression (C=1.0, max_iter=1000, multi_class='multinomial')
- **Vectorization**: TF-IDF with unigrams + bigrams, max_features=30000
- **Training data**: 156,592 emails (80% of 195,740)
- **Test accuracy**: 97.84%

## Usage

These models are loaded lazily by the backend on the first prediction request:

```python
from ai-engine.inference import PhishingDetector
detector = PhishingDetector(model_path="ai-engine/models/phishing_model.pkl")
result = detector.predict(email_text, sender)
```

Production copies are also maintained in `trained_models/` at the project root for backend access.

## Retraining

```bash
python ai-engine/training/train_model.py
```

This overwrites the `.pkl` files in this directory with the newly trained model and vectorizer.
