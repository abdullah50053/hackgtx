import dynamic from "next/dynamic"
import { Stock } from "@/lib/types";
import MissingSVG from "../svg/MissingSVG";
import ArrowLongSVG from "../svg/ArrowLongSVG";
import { ResponsiveContainer } from "recharts";
import { UserData } from "@/lib/user";
import MinusSVG from "../svg/MinusSVG";
import PlusSVG from "../svg/PlusSVG";

const Chart = dynamic(
    import("../Chart"),
    { ssr: false }
)

interface InfoProps {
    user?: UserData
    updateWatchlist: any
    updatePosition: any
    stock: Stock
    prices: number[]
    lastUpdate: Date
    positionState: any
}

export default function Info({ user, updateWatchlist, positionState, updatePosition, stock, prices, lastUpdate }: InfoProps) {
    if (!stock) return <div className="w-full"/>
    const position = (positionState ?? []).find((p: any) => p.ticker === stock.ticker)
    const returns = position ? position.returns : 0
    const userPosition = user?.positions.find((p) => p.ticker === position.ticker)
    const shares = userPosition ? userPosition.shares : undefined
    return (
        <div className="rounded-3xl flex flex-col w-11/12 my-6 mx-auto p-4 text-black bg-white">
            {/* Top Bar */}
            <div className="flex flex-row w-full h-fit">
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
                        <div className={`flex flex-row items-center justify-center rounded-full text-center w-fit px-2 py-1 text-white ${returns >= 0 ? "bg-green-700" : "bg-red-600"}`}>
                            <div className="font-black">{returns.toFixed(2)}%</div>
                            <ArrowLongSVG className={`w-3 h-3 m-0 p-0 ${returns >= 0 ? "" : "rotate-180"}`} />
                        </div>
                        <div className="text-right text-2xl font-bold pl-2">${stock.price.toFixed(2)}</div>
                    </div>
                    {shares && <div className="font-bold pl-2">You own {shares} shares</div>}
                </div>
            </div>
            <div className="m-auto mt-2 w-full h-1 bg-gray-200" />
            <div className="w-full h-96 mt-8">
                <Chart inComponent={false} prices={prices} ticker={stock.ticker} />
            </div>
        
        {user && <div className="flex flex-row items-center mx-auto mt-4 w-full">
          {user.watchlist.includes(stock.ticker) ? <div className="flex flex-row items-center justify-center cursor-pointer w-max p-1 px-2 rounded-xl border-4 border-red-400 text-red-400 hover:border-transparent hover:text-white hover:bg-red-400 transition" onClick={() => {
            user.watchlist = user.watchlist.filter((f) => f !== stock.ticker);
            updateWatchlist(user)
          }}>
              <MinusSVG className="w-6 h-6 mr-2" />
              <div className="text-sm font-extrabold">Unwatch</div>
          </div> : <div className="flex flex-row items-center justify-center cursor-pointer w-max p-1 px-2 rounded-xl border-4 border-green-400 text-green-400 hover:border-transparent hover:text-white hover:bg-green-400 transition" onClick={() => {
              user.watchlist = user.watchlist.concat(stock.ticker);
              updateWatchlist(user)
          }}>
              <PlusSVG className="w-6 h-6 mr-2" />
              <div className="text-sm font-extrabold">Watch</div>
          </div>}
          <div className="mx-2 flex flex-row items-center justify-center cursor-pointer w-max p-1 px-2 rounded-xl border-4 border-green-400 text-green-400 hover:border-transparent hover:text-white hover:bg-green-400 transition font-extrabold" onClick={() => {
            updatePosition(user, stock, "buy")
          }}>$ BUY</div>
          {user.positions.find((p) => p.ticker === stock.ticker) && <div className="mx-2 flex flex-row items-center justify-center cursor-pointer w-max p-1 px-2 rounded-xl border-4 border-red-400 text-red-400 hover:border-transparent hover:text-white hover:bg-red-400 transition font-extrabold" onClick={() => {
            updatePosition(user, stock, "sell")
          }}>$ SELL</div>}
        </div>}
        </div>
    )
}