import dynamic from "next/dynamic"
import { Stock } from "@/lib/types";
import MissingSVG from "../svg/MissingSVG";
import ArrowLongSVG from "../svg/ArrowLongSVG";
import { ResponsiveContainer } from "recharts";

const Chart = dynamic(
    import("../Chart"),
    { ssr: false }
)

interface InfoProps {
    stock: Stock
    prices: number[]
    lastUpdate: Date
}

export default function Info({ stock, prices, lastUpdate }: InfoProps) {
    return (
        <div className="rounded-3xl flex flex-col w-11/12 my-6 mx-auto p-4 bg-orange-500">
            {/* Top Bar */}
            <div className="flex flex-row w-full h-fit bg-blue-500">
                {/* Icon + Name + Ticker */}
                <div className="flex flex-row items-center">
                    {stock.iconUrl ? <img src={stock.iconUrl!} className="w-12 h-12"></img> : <MissingSVG className="w-12 h-12" />}
                    <div className="flex flex-col pl-4">
                        <div className="text-2xl">{stock.name}</div>
                        <div className="text-sm">{stock.ticker}</div>
                    </div>
                </div>
                {/* Basic Stats */}
                <div className="flex flex-grow flex-col items-end justify-center">
                    <div className="flex flex-row items-center">
                        <div className={`flex flex-row items-center justify-center rounded-full text-center w-fit px-2 py-1 text-white ${stock.delta > 0 ? "bg-green-700" : "bg-red-600"}`}>
                            <div className="font-black">{stock.delta}%</div>
                            <ArrowLongSVG className={`w-3 h-3 m-0 p-0 ${stock.delta > 0 ? "" : "rotate-180"}`} />
                        </div>
                        <div className="text-right text-2xl font-bold pl-2">${stock.price.toFixed(2)}</div>
                    </div>
                    <div className="">Last updated {lastUpdate.toDateString()}</div>
                </div>
            </div>
            <div className="w-full h-96">
                <Chart inComponent={false} prices={prices} ticker={stock.ticker} />
            </div>
        </div>
    )
}