import { Stock } from "@/lib/types"
import MissingSVG from "../svg/MissingSVG"
import Chart from "../Chart"
import ArrowLongSVG from "../svg/ArrowLongSVG"

interface WatchedStockCardProps {
    stock: Stock
}

export default function WatchedStockCard({ stock }: WatchedStockCardProps) {
    let prices = []
    for (let i = 0; i < 25; i++) {
        prices.push(Math.random() * 10)
    }
    return (
        <div className="transition flex flex-col w-56 h-full px-4 py-2 hover:bg-slate-400 bg-gray-500">
            <div className="flex flex-row">
                {/* Icon + Name */}
                <div className="flex flex-row items-center">
                    {stock.iconUrl ? <img src={stock.iconUrl!} className="w-8 h-8"></img> : <MissingSVG className="w-8 h-8" />}
                    <div className="ml-2 font-bold">{stock.name}</div>
                </div>
                {/* Graph */}
                <Chart className="ml-4" width={85} height={50} prices={prices} ticker={stock.ticker} delta={stock.delta} inComponent={true} />
            </div>
            {/* Stock Price */}
            <div className="flex flex-row items-center">
                <div className="font-bold">Share Price</div>
                <div className="flex-grow justify-end font-black text-right">${stock.price}</div>
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