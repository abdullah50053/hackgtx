import { useState } from "react";
import SearchSVG from "../svg/SearchSVG";
import GearSVG from "../svg/GearSVG";
import AngleSVG from "../svg/AngleSVG";
import ProfileSVG from "../svg/ProfileSVG";
import BellSVG from "../svg/BellSVG";

interface ToolbarProps {

}

export default function Toolbar({}: ToolbarProps) {
    const [selected, setSelected] = useState<boolean>(false)
    return (
        <div className="flex flex-row content-start items-center w-full h-20 px-8 bg-purple-500">
            {/* Search Bar */}
            <div className="rounded-lg flex flex-row m-auto justify-center w-1/2 h-1/2 overflow-hidden bg-lime-500">
                <SearchSVG className={`transition my-auto mx-2 text-lg ${selected ? "scale-125" : "scale-100"}`} />
                <input className="flex-grow outline-none pl-2 bg-yellow-700" type="text" placeholder="Search stock..." onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
            </div>
            {/* Personalization */}
            <div className="flex flex-row flex-grow m-auto justify-end items-center">
                <BellSVG className="transition my-auto mx-1 text-lg hover:scale-125 cursor-pointer" />
                <GearSVG className="transition my-auto mx-1 text-lg hover:scale-125 hover:rotate-180 cursor-pointer" />
                <div className="w-0.5 h-5 mx-2 bg-black" />
                <div className="flex flex-row my-auto items-center justify-center cursor-pointer">
                    <ProfileSVG className="mx-1 font-black" />
                    <div className="text-center select-none font-bold">Nick Burnett</div>
                    <AngleSVG className="transition my-auto mx-1 text-base rotate-180" />
                </div>
            </div>
        </div>
    )
}