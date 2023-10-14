import dynamic from "next/dynamic"
import { Stock } from "@/lib/types"
import MissingSVG from "../svg/MissingSVG"
import ArrowLongSVG from "../svg/ArrowLongSVG"

const Chart = dynamic(
    import("../Chart"),
    { ssr: false }
)

interface WatchedStockCardProps {
    stock: Stock
}

export default function WatchedStockCard({ stock }: WatchedStockCardProps) {
    let prices = []
    for (let i = 0; i < 25; i++) {
        prices.push(Math.random() * 10)
    }
    return (
        <div className="transition text-black flex flex-shrink-0 flex-col w-72 h-full px-12 py-6 hover:bg-gray-200 cursor-pointer">
            <div className="flex flex-row">
                {/* Icon + Name */}
                <div className="flex flex-row items-center">
                    {stock.iconUrl ? <img src={stock.iconUrl!} className="w-8 h-8"></img> : <MissingSVG className="w-8 h-8" />}
                    <div className="ml-2 font-bold">{stock.name}</div>
                </div>
                {/* Graph */}
                <div className="ml-auto w-16 h-12 justify-end">
                    <Chart prices={prices} ticker={stock.ticker} delta={stock.delta} inComponent={true} />
                </div>
            </div>
            {/* Stock Price */}
            <div className="flex flex-row items-center">
                <div className="font-bold">Share Price</div>
                <div className="flex-grow justify-end font-black text-right">${stock.price.toFixed(2)}</div>
            </div>
            {/* Delta */}
            <div className="flex flex-row items-center">
                <div className="font-bold">Delta</div>
                <div className={`flex flex-grow flex-row items-center justify-end ${stock.delta > 0 ? "text-green-700" : "text-red-600"}`}>
                    <div className="font-black text-right">{stock.delta}%</div>
                    <ArrowLongSVG className={`w-3 h-3 m-0 p-0 ${stock.delta > 0 ? "" : "rotate-180"}`} />
                </div>
            </div>
        </div>
    )
}