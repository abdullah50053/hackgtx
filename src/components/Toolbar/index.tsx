import { useState } from "react";
import SearchSVG from "../svg/SearchSVG";
import GearSVG from "../svg/GearSVG";
import AngleSVG from "../svg/AngleSVG";
import ProfileSVG from "../svg/ProfileSVG";
import BellSVG from "../svg/BellSVG";
import { UserData } from "@/lib/user";
import { Stock } from "@/lib/types";

interface ToolbarProps {
    user?: UserData
    stocks: Stock[]
    setCurrentStockIndex: any
    setProfileView: any
    giveMoney: any
    positionState: any
}

export default function Toolbar({ user, giveMoney, stocks, positionState, setCurrentStockIndex, setProfileView }: ToolbarProps) {
    const [selected, setSelected] = useState<boolean>(false)

    let totalEarnings = 0
    positionState.forEach((p: any) => {
      let stock = stocks.find((s) => s.ticker === p.ticker) ?? { price: 1 }
      let pos = user?.positions.find((s) => s.ticker === p.ticker) ?? { lastPrice: stock.price }
      totalEarnings += p.shares * pos.lastPrice
    })

    return (
        <div className="flex flex-shrink-0 flex-row content-start items-center w-full h-20 px-8 bg-white">
            {/* Search Bar */}
            <div className={`rounded-lg transition flex flex-row m-auto justify-center w-1/2 h-1/2 overflow-hidden bg-gray-200 ${selected ? "brightness-95" : "brightness-100"}`}>
                <SearchSVG className={`my-auto mx-2 text-lg ${selected ? "scale-125" : "scale-100"}`} />
                <input className="flex-grow outline-none pl-2 text-black bg-gray-200" type="text" placeholder="Search stock..." onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} onKeyDown={(e) => {
                    if (e.key !== "Enter" || stocks.length === 0) return
                    let stockIndex = -1
                    stocks.forEach((s, i) => {
                        if (s.ticker === e.currentTarget.value.toUpperCase()) stockIndex = i
                    })
                    if (stockIndex === -1) return
                    e.currentTarget.value = ""
                    setCurrentStockIndex(stockIndex)
                }} />
            </div>
            {/* Earnings */}
            <div className="flex flex-row text-2xl w-fit text-center font-bold text-black mx-8 cursor-pointer" onClick={() => {
                giveMoney(100)
            }}><span className="text-green-700 text-black">$</span>{user?.money.toFixed(2)}</div>
            {/* Personalization */}
            <div className="flex flex-row flex-grow m-auto justify-end items-center">
                <BellSVG className="transition my-auto mx-1 text-lg hover:scale-125 cursor-pointer" />
                <GearSVG className="transition my-auto mx-1 text-lg hover:scale-125 hover:rotate-180 cursor-pointer" onClick={() => setProfileView(true)} />
                <div className="w-0.5 h-5 mx-2 bg-black" />
                <div className="flex flex-row my-auto items-center justify-center cursor-pointer">
                    <ProfileSVG className="mx-1 font-black" />
                    <div className="text-center select-none font-bold text-black">{user && `${user.first_name} ${user.last_name}`}</div>
                </div>
            </div>
        </div>
    )
}