import sys
from pathlib import Path

# Ensure project root is on sys.path so "backend.app.main" resolves
sys.path.insert(0, str(Path(__file__).resolve().parent))

from backend.app.main import app
