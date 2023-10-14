# API Endpoints

- GET /today?stock={stock_name}

## Valid stock names

From https://www.nasdaq.com/market-activity/quotes/historical

- AAPL (Apple)
- SBUX (Starbucks)
- MSFT (Microsoft)
- CSCO (Cisco Systems)
- QCOM (QUALCOMM)
- META (Meta)
- AMZN (Amazon.com)
- TSLA (Tesla)
- AMD (Advanced Micro Devices)
- NFLX (Netflix)

# Generate Random Trade Data

percent chance to go down based on delta: diff bw curr + open price

-   [delta] = [up chance] [down chance]
-   0 = 50% 50%
-   -1 = 100% 0%
-   1 = 0% 100%
-   0.5 = 25% 75%

will generate up to the current minute's data points for today, then generate 1/min

# Paper Trading

idfk
