import Login from "@/components/Auth";
import Profile from "@/components/Profile";
import ChatContainer from "@/components/container/ChatContainer";
import MainContainer from "@/components/container/MainContainer";
import { Chat, Stock } from "@/lib/types";
import { UserData, getUser } from "@/lib/user";
import { useEffect, useState } from "react";


interface HomeProps {
  stocks: Stock[]
}

export default function Home({ stocks }: HomeProps) {
  const [user, setUser] = useState<UserData | undefined>(undefined)
  const [profile, setProfileView] = useState(false)
  const [watchedStocks, setWatchedStocks] = useState<string[]>([])
  const [currentStockIndex, setCurrentStockIndex] = useState<number>(0)

  useEffect(() => {
    if (user) {
      if (watchedStocks.length !== user.watchlist.length) setWatchedStocks(user.watchlist);
      if (!profile && (!user.first_name || !user.last_name)) setProfileView(true);
      return;
    }
    setUser(getUser());
  })

  return (
    <div className="flex flex-row m-0 p-0 w-screen h-screen text-custom-gray-4">
      <ChatContainer />
      <MainContainer user={user} setUser={setUser} stocks={stocks} currentStockIndex={currentStockIndex} setCurrentStockIndex={setCurrentStockIndex} setProfileView={setProfileView} />
      {!user && <Login setUser={setUser} />}
      {profile && <Profile setUser={setUser} setProfile={setProfileView} />}
    </div>
  )
}

export async function getServerSideProps() {
  const watchedTickers = ["AAPL", "SBUX", "MSFT", "CSCO", "QCOM", "META", "AMZN", "TSLA", "AMD", "NFLX"]
  const stocks: Stock[] = []

  for (let ticker of watchedTickers) {
    const priceRes = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/prices/today?stock=${ticker}`, {
      mode: "cors",
      method: "GET"
    })
    const priceData = await priceRes.json()
    if (priceRes.status !== 200) {
      console.error(priceRes.status, priceRes.statusText, priceData.error)
    }
    const prices = priceData.prices

    const metaRes = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/stock?stock=${ticker}`, {
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