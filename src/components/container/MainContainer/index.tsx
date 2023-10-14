import Toolbar from "@/components/Toolbar";
import Watchlist from "@/components/Watchlist";

interface MainContainerProps {

}

export default function MainContainer({}: MainContainerProps) {
    return (
        <div className="flex flex-grow flex-col m-0 p-0 justify-center w-auto h-full bg-yellow-500 overflow-y-auto items-start">
            <Toolbar />
            <Watchlist />
            <div className="flex-grow"></div>
        </div>
    )
}