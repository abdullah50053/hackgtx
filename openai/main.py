import os
import openai
import time
import random

# Authenticate with OpenAI API
# openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = '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'

# Define function to send message to OpenAI API and get response
def ask_openai(prompt):
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=1024,
        temperature=0
    )
    message = response.choices[0].text.strip()
    return message

# Define function to handle user input and OpenAI API response
def chat():
    ticker = ['AAPL', 'META', 'TSLA', 'AMZN', 'GOOG', 'MSFT', 'FB', 'NVDA', 'PYPL', 'ADBE', 'INTC', 'CMCSA', 'NFLX', 'PEP', 'CSCO', 'AVGO', 'TMUS', 'TXN', 'QCOM', 'CHTR', 'INTU', 'AMGN', 'SBUX', 'AMD', 'ISRG', 'MDLZ', 'ZM', 'MU', 'BKNG', 'GILD', 'ADP', 'FISV', 'ATVI', 'CSX', 'ADSK', 'ILMN', 'VRTX', 'REGN', 'BIIB', 'LRCX', 'ADI', 'MRNA', 'MNST', 'EBAY', 'JD', 'AMAT', 'BIDU', 'MELI', 'KHC', 'WBA', 'EXC', 'ROST', 'NXPI', 'DOCU', 'WDAY', 'KLAC', 'MAR', 'LULU', 'EA', 'CTSH', 'SNPS', 'DXCM', 'ORLY', 'XEL', 'PAYX', 'ASML', 'CDNS', 'IDXX', 'ALGN', 'PCAR', 'SGEN', 'XLNX', 'ANSS', 'SIRI', 'VRSK', 'CPRT', 'FAST', 'NTES', 'VRSN', 'DLTR', 'CERN', 'SWKS', 'MXIM', 'INCY', 'CDW', 'CHKP', 'TCOM', 'ULTA', 'FOXA', 'FOX', 'NTAP', 'BMRN', 'CTXS', 'TTWO', 'EXPE', 'WDC', 'SNPS', 'CTAS', 'MCHP', 'XRAY', 'MRVL', 'MXIM', 'NTAP', 'CDW', 'CHKP', 'TCOM', 'ULTA', 'FOXA', 'FOX', 'NTAP', 'BMRN', 'CTXS', 'TTWO', 'EXPE', 'WDC', 'SNPS', 'CTAS', 'MCHP', 'XRAY', 'MRVL', 'MXIM', 'NTAP', 'CDW', 'CHKP', 'TCOM', 'ULTA']
    sentiment = ['positive', 'negative', 'neutral']
    user_experience = ['beginner', 'intermediate', 'advanced']
    past = [
    143.6677082660222, 142.05726049529892, 145.83485190424906, 144.09516484314776,
    145.02962908215443, 146.97807056680443, 149.34403286595008, 151.59069857580292,
    151.09366869588553, 148.17099625023823, 156.5711636232206, 153.33038561697853,
    154.53324642602882, 151.2725897845585, 141.95785449789213, 142.06388202909318,
    138.55883735297928, 140.82914193369797, 137.96138608792586, 146.2460479736328,
    149.37272176407356, 149.64155825167242, 152.9375096893802, 149.23329630566616,
    150.83646247349148, 152.0512760661458, 149.73116955132988, 148.11523437523332
    ]

    future = [
        149.78096279681515, 151.1849885088291, 148.24750693206525, 146.01701690101933,
        144.19480233115186, 148.0881788215148, 148.49645532465777, 147.37124786153967,
        150.27884828657326, 146.6742208323492, 142.76091690562077, 142.91029015257863,
        144.9515776259649, 143.88611171452328, 149.33288777832163, 146.03693299146755,
        141.1975919489063, 137.06521252037282, 134.6256268401695, 132.68390657976732,
        136.22878034227125, 133.98834669902533, 131.85743846800435, 130.85172696737467,
        130.47333812032483, 129.92567102156607, 129.39792526896935, 130.34388446832745,
        128.113420791726, 127.22719356509766, 126.34196633846933, 125.456739111841
    ]

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["bye", "goodbye", "exit", "thanks", "thank you"]:
            print("Bot: Goodbye!")
            break
        ticker = f"{user_input}"
        prompt = """Act as a financial advisor explaining to me, a $USERLEVEL stock trader. 
                    For the stock $TICKER, last month's data is: 
                    '''
                    $PAST
                    '''
                    next month’s data is: 
                    '''
                    $FUTURE
                    '''
                    The current sentiment for the stock is $SENTIMENT. Explain if I should buy the stock.
                    Limit output to 3 sentences."""
        print(prompt)

        prompt = prompt.replace("$TICKER", ticker)
        prompt = prompt.replace("$SENTIMENT", random.choice(sentiment))
        prompt = prompt.replace("$USERLEVEL", random.choice(user_experience))
        prompt = prompt.replace("$PAST", ', '.join(map(str, past)))
        prompt = prompt.replace("$FUTURE", ', '.join(map(str, future)))
        print(prompt)

        bot_response = ask_openai(prompt)
        print(f"Bot: {bot_response}")
        time.sleep(1)

# Start chat application
if __name__ == "__main__":
    print("Hi, what stock would you like to trade today?")
    chat()
