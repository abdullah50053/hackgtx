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
    let res = await fetch(`http://localhost:3000/api/today?stock=${ticker}`, {
      mode: "cors",
      method: "GET"
    })
    const data = await res.json()
    if (res.status !== 200) {
      console.error(res.status, res.statusText, data.error)
    }
    const prices = data.prices
    stocks.push({
      ticker,
      name: "AAPL",
      delta: data.delta,
      price: data.price,
      prices
    })
  }

  return {
    props: {
      stocks
    }
  }
}