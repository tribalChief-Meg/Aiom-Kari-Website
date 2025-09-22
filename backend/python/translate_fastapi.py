# -*- coding: utf-8 -*-
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import MarianMTModel, MarianTokenizer
import uvicorn

# Define request body schema
class TranslationRequest(BaseModel):
    text: str

# Load model and tokenizer
model_path = "./model"
tokenizer = MarianTokenizer.from_pretrained(model_path)
model = MarianMTModel.from_pretrained(model_path)

# Init FastAPI app
app = FastAPI()

# Enable CORS (adjust origin as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/translate")
async def translate_text(request: TranslationRequest):
    text = request.text
    if not text.strip():
        return {"error": "Text is empty"}
    
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    translated = model.generate(**inputs, max_length=512)
    output = tokenizer.decode(translated[0], skip_special_tokens=True)
    
    # return {"translated": output}
    return {"translated": output.encode("utf-8").decode("utf-8")}


# Optional: run directly with `python translate_fastapi.py`
if __name__ == "__main__":
    uvicorn.run("translate_fastapi:app", host="0.0.0.0", port=8000, reload=True)
