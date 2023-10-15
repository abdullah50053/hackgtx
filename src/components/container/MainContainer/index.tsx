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
            <Info stock={stocks[currentStockIndex]} prices={prices} lastUpdate={new Date()}/>
        </div>
    )
}