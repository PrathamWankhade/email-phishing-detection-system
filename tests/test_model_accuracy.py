import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "ai-engine"))

from training.evaluate_model import evaluate_model


def test_accuracy_report_placeholder_is_viva_ready():
    metrics = evaluate_model()
    assert metrics["accuracy"] >= 0.90
