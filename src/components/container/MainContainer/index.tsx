import Info from "@/components/Info";
import Toolbar from "@/components/Toolbar";
import Watchlist from "@/components/Watchlist";
import { Stock } from "@/lib/types";
import { Position, UserData, getUser } from "@/lib/user";

interface MainContainerProps {
    user?: UserData
    setUser: any
    stocks: Stock[]
    currentStockIndex: number
    setCurrentStockIndex: any
    setProfileView: any
    updatePosition: any
}

export default function MainContainer({ user, setUser, stocks, currentStockIndex, setCurrentStockIndex, setProfileView }: MainContainerProps) {
    let prices = (stocks.length > 0 && currentStockIndex >= 0 && currentStockIndex < stocks.length) ? stocks[currentStockIndex].prices ?? [] : []
    const watchedStocks: Stock[] = []
    if (user) {
        stocks.forEach((s) => {
            if (user.watchlist.includes(s.ticker)) watchedStocks.push(s)
        })
    }
    return (
        <div className="scrollbar flex flex-grow flex-col m-0 p-0 w-auto h-full bg-gray-100 overflow-y-auto overflow-x-hidden items-start">
            <Toolbar user={user} stocks={stocks} setCurrentStockIndex={setCurrentStockIndex} setProfileView={setProfileView} />
            <Watchlist stocks={stocks} watched={watchedStocks} setCurrentStockIndex={setCurrentStockIndex} />
            <Info user={user} stock={stocks[currentStockIndex]} prices={prices} lastUpdate={new Date()} updatePosition={(user: UserData, stock: Stock, action: "buy" | "sell") => {
              fetch(`http://localhost:3000/api/trade/${action}`, {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                  email: user.email,
                  stock: stock.ticker,
                  shares: 1
                })
              }).then(async (result) => {
                if (result.status !== 200) {
                  return console.log(`Position update error ${result.status}...`)
                }
                const data = await result.json()
                if (!data.ok) {
                  return console.log(`Buy not ok ${data.error}...`)
                }
                let positions = user.positions.map((p) => p)
                if (action === "sell") {
                  let pos = positions.find((p) => p.ticker === stock.ticker)!
                  pos.shares -= 1
                  pos.lastPrice = stock.price
                  if (pos.shares <= 0) {
                    positions = positions.filter((p) => p.ticker !== pos.ticker)
                  }
                } else {
                  let pos = positions.find((p) => p.ticker === stock.ticker)
                  if (!pos) {
                    pos = {
                      ticker: stock.ticker,
                      lastPrice: stock.price,
                      shares: 1
                    }
                    positions.push(pos)
                  }
                  pos.shares += 1
                  pos.lastPrice = stock.price
                }
                const userData: UserData = {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  password: user.password,
                  email: user.email,
                  watchlist: user.watchlist,
                  experience: user.experience,
                  money: user.money,
                  positions
                }
                localStorage.setItem("user", JSON.stringify(userData))
                setUser(undefined)
              }).catch((err) => console.log(err))
            }} updateWatchlist={(user: UserData) => {
        fetch("http://localhost:3000/api/profile", {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            watchlist: user.watchlist,
            positions: user.positions,
            experience: user.experience,
            money: user.money
          }),
        }).then(async (result) => {
          if (result.status !== 200) {
            return console.log(`Profile update error ${result.status}...`);
          }
          const data = (await result.json()).data;
          const userData: UserData = {
            first_name: data.first_name,
            last_name: data.last_name,
            password: user.password,
            email: user.email,
            watchlist: user.watchlist,
            positions: user.positions,
            experience: user.experience,
            money: user.money
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(undefined);
        })
        .catch((err) => {
          console.log(err);
        });
      }} />
        </div>
    )
}