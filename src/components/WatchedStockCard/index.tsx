import { Stock } from "@/lib/types"
import MissingSVG from "../svg/MissingSVG"

interface WatchedStockCardProps {
    stock: Stock
}

export default function WatchedStockCard({ stock }: WatchedStockCardProps) {
    return (
        <div className="transition flex flex-col w-48 h-full p-4 hover:bg-slate-400 bg-gray-500">
            <div className="flex flex-row">
                {/* Icon + Name */}
                <div className="flex flex-row items-center">
                    {stock.iconUrl ? <img src={stock.iconUrl!} className="w-8 h-8"></img> : <MissingSVG />}
                    <div className="ml-2 font-bold">{stock.name}</div>
                </div>
                {/* Graph */}
            </div>
        </div>
    )
}