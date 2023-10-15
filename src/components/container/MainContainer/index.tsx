import Info from "@/components/Info";
import Toolbar from "@/components/Toolbar";
import Watchlist from "@/components/Watchlist";
import { Stock } from "@/lib/types";
import { UserData, getUser } from "@/lib/user";

interface MainContainerProps {
    user?: UserData
    setUser: any
    stocks: Stock[]
    currentStockIndex: number
}

export default function MainContainer({ user, setUser, stocks, currentStockIndex }: MainContainerProps) {
    let prices = (stocks.length > 0 && currentStockIndex >= 0 && currentStockIndex < stocks.length) ? stocks[currentStockIndex].prices ?? [] : []
    const watchedStocks: Stock[] = []
    if (user) {
        stocks.forEach((s) => {
            if (user.watchlist.includes(s.ticker)) watchedStocks.push(s)
        })
    }
    return (
        <div className="scrollbar flex flex-grow flex-col m-0 p-0 w-auto h-full bg-gray-100 overflow-y-auto overflow-x-hidden items-start">
            <Toolbar user={user} />
            <Watchlist watched={watchedStocks} />
            <Info user={user} setUser={setUser} stock={stocks[currentStockIndex]} prices={prices} lastUpdate={new Date()}/>
        </div>
    )
}