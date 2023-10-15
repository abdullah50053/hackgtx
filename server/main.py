from flask import Flask
from models.predict import predict

app = Flask(__name__)


@app.get("/predict/<stock>")
def predict_stock(stock: str):
    pred = predict(stock.upper(), 31)
    return {"predictions": pred}
