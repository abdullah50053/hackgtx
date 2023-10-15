import Info from "@/components/Info";
import Toolbar from "@/components/Toolbar";
import Watchlist from "@/components/Watchlist";
import { Stock } from "@/lib/types";
import { UserData, getUser } from "@/lib/user";

interface MainContainerProps {
    user?: UserData
    setUser: any
    stocks: Stock[]
    currentStockIndex: number
    setCurrentStockIndex: any
    setProfileView: any
}

export default function MainContainer({ user, setUser, stocks, currentStockIndex, setCurrentStockIndex, setProfileView }: MainContainerProps) {
    let prices = (stocks.length > 0 && currentStockIndex >= 0 && currentStockIndex < stocks.length) ? stocks[currentStockIndex].prices ?? [] : []
    const watchedStocks: Stock[] = []
    if (user) {
        stocks.forEach((s) => {
            if (user.watchlist.includes(s.ticker)) watchedStocks.push(s)
        })
    }
    return (
        <div className="scrollbar flex flex-grow flex-col m-0 p-0 w-auto h-full bg-gray-100 overflow-y-auto overflow-x-hidden items-start">
            <Toolbar user={user} stocks={stocks} setCurrentStockIndex={setCurrentStockIndex} setProfileView={setProfileView} />
            <Watchlist stocks={stocks} watched={watchedStocks} setCurrentStockIndex={setCurrentStockIndex} />
            <Info user={user} stock={stocks[currentStockIndex]} prices={prices} lastUpdate={new Date()} updateWatchlist={(user: UserData) => {
        fetch("http://localhost:3000/api/profile", {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            watchlist: user.watchlist,
            positions: user.positions
          }),
        }).then(async (result) => {
          if (result.status !== 200) {
            return console.log(`Profile update error ${result.status}...`);
          }
          const data = (await result.json()).data;
          const userData: UserData = {
            first_name: data.first_name,
            last_name: data.last_name,
            password: user.password,
            email: user.email,
            watchlist: user.watchlist,
            positions: user.positions,
            experience: user.experience
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(undefined);
        })
        .catch((err) => {
          console.log(err);
        });
      }} />
        </div>
    )
}