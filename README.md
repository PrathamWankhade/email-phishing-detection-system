# AI-Based Phishing Email Detection System

[![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=flat-square&logo=scikit-learn)](https://scikit-learn.org)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-Llama%203.3-7b2ff7?style=flat-square)](https://openrouter.ai)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A production-style AI-powered platform for real-time phishing email detection using **Natural Language Processing**, **Machine Learning**, and **Explainable AI**. The system analyzes email content, sender behaviour, and embedded URLs to classify emails as **Safe**, **Suspicious**, or **Phishing** with a confidence score and AI-generated explanations.

---

## Features

### Core Detection
- **Real-Time Scanning** — Paste email text or upload `.txt` / `.eml` files for immediate classification
- **ML Classification** — Logistic Regression + TF-IDF vectorization (30k features, unigrams + bigrams) trained on 195,740 real emails
- **AI Explanations** — OpenRouter (Llama 3.3 70B Instruct) generates 3 bullet-point reasons for every phishing detection
- **Confidence Scoring** — Per-class probability estimates with percentage-based confidence

### Threat Intelligence
- **URL Analysis** — Suspicious TLD detection (`.xyz`, `.top`, `.click`, etc.), homograph attack recognition, shortened URL flagging
- **Sender Analysis** — Domain validation against a curated blocklist, impersonation pattern detection
- **Keyword Detection** — 15+ phishing signal categories (urgency, credential requests, financial, etc.)

### Dashboard & Analytics
- **Analytics Dashboard** — Threat distribution donut chart, risk-level bar chart, 6 stat cards with count-up animation, latest detection cards
- **Scan History** — Filterable, sortable table with search across sender, prediction, and date columns
- **Duplicate Deduplication** — MD5-hash based dedup with `scan_count` tracking; rescanned emails move to top
- **Scroll-Reveal UI** — IntersectionObserver-driven entrance animations, staggered children, hardware-accelerated transitions

### UI Architecture
- **Lazy-Loaded Routes** — 5 code-split pages via `React.lazy()`, no oversized bundles (~80 kB gzip initial)
- **Material Design Light Mode** — Clean white/gray surfaces, 12–16px border radius, soft shadows
- **Inline SVG Icons** — 30 custom Material-style SVG icons, zero icon library dependencies

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 6, Tailwind CSS (CDN), Recharts 3 |
| **Backend** | FastAPI, Python 3.11, Uvicorn |
| **Database** | SQLite (WAL mode, auto-initialized schema) |
| **ML Pipeline** | Scikit-learn (LogisticRegression), TF-IDF, NLTK |
| **AI Explanation** | OpenRouter API (`meta-llama/llama-3.3-70b-instruct`) |
| **Infrastructure** | Docker, Docker Compose, Nginx |

---

## Project Structure

```
email-phishing-detection-system/
├── frontend/                    # React SPA
│   ├── src/
│   │   ├── components/          # 12 reusable components
│   │   │   ├── Navbar.jsx       # Sticky nav with dynamic notifications
│   │   │   ├── Footer.jsx       # Site footer with links
│   │   │   ├── EmailInput.jsx   # Text area + file upload input
│   │   │   ├── PredictionCard.jsx # Scan result card with risk badge
│   │   │   ├── UploadEmail.jsx  # Drag-and-drop file uploader
│   │   │   ├── Icon.jsx         # 30 inline SVG icons
│   │   │   ├── ConfidenceScore.jsx # Ring meter for confidence %
│   │   │   ├── RiskMeter.jsx    # Vertical risk gauge
│   │   │   ├── ThreatReasons.jsx # AI explanation display
│   │   │   ├── Skeleton.jsx     # Loading skeleton
│   │   │   ├── Loader.jsx       # Spinner overlay
│   │   │   └── ScrollToTop.jsx  # Route change scroll reset
│   │   ├── pages/               # 5 pages + redirects
│   │   │   ├── Home.jsx         # Landing page (hero, features, stats)
│   │   │   ├── Scanner.jsx      # Standalone email scanner
│   │   │   ├── Dashboard.jsx    # Analytics + scan history table
│   │   │   ├── Analytics.jsx    # Detailed trend charts
│   │   │   └── Contact.jsx      # Contact form + FAQ accordion
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useScrollReveal.js   # IntersectionObserver reveal
│   │   │   └── useCountUp.js        # Animated number counter
│   │   ├── services/
│   │   │   └── api.js           # API client with local fallback
│   │   └── styles/
│   │       ├── global.css       # Base styles, fonts, scrollbar
│   │       └── animations.css   # 40+ keyframes + utility classes
│   ├── index.html               # Entry HTML with Tailwind CDN config
│   └── dist/                    # Production build (6 chunks, ~680 kB)
├── backend/                     # FastAPI server
│   └── app/
│       ├── api/
│       │   ├── router.py        # Route aggregation
│       │   └── routes/
│       │       ├── prediction.py # POST /api/v1/predict
│       │       ├── dashboard.py  # GET /api/v1/dashboard
│       │       └── history.py    # GET /api/v1/history
│       ├── database/
│       │   ├── db.py            # SQLite connection + WAL mode
│       │   ├── schema.py        # Table definitions
│       │   └── models.py        # CRUD operations
│       ├── services/
│       │   ├── phishing_detector.py # ML inference wrapper
│       │   ├── prediction_service.py # Orchestration logic
│       │   ├── url_analyzer.py      # TLD + homograph analysis
│       │   ├── sender_analyzer.py   # Domain validation
│       │   ├── openrouter_explainer.py # OpenRouter AI client
│       │   └── explanation_engine.py # Aggregated explanation logic
│       ├── middleware/           # CORS, rate limiting
│       ├── config/              # Environment config
│       ├── controllers/         # Request handlers
│       ├── utils/               # Helpers
│       └── main.py              # FastAPI app entrypoint
├── ai-engine/                   # ML training pipeline
│   ├── training/
│   │   ├── build_final_dataset.py # 19-source data aggregation
│   │   └── train_model.py         # LogisticRegression training
│   ├── preprocessing/           # Text cleaning utilities
│   ├── inference/               # Lazy-loaded predictor
│   ├── feature_engineering/     # TF-IDF + n-gram pipeline
│   └── models/                  # Serialized model artifacts
├── datasets/                    # Email datasets
│   ├── raw/                     # Raw source CSVs (gitignored)
│   ├── final/
│   │   └── final_emails.csv     # 195,740 cleaned emails (gitignored)
│   ├── processed/               # Tokenized vectors cache
│   └── validation/
│       └── test_data.csv        # 39,148 holdout rows (gitignored)
├── trained_models/              # Model artifacts (gitignored)
├── tests/                       # 5 test suites
│   ├── test_api.py              # API endpoint tests
│   ├── test_prediction.py       # Classification tests
│   ├── test_url_analysis.py     # URL detection tests
│   ├── test_sender_analysis.py  # Sender validation tests
│   └── test_model_accuracy.py   # Accuracy benchmarking
├── docs/                        # Documentation
│   ├── API_Documentation.md
│   ├── architecture.md
│   ├── database_design.md
│   ├── system_design.md
│   └── workflow.md
├── docker/                      # Docker configurations
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── nginx.conf
├── docker-compose.yml           # Multi-container orchestration
├── requirements.txt             # Python dependencies
├── package.json                 # Node dependencies (Vite + React)
└── vite.config.ts               # Vite bundler configuration
```

---

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- OpenRouter API key (set in `.env`)

### Backend Setup

```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows
source .venv/bin/activate     # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env          # Edit OPENROUTER_API_KEY

# Start the server
uvicorn backend.app.main:app --reload
```

Backend runs at **http://127.0.0.1:8000**. Interactive API docs at **http://127.0.0.1:8000/docs**.

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**.

### Production Build

```bash
npm run build
npm run preview        # Preview production build locally
```

### Docker Deployment

```bash
docker-compose up --build
```

Access the app at **http://localhost:8080**.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/predict` | Analyze an email for phishing indicators |
| `GET` | `/api/v1/dashboard` | Aggregated statistics and risk distribution |
| `GET` | `/api/v1/history` | Complete scan history with reasons |
| `GET` | `/health` | Health check |

### POST `/api/v1/predict`

Request body:
```json
{
  "email_text": "Urgent: Your account has been compromised. Click here to verify.",
  "sender": "security@bank-verify.com"
}
```

Response:
```json
{
  "label": "Phishing Email",
  "confidence": 96.8,
  "risk_level": "high",
  "reasons": [
    "Urgent language triggers urgency phishing signal",
    "Suspicious sender domain does not match legitimate bank domain",
    "Verification link request is a common credential harvesting tactic"
  ],
  "source": "ml-model"
}
```

---

## Detection Pipeline

```
Email Input → NLP Preprocessing → URL Analysis → Sender Analysis
                                              ↓
                              TF-IDF Vectorization (30k features)
                                              ↓
                               LogisticRegression Classifier
                                              ↓
                              Risk Assessment + AI Explanation
```

1. **Email Input** — User pastes text or uploads `.txt` / `.eml` file; sender is extracted from headers or provided manually
2. **NLP Preprocessing** — HTML tag stripping, lowercase normalization, tokenization, stopword removal, stemming
3. **URL Analysis** — TLD validation against suspicious TLD list, homograph attack detection (punycode + confusable characters), shortened URL flagging
4. **Sender Analysis** — Domain validation against a curated blocklist of known phishing domains, impersonation detection
5. **TF-IDF Vectorization** — 30,000-feature unigram + bigram matrix fitted on the training corpus
6. **LogisticRegression Classification** — Multi-class prediction (Safe / Suspicious / Phishing) with probability calibration
7. **AI Explanation** — If phishing or suspicious, OpenRouter (Llama 3.3 70B) generates 3 bullet-point explanations

---

## Model Performance

| Metric | Value |
|---|---|
| **Model** | Logistic Regression (C=1.0, max_iter=1000) |
| **Vectorization** | TF-IDF, 30,000 features, unigrams + bigrams |
| **Training Data** | 195,740 emails (105,891 legitimate, 89,849 phishing) |
| **Test Data** | 39,148 emails (stratified 80/20 split) |
| **Test Accuracy** | **97.84%** |
| **Precision (Phishing)** | 97.3% |
| **Recall (Phishing)** | 98.1% |
| **Precision (Safe)** | 98.2% |
| **Recall (Safe)** | 97.6% |
| **Inference Time** | ~200ms average |

---

## Dataset Sources

The model is trained on data aggregated from **19 sources** (11 labeled CSV datasets + 8 SpamAssassin maildir folders):

| Source | Type | Count |
|---|---|---|
| Phishing Email Dataset (Kaggle) | Phishing | ~8,000 |
| SpamAssassin (2002) | Legitimate + Spam | ~7,000 |
| Enron Email Dataset | Legitimate | ~33,000 |
| Nazario Phishing Corpus | Phishing | ~7,500 |
| Millersmiles Phishing Corpus | Phishing | ~6,500 |
| Nigerian Letter Fraud Corpus | Phishing | ~700 |
| Custom Web Crawls | Phishing | ~5,000 |
| *Additional labeled sources* | *Mixed* | *~128,000* |
| **Total after dedup + cleaning** | | **195,740** |

---

## Running Tests

```bash
# Activate virtual environment first, then:
pytest tests/ -v
```

---

## Project Status

This is an active research and development project. Current focus areas:

- [x] Core ML pipeline with LogisticRegression (97.84% accuracy)
- [x] OpenRouter AI explanations for detected threats
- [x] Dashboard with analytics, charts, and scan history
- [x] Real-time scanning with file upload support
- [x] Duplicate detection with rescanned count tracking
- [ ] Browser extension for Gmail / Outlook integration
- [ ] Transformer-based deep learning models (BERT, RoBERTa)
- [ ] Real-time threat intelligence feed integration
- [ ] URL sandbox analysis for zero-day detection
- [ ] CI/CD pipeline with GitHub Actions

---

## Author

**Pratham Wankhade**

- GitHub: [github.com/PrathamWankhade](https://github.com/PrathamWankhade)
- LinkedIn: [linkedin.com/in/pratham-wankhade](https://www.linkedin.com/in/pratham-wankhade)
- Email: prathamwankhade124@gmail.com

---

*Built as a production-style cybersecurity and AI project focused on phishing detection, explainable machine learning, and modular software engineering.*
