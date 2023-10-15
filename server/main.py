from dotenv import load_dotenv

load_dotenv()

from flask import Flask, request
from flask_cors import CORS, cross_origin
from models.predict import predict
from util import ai

app = Flask(__name__)

CORS(allow_headers="*")
cors = CORS(app)


@app.get("/predict/<stock>")
@cross_origin()
def predict_stock(stock: str):
    pred = predict(stock.upper(), 31)
    return {"predictions": pred}


@app.post("/chat/buy/<ticker>/<experience>")
@cross_origin()
def chat(ticker: str, experience: str):
    return ai.run_do_i_buy(ticker=ticker.upper(), experience=experience)


@app.post("/chat/buywhen/<ticker>/<experience>")
@cross_origin()
def chat1(ticker: str, experience: str):
    return ai.run_when_to_buy(ticker=ticker.upper(), experience=experience)


@app.post("/chat/info/<ticker>/<experience>")
@cross_origin()
def chat2(ticker: str, experience: str):
    return ai.run_get_info(ticker=ticker.upper(), experience=experience)

@app.post("/chat/any")
@cross_origin()
def chat3():
    # Get body
    body = request.get_json()
    data = body["data"]

    return ai.run_any(data)
