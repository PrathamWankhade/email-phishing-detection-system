# 🛡️ AI-Based Phishing Email Detection System

> An AI-powered phishing email detection platform using **Machine Learning, NLP, FastAPI, and React** for real-time phishing analysis and explainable threat detection.

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square\&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square\&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square\&logo=react)
![ML](https://img.shields.io/badge/Machine%20Learning-TF--IDF%20%2B%20Logistic%20Regression-orange?style=flat-square)

---

## ✨ Overview

Phishing emails are one of the biggest cybersecurity threats, often leading to credential theft, financial fraud, and data breaches.

This project uses **Natural Language Processing (NLP)** and **Machine Learning** to analyze email content, sender patterns, urgency signals, and suspicious URLs to classify emails as:

* ✅ Safe
* ⚠️ Suspicious
* 🚨 Phishing

The system is built with a **production-style modular architecture**, combining a React frontend, FastAPI backend, and ML-powered detection pipeline.

---

## 🚀 Features

### Real-Time Email Detection

* Scan emails instantly
* Risk classification
* Confidence score prediction

### AI + NLP Analysis

* Text preprocessing
* Tokenization & stemming
* TF-IDF vectorization
* ML-based classification

### URL & Sender Intelligence

* Suspicious domain detection
* Sender risk analysis
* Urgency keyword detection

### Analytics Dashboard

* Threat distribution charts
* Scan history
* Risk-level analytics

---

## 🛠️ Tech Stack

| Category      | Technologies                              |
| ------------- | ----------------------------------------- |
| Frontend      | React, Vite, Tailwind CSS                 |
| Backend       | FastAPI, Python                           |
| Database      | SQLite                                    |
| AI/ML         | Scikit-learn, TF-IDF, Logistic Regression |
| Visualization | Recharts                                  |

---

## 📂 Project Structure

```text
email-phishing-detection-system/
│── frontend/
│── backend/
│── ai-engine/
│── datasets/
│── trained_models/
│── tests/
│── documentation/
│── README.md
```

---

## 📥 Dataset Setup

Raw datasets are not included due to GitHub size limits.

### 1. Phishing Dataset

Download:

https://www.kaggle.com/datasets/naserabdullahalam/phishing-email-dataset

Place files inside:

```text
datasets/raw/
├── phishing_email/
├── Nazario/
├── Nigerian_Fraud/
├── SpamAssasin/
└── CEAS_08/
```

### 2. Legitimate Email Dataset

Download Enron Dataset:

https://www.cs.cmu.edu/~enron/

Extract into:

```text
datasets/raw/enron_mail/
```

---

## ⚙️ Setup

### Clone Repository

```bash
git clone https://github.com/PrathamWankhade/email-phishing-detection-system.git
cd email-phishing-detection-system
```

### Backend Setup

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API Docs:

```text
http://127.0.0.1:8000/docs
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## 🧠 Detection Pipeline

```text
Email Input
    ↓
NLP Processing
    ↓
URL & Sender Analysis
    ↓
TF-IDF Vectorization
    ↓
Machine Learning Model
    ↓
Risk Classification
```

---

## 📈 Model Performance

| Metric       | Value                        |
| ------------ | ---------------------------- |
| Model        | Logistic Regression + TF-IDF |
| Dataset Size | 231,893+ Emails              |
| Accuracy     | 99.58%                       |

---

## 🖼️ Screenshots

<img width="1319" height="859" alt="Screenshot 2026-06-11 193659" src="https://github.com/user-attachments/assets/d6175064-f4db-48ef-9177-accea308f566" />
<img width="1330" height="858" alt="Screenshot 2026-06-11 193810" src="https://github.com/user-attachments/assets/f043d7e2-b231-4abe-b0b6-359bc1863773" />
<img width="1268" height="842" alt="Screenshot 2026-06-11 193913" src="https://github.com/user-attachments/assets/2cce7c8d-dbaa-4ac1-ba3b-2071b28047e7" />
<img width="1768" height="652" alt="Screenshot 2026-06-11 194102" src="https://github.com/user-attachments/assets/a34254e1-ab4e-4b8c-9479-00967badf144" />
<img width="1429" height="859" alt="Screenshot 2026-06-11 194143" src="https://github.com/user-attachments/assets/9261f24e-4caa-408e-8610-cbe0d84fcfad" />

## 🔮 Future Improvements

* Browser extension integration
* Real-time threat intelligence
* Deep learning models
* URL sandbox analysis
* Cloud deployment

---

## 👨‍💻 Author

**Pratham Wankhade**

Built as a production-style cybersecurity & AI project focused on phishing detection, explainable ML, and modular software engineering.
