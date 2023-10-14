import ChatContainer from "@/components/container/ChatContainer";
import MainContainer from "@/components/container/MainContainer";
import { Chat, Stock } from "@/lib/types";
import { useState } from "react";


interface HomeProps {
  stocks: Stock[]
}

export default function Home({ stocks }: HomeProps) {
  return <div />
  return (
    <div className="flex flex-row m-0 p-0 w-screen h-screen text-custom-gray-4">
      <ChatContainer />
      <MainContainer stocks={[]} currentStockIndex={0} />
    </div>
  )
}

export async function getStaticProps() {
  const watchedTickers = ["TSLA", "NFLX", "AMD", "MSFT", "AAPL"]
  console.log(watchedTickers)
  const stocks: Stock[] = []
  fetch("/api/today?stock=AAPL", {
    mode: "no-cors"
  }).then((res) => console.log(res))

  /*await watchedTickers.forEach(async (ticker) => {
    let res = await fetch("localhost:3000/api/today", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        stock: ticker
      })
    })
    const data = await res.json()
    if (res.status !== 200) {
      console.error(res.status, res.statusText, data.error)
    }
    const prices = data.prices
    stocks.push({
      ticker,
      name: "AAPL",
      delta: prices.delta,
      price: prices.price,
      prices
    })
  })*/
  console.log(stocks)

  return {
    props: {
      stocks
    }
  }
}