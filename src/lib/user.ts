export interface UserData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    watchlist: string[];
    positions: Position[]
  }
export interface Position {
  ticker: string
  shares: number
  initialInvestment: number
}
  
  export function getUser() {
    let user = localStorage.getItem("user");
    if (user) return JSON.parse(user) as UserData;
    return undefined;
  }
  
  export function signOut() {
    console.log("TEST");
    localStorage.removeItem("user");
    window.location.reload();
  }