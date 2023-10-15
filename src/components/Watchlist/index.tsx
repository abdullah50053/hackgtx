import React, { useEffect, useRef, useState } from "react"
import { Stock } from "@/lib/types"
import WatchedStockCard from "../WatchedStockCard"
import AngleSVG from "../svg/AngleSVG"

interface WatchlistProps {
    watched?: Stock[]
}

export default function Watchlist({ watched }: WatchlistProps) {
    const WIDTH = 288
    const [overflowing, setOverflowing] = useState<boolean>(false)
    const watchedContainerRef = useRef<HTMLDivElement>(null)
    const isOverflowing = (ref: React.RefObject<HTMLDivElement>): boolean => {
        if (!ref.current) {
            return false
        }
        return ref.current.scrollWidth > ref.current.clientWidth
    }
    const scrollButton = (left: boolean): React.JSX.Element => {
        return (
            <div className={`absolute transition top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex p-1 shadow-lg bg-gray-50 hover:brightness-90 cursor-pointer ${left ? "left-0 -rotate-90" : "left-full rotate-90"}`} onClick={() => {
                if (watchedContainerRef.current) {
                    watchedContainerRef.current.scroll({ behavior: "smooth", left: Math.min(watchedContainerRef.current.clientWidth, Math.max(0, watchedContainerRef.current.scrollLeft - (left ? WIDTH : -WIDTH))) })
                }
            }}>
                <AngleSVG className="w-8 h-8 text-black" />
            </div>
        )
    }
    useEffect(() => setOverflowing(isOverflowing(watchedContainerRef)), [overflowing])
    let watchedComponents: React.JSX.Element[] = []
    if (watched) {
        watched.forEach((stock) => {
            watchedComponents.push(<WatchedStockCard key={stock.ticker} stock={stock} />)
        })
    }
    return (
        <div className="flex flex-col w-full h-56 pt-10 px-12">
            <div className="text-xl text-black font-bold content-start">My Watchlist</div>
            <div className="relative rounded-2xl flex flex-grow flex-row items-center w-full mt-3 mb-5 bg-white">
                {overflowing && scrollButton(true)}
                {overflowing && scrollButton(false)}
                <div ref={watchedContainerRef} className="rounded-2xl flex flex-grow flex-row items-center w-full overflow-hidden">
                    {watchedComponents.length > 0 ? watchedComponents : <div className="flex-grow text-center text-6xl font-black text-gray-300 select-none">NO WATCHED STOCKS</div>}
                </div>
            </div>
        </div>
    )
}