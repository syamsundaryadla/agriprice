from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random
import os
import pandas as pd
# import joblib # Uncomment when model is ready

app = FastAPI()

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    commodity: str
    location: str
    date: str = None

from enam_scraper import fetch_enam_data

@app.get("/")
def read_root():
    return {"message": "Agri-Price ML Backend is Running"}

@app.get("/enam-prices")
def get_enam_prices():
    data = fetch_enam_data()
    if not data:
        # Return mock data if scrape fails (fallback)
        return {"status": "error", "message": "Scraping failed", "data": []}
        
    return {"status": "success", "count": len(data), "data": data}

@app.post("/predict")
def predict_price(request: PredictionRequest):
    # TODO: Load real model and predict
    # model = joblib.load('data/price_model.pkl')
    # prediction = model.predict(...)
    
    print(f"Received prediction request for {request.commodity} in {request.location}")

    # Mock Prediction Logic (until dataset is available)
    base_price = 2000 + random.randint(-200, 500)
    confidence = round(random.uniform(0.75, 0.95), 2)
    
    return {
        "commodity": request.commodity,
        "predicted_price": base_price,
        "unit": "Quintal",
        "confidence_score": confidence,
        "is_mock": True,
        "message": "Real model waiting for dataset. Using mock data."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
