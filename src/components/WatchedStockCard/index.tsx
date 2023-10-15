import dynamic from "next/dynamic"
import { Stock } from "@/lib/types"
import MissingSVG from "../svg/MissingSVG"
import ArrowLongSVG from "../svg/ArrowLongSVG"

const Chart = dynamic(
    import("../Chart"),
    { ssr: false }
)

interface WatchedStockCardProps {
    stocks: Stock[]
    stock: Stock
    positionState: any
    setCurrentStockIndex: any
}

export default function WatchedStockCard({ stocks, stock, positionState, setCurrentStockIndex }: WatchedStockCardProps) {
    const returns = positionState ? positionState.returns : 0
    let prices = stock.prices ?? []
    return (
        <div className="transition text-black flex flex-shrink-0 flex-col w-72 h-full px-12 py-6 hover:bg-gray-200 cursor-pointer" onClick={() => {
            let stockIndex = -1
            stocks.forEach((s, i) => {
                if (s.ticker === stock.ticker) stockIndex = i
            })
            if (stockIndex === -1) return
            setCurrentStockIndex(stockIndex)
        }}>
            <div className="flex flex-row">
                {/* Icon + Name */}
                <div className="flex flex-row items-center">
                    {stock.iconUrl ? <img src={stock.iconUrl!} className="w-8 h-8"></img> : <MissingSVG className="w-8 h-8" />}
                    <div className="ml-2 font-bold">{stock.name}</div>
                </div>
                {/* Graph */}
                <div className="ml-auto w-16 h-12 justify-end">
                    <Chart prices={prices} ticker={stock.ticker} delta={returns} inComponent={true} />
                </div>
            </div>
            {/* Stock Price */}
            <div className="flex flex-row items-center">
                <div className="font-bold">Share Price</div>
                <div className="flex-grow justify-end font-black text-right">${stock.price.toFixed(2)}</div>
            </div>
            {/* Delta */}
            <div className="flex flex-row items-center">
                <div className="font-bold">Returns</div>
                <div className={`flex flex-grow flex-row items-center justify-end ${returns >= 0 ? "text-green-700" : "text-red-600"}`}>
                    <div className="font-black text-right">{returns.toFixed(2)}%</div>
                    <ArrowLongSVG className={`w-3 h-3 m-0 p-0 ${returns >= 0 ? "" : "rotate-180"}`} />
                </div>
            </div>
        </div>
    )
}