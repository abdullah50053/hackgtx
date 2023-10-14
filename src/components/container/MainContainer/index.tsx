import Info from "@/components/Info";
import Toolbar from "@/components/Toolbar";
import Watchlist from "@/components/Watchlist";

interface MainContainerProps {

}

export default function MainContainer({}: MainContainerProps) {
    let prices = []
    for (let i = 0; i < 150; i++) {
        prices.push(Math.random() * 10)
    }
    return (
        <div className="scrollbar flex flex-grow flex-col m-0 p-0 w-auto h-full bg-yellow-500 overflow-y-auto overflow-x-hidden items-start">
            <Toolbar />
            <Watchlist />
            <Info stock={{
                ticker: "AAPL",
                name: "Apple",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/154/154870.png",
                price: 310.4,
                delta: 11.31
            }} prices={prices} lastUpdate={new Date()}/>
        </div>
    )
}