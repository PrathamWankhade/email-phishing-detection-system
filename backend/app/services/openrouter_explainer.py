import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

MODEL = "meta-llama/llama-3.3-70b-instruct"

SYSTEM_PROMPT = """You are a cybersecurity phishing analyst. Given an email and its classification result, explain why it was flagged. Return exactly 3 short bullet points in simple language covering relevant phishing indicators such as urgency, credential requests, suspicious links, fake domains, or social engineering tactics. Keep it under 80 words total."""


def generate_ai_explanation(email_text: str, sender: str, prediction: str, confidence: float) -> list[str]:
    try:
        prompt = f"Prediction: {prediction}\nConfidence: {confidence}%\nSender: {sender}\n\nEmail:\n{email_text[:2000]}"

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
            max_tokens=200,
        )

        text = response.choices[0].message.content.strip()
        reasons = [line.strip("•- ") for line in text.split("\n") if line.strip()]
        return reasons

    except Exception as error:
        print("OpenRouter error:", error)
        return ["AI explanation unavailable."]
