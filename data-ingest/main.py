import yfinance as yf
import numpy as np
import json

def read_stock_list() -> list:
    with open("stocks", "r") as f:
        return f.read().splitlines()


def pull_data(stock: str, interval: str, period: str) -> list[float]:
    df = yf.Ticker(stock).history(interval=interval, period=period)

    # Get the open column
    open_vals = df["Open"].values.tolist()
    
    # Round to 2 decimal places
    open_vals = [round(x, 2) for x in open_vals]

    return open_vals


def main():
    stocks = read_stock_list()

    # Get the 5 minute data for the last 5 days
    week_data = []
    for d in stocks:
        stock, name, icon = d.split()
        data = pull_data(stock, "1m", "5d")
        print(
            "Got weekly data for "
            + stock
            + "... remaining: "
            + str(len(stocks) - stocks.index(d))
        )

        # Remove every 4 elements (keep index 0, 5, 10, etc.)
        data = [data[i] for i in range(len(data)) if i % 4 == 0]

        week_data.append(data)
        
        
    # Get the hour data for the last month
    month_data = []
    for d in stocks:
        stock, name, icon = d.split()
        data = pull_data(stock, "1h", "1mo")
        print(
            "Got monthly data for "
            + stock
            + "... remaining: "
            + str(len(stocks) - stocks.index(d))
        )
        month_data.append(data)

    # Get the daily data for the last year
    year_data = []
    for d in stocks:
        stock, name, icon = d.split()
        data = pull_data(stock, "1d", "1y")
        print(
            "Got yearly data for "
            + stock
            + "... remaining: "
            + str(len(stocks) - stocks.index(d))
        )
        year_data.append(data)
    
    # Get the open prices for the last day
    stock_open_prices = []
    for d in stocks:
        stock, name, icon = d.split()
        data = pull_data(stock, "1d", "1d")
        print(
            "Got open price for "
            + stock
            + "... remaining: "
            + str(len(stocks) - stocks.index(d))
        )
        stock_open_prices.append(data[0])
        
    # Format output JSON
    data = {
        "stocks": [stock.split()[0] for stock in stocks],
        "stockNames": [stock.split()[1] for stock in stocks],
        "stockIcons": [stock.split()[2] for stock in stocks],
        "stockOpenPrices": stock_open_prices,
        "week": week_data,
        "month": month_data,
        "year": year_data,
    }
    
    # Save to file
    with open("../src/data.json", "w") as f:
        json.dump(data, f, indent=4)
    

main()
