import os
import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_ai_explanation(
    email_text: str,
    sender: str,
    prediction: str,
    confidence: float,
):

    try:

        prompt = f"""
You are a cybersecurity phishing analyst.

Explain why this email
was classified.

Prediction:
{prediction}

Confidence:
{confidence}%

Sender:
{sender}

Email:
{email_text}

Rules:
- Return exactly 3 short bullet points
- Simple language
- Mention phishing indicators
if relevant
- Mention urgency,
credential requests,
links, fake domains,
social engineering
- Max 80 words
"""

        response = (
            model.generate_content(
                prompt
            )
        )

        text = (
            response.text
            .strip()
        )

        reasons = [
            line.strip("•- ")
            for line
            in text.split("\n")
            if line.strip()
        ]

        return reasons

    except Exception as error:

        print(
            "Gemini error:",
            error
        )

        return [
            "AI explanation unavailable."
        ]