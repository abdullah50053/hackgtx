import Info from "@/components/Info";
import Toolbar from "@/components/Toolbar";
import Watchlist from "@/components/Watchlist";
import { Stock } from "@/lib/types";

interface MainContainerProps {
    stocks: Stock[]
    currentStockIndex: number
}

export default function MainContainer({ stocks, currentStockIndex }: MainContainerProps) {
    let prices = stocks[currentStockIndex].prices ?? []
    return (
        <div className="scrollbar flex flex-grow flex-col m-0 p-0 w-auto h-full bg-gray-100 overflow-y-auto overflow-x-hidden items-start">
            <Toolbar />
            <Watchlist watched={stocks} />
            <Info stock={{
                ticker: "AAPL",
                name: "Apple",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/154/154870.png",
                price: 310.4,
                delta: 11.31
            }} prices={prices} lastUpdate={new Date()}/>
        </div>
    )
}