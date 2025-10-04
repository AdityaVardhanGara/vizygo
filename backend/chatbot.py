
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os

router = APIRouter()

OPENROUTER_API_KEY = "your_key"


# Compressed Vizygo context for all queries
VIZYGO_CONTEXT = (
    "Vizygo: Bangalore-based bike rental platform with 1000+ bikes at 3 locations. "
    "Affordable, sustainable urban mobility. No security deposit, 24/7 support, no-questions-asked refund. "
    "Minimum rental: 1 month. Docs: driver's licence, aadhar, address proof. Pricing from ₹3000/month, varies by model/location. "
    "Popular bikes: Bajaj Avenger 220 (Indiranagar), CB Hornet 160 (BTM), FZ V3 (Electronic City), CB 350 (Koramangala), Classic 350 (Whitefield), Activa 6G (Jayanagar), Access 125 (HSR), TVS NTORQ 125 (Koramangala). "
    "\n\nFAQs: Rent via web app or Instagram. Min rental 1 month. Docs needed: licence, aadhar, address. Pricing by model.\n"
    "\nCustomer Reviews: 4.8⭐. Praised for service, support, and bike quality.\n"
    "\nTerms: Min booking 1 month. No refund for early return in first month. After 1 month, refund for unused days. Inspect bike before taking. Must be 18+ with valid licence. Basic maintenance covered; damages from misuse are customer responsibility. Follow traffic rules. Customer pays for any damage. Support available for all queries.\n"
    "\nIf your query is not understood: Not able to understand the query, feel free to reach out to 9182762800 on WhatsApp for further queries."
)

class ChatRequest(BaseModel):
    message: str

@router.post("/chatbot-reply")
def chatbot_reply(request: ChatRequest):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not set.")
    try:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=OPENROUTER_API_KEY,
        )
        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",
            messages=[
                {"role": "system", "content": VIZYGO_CONTEXT},
                {"role": "user", "content": request.message}
            ]
        )
        reply = completion.choices[0].message.content
        # Fallback if LLM doesn't understand
        fallback = "Not able to understand the query, feel free to reach out to 9182762800 on WhatsApp for further queries."
        if not reply or "not able to understand" in reply.lower():
            reply = fallback
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {e}")
