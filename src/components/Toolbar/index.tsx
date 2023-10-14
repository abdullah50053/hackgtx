import SearchSVG from "../svg/SearchSVG";

interface ToolbarProps {

}

export default function Toolbar({}: ToolbarProps) {
    return (
        <div className="flex flex-row w-full h-20 bg-purple-500">
            <div className="flex flex-row m-auto align-middle justify-center h-1/2 bg-lime-500">
                <SearchSVG className="my-auto mx-2 text-lg" />
                <input className="flex-grow outline-none pl-2 bg-yellow-700" type="text" placeholder="Search stock..."></input>
            </div>
        </div>
    )
}