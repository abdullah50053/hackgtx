from models.train import pull_data


def predict(stock: str, days: int) -> (list[float], list[float]):
    """
    Predicts the future stock price for the next `days` days.
    Also returns the past `days` days of stock prices.
    """
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
        
    # Create list of past days data
    past = []
    for i in range(0, days+1):
        past.append(first_day_df["Close"].iloc[i])

    return (past, predictions[1:])
