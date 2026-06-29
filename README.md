# AI-Based Phishing Email Detection System

An AI-powered phishing email detection platform using Machine Learning, NLP, FastAPI, and React for real-time phishing analysis and explainable threat detection.

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react)
![ML](https://img.shields.io/badge/Machine%20Learning-TF--IDF%20%2B%20Ensemble-orange?style=flat-square)

---

## Overview

Phishing emails are one of the biggest cybersecurity threats, often leading to credential theft, financial fraud, and data breaches. This project uses **Natural Language Processing (NLP)** and **Machine Learning** to analyze email content, sender patterns, urgency signals, and suspicious URLs to classify emails as **Safe**, **Suspicious**, or **Phishing**.

The system is built with a production-style modular architecture combining a React frontend, FastAPI backend, SQLite database, and ML-powered detection pipeline with explainable AI via Gemini.

---

## Features

- **Real-Time Email Detection** — Paste or upload email content for instant phishing analysis with risk classification and confidence scoring
- **AI + NLP Analysis** — Text preprocessing, tokenization, TF-IDF vectorization with n-grams, and ensemble ML classification (Logistic Regression + Random Forest)
- **URL & Sender Intelligence** — Suspicious TLD detection, homograph attack recognition, sender domain validation, and urgency keyword analysis
- **Threat Signal Reference** — 15+ phishing indicators tracked with severity levels (Critical to Low) for comprehensive threat intelligence
- **Analytics Dashboard** — Threat distribution pie charts, risk-level bar charts, scan history table, and animated statistics with count-up effects
- **Explainable AI** — Gemini-powered natural language explanations for each detection, helping users understand classification rationale
- **Material Design UI** — Clean light-mode interface with micro-animations, scroll reveals, staggered entrances, and hardware-accelerated transitions
- **Code-Split Architecture** — 11 lazy-loaded JS chunks (7 pages + 4 shared), no oversized bundles, fast initial load

---

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, Vite 6, Tailwind CSS, Recharts |
| Backend | FastAPI, Python 3.11, Uvicorn |
| Database | SQLite (WAL mode, auto-init) |
| AI/ML | Scikit-learn (Logistic Regression, Random Forest), TF-IDF, N-grams |
| Explainable AI | Google Gemini API |
| Infra | Docker, Docker Compose |

---

## Project Structure

```
email-phishing-detection-system/
├── frontend/           # React SPA (6 pages, 25+ components)
│   ├── src/
│   │   ├── components/ # Navbar, Footer, Icon, Skeleton, EmailInput, PredictionCard, UploadEmail
│   │   ├── pages/      # Home, Dashboard, History, Analytics, About, Contact
│   │   ├── hooks/      # useScrollReveal, useCountUp
│   │   ├── styles/     # global.css, animations.css (40+ keyframes)
│   │   └── services/   # API client with local fallback
│   └── dist/           # Production build (11 chunks, ~680 kB gzipped)
├── backend/            # FastAPI server
│   └── app/
│       ├── api/        # Routes (prediction, dashboard, history)
│       ├── database/   # SQLite connection, schema, CRUD
│       └── main.py     # FastAPI app with lifespan, CORS, rate limiting
├── ai-engine/          # ML training & inference pipeline
│   ├── training/       # Ensemble model trainer (VotingClassifier)
│   ├── inference/      # Lazy-loaded predictor with homograph detection
│   └── models/         # Preprocessing, vectorization utilities
├── tests/              # 28 passing tests (API, URL, sender, prediction)
├── trained_models/     # Saved model artifacts
└── datasets/           # Raw datasets (not included in repo)
```

---

## Quick Start

### Backend

```bash
python -m venv .venv
source .venv/bin/activate    # Linux/Mac
.venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

Backend runs at **http://127.0.0.1:8000**. API docs at **http://127.0.0.1:8000/docs**.

You can also use the root shim: `uvicorn main:app --reload`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**.

### Production Build

```bash
cd frontend
npm run build
npm run preview
```

### Tests

```bash
pytest tests/ -v
```

28 tests covering prediction, URL analysis, sender analysis, API endpoints, and database operations.

---

## API Endpoints

<
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/predict` | Scan email for phishing (text + optional sender) |
| GET | `/api/v1/dashboard` | Aggregated stats (total scans, phishing/safe counts, risk levels) |
| GET | `/api/v1/history` | All scan records with sender, prediction, confidence, risk, date |
| GET | `/health` | Health check endpoint |

---
>>>>>>> 4a49007 (Major project refactor with React frontend and AI backend improvements)

## Detection Pipeline

1. **Email Input** — Paste text or upload .txt/.eml file
2. **NLP Preprocessing** — Text cleaning, tokenization, stopword removal, stemming
3. **URL Analysis** — TLD validation, homograph detection, shortened URL flagging
4. **Sender Analysis** — Domain validation, impersonation detection
5. **TF-IDF Vectorization** — N-gram (1,3) feature extraction
6. **Ensemble Classification** — VotingClassifier (LR + RF) with confidence scoring
7. **Risk Assessment** — High / Medium / Low with explainable AI report

---

## Model Performance

| Metric | Value |
|---|---|
| Model | Ensemble (Logistic Regression + Random Forest) |
| Vectorization | TF-IDF with n-gram range (1,3) |
| Training Data | 231,893+ emails |
| Accuracy | 99.58% |
| Inference Time | < 1.2s average |

---

## Future Improvements

- Browser extension for real-time Gmail/Outlook scanning
- Deep learning models (LSTM, Transformer-based)
- Real-time threat intelligence feed integration
- URL sandbox analysis for zero-day detection
- Cloud deployment with Docker + CI/CD pipeline

---

## Author

**Pratham Wankhade**

- GitHub: [github.com/PrathamWankhade](https://github.com/PrathamWankhade)
- LinkedIn: [linkedin.com/in/pratham-wankhade](https://www.linkedin.com/in/pratham-wankhade)
- Instagram: [@hey.its.me.ichi](https://www.instagram.com/hey.its.me.ichi)
- Email: prathamwankhade124@gmail.com

Built as a production-style cybersecurity and AI project focused on phishing detection, explainable machine learning, and modular software engineering.
