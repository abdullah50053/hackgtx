import os
import openai
import time
import random

from models import predict

# Authenticate with OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")
if openai.api_key == None:
    print("OpenAI API key not found!")
    exit()
    
sentiment = ['positive', 'negative', 'neutral']

def run_do_i_buy(ticker: str, experience: str):
    prompt = """Act as a financial advisor explaining to me, a $USERLEVEL stock trader. 
                For the stock $TICKER, last month's data is: 
                '''
                $PAST
                '''
                next month’s data is: 
                '''
                $FUTURE
                '''
                Based on the information provided and the market sentiment, explain if I should buy the stock.
                Limit output to 3 sentences."""
                
    past, future = predict.predict(ticker, 31)

    prompt = prompt.replace("$TICKER", ticker)
    prompt = prompt.replace("$SENTIMENT", random.choice(sentiment))
    prompt = prompt.replace("$USERLEVEL", experience)
    prompt = prompt.replace("$PAST", ', '.join(map(str, past)))
    prompt = prompt.replace("$FUTURE", ', '.join(map(str, future)))
    
    response = ask_openai(prompt)
    return response


def run_when_to_buy(ticker: str, experience: str):
    prompt = """Act as a financial advisor explaining to me, a $USERLEVEL stock trader. 
                For the stock $TICKER, last month's data is: 
                '''
                $PAST
                '''
                next month’s data is: 
                '''
                $FUTURE
                '''
                The current sentiment for the stock is $SENTIMENT. Give an exact number of days from today when I should buy the stock and your reasoning. Be confident in your decision.
                Limit output to 2 sentences."""
                
    past, future = predict.predict(ticker, 31)

    prompt = prompt.replace("$TICKER", ticker)
    prompt = prompt.replace("$SENTIMENT", random.choice(sentiment))
    prompt = prompt.replace("$USERLEVEL", experience)
    prompt = prompt.replace("$PAST", ', '.join(map(str, past)))
    prompt = prompt.replace("$FUTURE", ', '.join(map(str, future)))

    response = ask_openai(prompt)
    return response
    
    
def run_get_info(ticker: str, experience: str):
    prompt = """Act as a financial advisor explaining to me. Give an unbiased one-paragraph summary of $TICKER to a $USERLEVEL trader."""

    prompt = prompt.replace("$TICKER", ticker)
    prompt = prompt.replace("$USERLEVEL", experience)

    response = ask_openai(prompt)
    return response


def run_any(data: str):
    prompt = data
    response = ask_openai(prompt)
    return response
    

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
    
    past = [0, 1]
    future = [1, 2]

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
