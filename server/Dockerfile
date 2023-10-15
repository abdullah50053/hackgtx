FROM python:3.9

WORKDIR /app

RUN pip install flask yfinance python-dotenv openai flask_cors

COPY . .

ENV OPENAI_API_KEY $OPENAI_API_KEY

CMD [ "python3", "-m" , "flask", "--app", "main", "run", "--host=0.0.0.0"]
