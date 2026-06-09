from pathlib import Path
import pandas as pd

# =====================================
# PATHS
# =====================================

BASE_DIR = Path(__file__).resolve().parents[2]

ENRON_PATH = (
    BASE_DIR
    / "datasets"
    / "raw"
    / "enron_mail"
)

OUTPUT_PATH = (
    BASE_DIR
    / "datasets"
    / "processed"
    / "enron_legitimate.csv"
)

# =====================================
# EXTRACT EMAILS
# =====================================

emails = []

print("Reading Enron emails...")

count = 0

for file_path in ENRON_PATH.rglob("*"):

    if file_path.is_file():

        try:
            with open(
                file_path,
                "r",
                encoding="utf-8",
                errors="ignore",
            ) as file:

                content = file.read()

            content = content.strip()

            # Ignore tiny junk files
            if len(content) < 50:
                continue

            emails.append(
                {
                    "email_text": content,
                    "label": "legitimate",
                }
            )

            count += 1

            if count % 10000 == 0:
                print(
                    f"{count} emails processed..."
                )

        except Exception:
            continue

# =====================================
# SAVE DATASET
# =====================================

df = pd.DataFrame(emails)

OUTPUT_PATH.parent.mkdir(
    parents=True,
    exist_ok=True,
)

df.to_csv(
    OUTPUT_PATH,
    index=False,
)

print("\nDone!")
print(
    f"Total emails extracted: {len(df)}"
)

print(
    f"Saved at:\n{OUTPUT_PATH}"
)