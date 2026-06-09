from pathlib import Path
import pandas as pd

print("SCRIPT STARTED")

# ==========================================
# PATHS
# ==========================================

BASE_DIR = Path(__file__).resolve().parents[2]

RAW_DIR = BASE_DIR / "datasets" / "raw"
PROCESSED_DIR = BASE_DIR / "datasets" / "processed"
FINAL_DIR = BASE_DIR / "datasets" / "final"

FINAL_DIR.mkdir(
    parents=True,
    exist_ok=True
)

# ==========================================
# LOAD ENRON
# ==========================================

print("Loading Enron...")

enron = pd.read_csv(
    PROCESSED_DIR /
    "enron_legitimate.csv"
)

enron = enron[
    ["email_text", "label"]
]

# Keep only 100k safe emails
enron = enron.sample(
    n=100000,
    random_state=42
)

print(
    f"Enron loaded: {len(enron)}"
)

# ==========================================
# LOAD PHISHING EMAIL
# ==========================================

print("Loading phishing_email...")

phishing_email = pd.read_csv(
    RAW_DIR /
    "phishing_email" /
    "phishing_email.csv"
)

phishing_email = phishing_email.rename(
    columns={
        "text_combined":
        "email_text"
    }
)

phishing_email["label"] = (
    "phishing"
)

phishing_email = phishing_email[
    [
        "email_text",
        "label",
    ]
]

print(
    f"phishing_email loaded: {len(phishing_email)}"
)

# ==========================================
# LOAD NAZARIO
# ==========================================

print("Loading Nazario...")

nazario = pd.read_csv(
    RAW_DIR /
    "Nazario" /
    "Nazario.csv"
)

nazario["email_text"] = (
    nazario["subject"]
    .fillna("")
    + " "
    + nazario["body"]
    .fillna("")
)

nazario["label"] = (
    "phishing"
)

nazario = nazario[
    [
        "email_text",
        "label",
    ]
]

print(
    f"Nazario loaded: {len(nazario)}"
)

# ==========================================
# LOAD NIGERIAN FRAUD
# ==========================================

print(
    "Loading Nigerian Fraud..."
)

nigerian = pd.read_csv(
    RAW_DIR /
    "Nigerian_Fraud" /
    "Nigerian_Fraud.csv"
)

nigerian["email_text"] = (
    nigerian["subject"]
    .fillna("")
    + " "
    + nigerian["body"]
    .fillna("")
)

nigerian["label"] = (
    "phishing"
)

nigerian = nigerian[
    [
        "email_text",
        "label",
    ]
]

print(
    f"Nigerian Fraud loaded: {len(nigerian)}"
)

# ==========================================
# LOAD SPAMASSASIN
# ==========================================

print("Loading SpamAssasin...")

spamassasin = pd.read_csv(
    RAW_DIR /
    "SpamAssasin" /
    "SpamAssasin.csv"
)

spamassasin["email_text"] = (
    spamassasin["subject"]
    .fillna("")
    + " "
    + spamassasin["body"]
    .fillna("")
)

spamassasin["label"] = (
    "phishing"
)

spamassasin = spamassasin[
    [
        "email_text",
        "label",
    ]
]

print(
    f"SpamAssasin loaded: {len(spamassasin)}"
)

# ==========================================
# LOAD CEAS_08
# ==========================================

print("Loading CEAS_08...")

ceas = pd.read_csv(
    RAW_DIR /
    "CEAS_08" /
    "CEAS_08.csv"
)

ceas["email_text"] = (
    ceas["subject"]
    .fillna("")
    + " "
    + ceas["body"]
    .fillna("")
)

ceas["label"] = (
    "phishing"
)

ceas = ceas[
    [
        "email_text",
        "label",
    ]
]

print(
    f"CEAS loaded: {len(ceas)}"
)

# ==========================================
# MERGE
# ==========================================

print("Merging datasets...")

dataset = pd.concat(
    [
        enron,
        phishing_email,
        nazario,
        nigerian,
        spamassasin,
        ceas,
    ],
    ignore_index=True
)

# ==========================================
# CLEAN
# ==========================================

print("Cleaning dataset...")

dataset.dropna(
    inplace=True
)

dataset.drop_duplicates(
    subset=["email_text"],
    inplace=True
)

dataset = dataset[
    dataset[
        "email_text"
    ].str.len() > 20
]

dataset = dataset.sample(
    frac=1,
    random_state=42
)

# ==========================================
# SAVE
# ==========================================

SAVE_PATH = (
    FINAL_DIR /
    "final_emails.csv"
)

dataset.to_csv(
    SAVE_PATH,
    index=False
)

print("\nDONE!")

print(
    f"Final rows: {len(dataset)}"
)

print(
    "\nClass Distribution:"
)

print(
    dataset["label"]
    .value_counts()
)

print(
    f"\nSaved to:\n{SAVE_PATH}"
)