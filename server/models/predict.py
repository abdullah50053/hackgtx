import pandas as pd
from .train import pull_data


def predict(stock: str, days: int) -> list[float]:
    # Pull data
    df = pull_data(stock)

    # "Predict" future data
    first_day_df = df.head(days+1)

    # Create a list of deltas
    deltas = []
    for i in range(0, days+1):
        deltas.append(first_day_df["Close"].iloc[i] - first_day_df["Close"].iloc[i - 1])

    # Create list of predictions
    predictions = [first_day_df["Close"].iloc[-1]]
    for i in range(0, days+1):
        predictions.append(predictions[i] + deltas[i])

    return predictions[1:]
