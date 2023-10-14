import React from "react"
import { Stock } from "@/lib/types"
import WatchedStockCard from "../WatchedStockCard"

interface WatchlistProps {
    watched?: Stock[]
}

export default function Watchlist({ watched }: WatchlistProps) {
    watched = [
        {
            ticker: "AAPL",
            name: "Apple",
            iconUrl: "https://cdn-icons-png.flaticon.com/512/154/154870.png",
            price: 310.4,
            delta: -1.1
        },
        {
            ticker: "TSLA",
            name: "Tesla",
            iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1200px-Tesla_T_symbol.svg.png",
            price: 310.4,
            delta: 0.2
        },
        {
            ticker: "DDOG",
            name: "Datadog",
            iconUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Datadog_logo.svg/1200px-Datadog_logo.svg.png",
            price: 310.4,
            delta: 100
        }
    ]
    let watchedComponents: React.JSX.Element[] = []
    if (watched) {
        watched.forEach((stock) => {
            watchedComponents.push(<WatchedStockCard stock={stock} />)
        })
    }
    return (
        <div className="flex flex-col w-full h-56 pt-10 px-12 bg-black">
            <div className="text-xl font-bold content-start">My Watchlist</div>
            <div className="rounded-3xl flex flex-grow flex-row items-center w-full mt-3 mb-5 overflow-x-auto bg-white">
                {watchedComponents.length > 0 ? watchedComponents : <div className="flex-grow text-center text-6xl font-black text-gray-300 select-none">NO WATCHED STOCKS</div>}
            </div>
        </div>
    )
}