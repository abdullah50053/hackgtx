FROM node:18-alpine AS base

FROM python:3.9 AS data-ingest

WORKDIR /data

COPY ./data-ingest /data

RUN pip install yfinance

RUN python3 main.py

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./

RUN npm ci

# Production image
FROM base as runner
WORKDIR /app

ENV NODE_ENV production

COPY . .
COPY --from=data-ingest /data/data.json /app/src/data.json
COPY --from=deps /node_modules ./node_modules

RUN npm run build

EXPOSE 3000

ENV PORT 3000

ENV NEXT_PUBLIC_FIREBASE_API_KEY $NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN $NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID $NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET $NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID $NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID $NEXT_PUBLIC_FIREBASE_APP_ID 
ENV NEXT_PUBLIC_ENDPOINT $NEXT_PUBLIC_ENDPOINT

ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
