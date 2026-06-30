# Validation / Test Data

Holdout test sets for model evaluation. Created from `datasets/final/final_emails.csv` via a stratified 80/20 train-test split, preserving the class distribution from the full dataset.

## Files

| File | Rows | Description |
|---|---|---|
| `test_data.csv` | 39,148 | 21,178 legitimate + 17,970 phishing emails (holdout set) |

## Usage

Used by `train_model.py` for evaluation after training and by `test_model_accuracy.py` for benchmarking.

The 20% holdout is stratified — meaning the ratio of phishing to legitimate emails in the test set matches the full dataset (54% legit / 46% phishing).

## Regeneration

```bash
python ai-engine/training/build_final_dataset.py --split
```

Note: The full dataset must exist at `datasets/final/final_emails.csv` before running the split.
