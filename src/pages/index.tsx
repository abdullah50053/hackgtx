import ChatContainer from "@/components/container/ChatContainer";
import MainContainer from "@/components/container/MainContainer";
import { Chat, Stock } from "@/lib/types";
import { useState } from "react";


interface HomeProps {
  stocks: Stock[]
}

export default function Home({ stocks }: HomeProps) {
  return (
    <div className="flex flex-row m-0 p-0 w-screen h-screen text-custom-gray-4">
      <ChatContainer />
      <MainContainer stocks={stocks} currentStockIndex={0} />
    </div>
  )
}

export async function getServerSideProps() {
  const watchedTickers = ["TSLA", "NFLX", "AMD", "MSFT", "AAPL"]
  const stocks: Stock[] = []

  for (let ticker of watchedTickers) {
    const priceRes = await fetch(`http://localhost:3000/api/prices/today?stock=${ticker}`, {
      mode: "cors",
      method: "GET"
    })
    const priceData = await priceRes.json()
    if (priceRes.status !== 200) {
      console.error(priceRes.status, priceRes.statusText, priceData.error)
    }
    const prices = priceData.prices

    const metaRes = await fetch(`http://localhost:3000/api/stock?stock=${ticker}`, {
      mode: "cors",
      method: "GET"
    })
    const metaData = await metaRes.json()
    if (metaRes.status !== 200) {
      console.error(metaRes.status, metaRes.statusText, metaData.error)
    }

    stocks.push({
      ticker,
      name: metaData.name,
      delta: 1,
      iconUrl: metaData.icon,
      price: metaData.price,
      prices: prices
    })
  }

  return {
    props: {
      stocks
    }
  }
}