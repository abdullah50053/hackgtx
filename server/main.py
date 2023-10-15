from dotenv import load_dotenv

load_dotenv()

from flask import Flask
from models.predict import predict
from util import ai

app = Flask(__name__)


@app.get("/predict/<stock>")
def predict_stock(stock: str):
    pred = predict(stock.upper(), 31)
    return {"predictions": pred}


@app.post("/chat/buy/<ticker>/<experience>")
def chat(ticker: str, experience: str):
    return ai.run_do_i_buy(ticker=ticker.upper(), experience=experience)

