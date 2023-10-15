import { useState } from "react";
import { UserData } from "../../lib/user";
import LoadSVG from "../svg/LoadSVG";
interface LoginProps {
  setUser: any
}

function validateEmail() {
  const regex = /^[a-zA-Z_0-9]+@[a-zA-Z]+\.(com|edu|org|net)$/
  const e = document.getElementById("loginphone") as HTMLInputElement;
  const phone = e.value;
  let validated = false;
  let color = '#F24855';
  if (phone.match(regex)) {
    color = '#26CF5E';
    validated = true;
  }
  if (phone === undefined || phone === '') color = '#F5F5F5';
  e.style.setProperty('--color', color);
  return validated;
}
function validatePassword() {
  const e = document.getElementById("loginpassword") as HTMLInputElement;
  const password = e.value;
  let validated = false;
  let color = '#F24855';
  if (password.length >= 8) {
    color = '#26CF5E';
    validated = true;
  }
  if (password === undefined || password === '') color = '#F5F5F5';
  e.style.setProperty('--color', color);
  return validated;
}

export default function Login({ setUser }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div id="login" className="absolute flex items-center justify-center w-full h-full bg-gray-200 z-10">
      <div id="loginactual" className="relative flex flex-col items-center w-1/3 h-max p-3 bg-gray-400 rounded-xl text-white">
        <div className="text-3xl font-black mb-7">Login</div>
        <div className="text-xl font-bold my-3">Email</div>
        <input id="loginphone" onChange={validateEmail} className="w-1/2 bg-gray-700 text-lg text-center rounded-lg"></input>
        <div className="text-xl font-bold my-3">Password</div>
        <input type="password" id="loginpassword" onChange={validatePassword} className="w-1/2 bg-gray-700 text-lg text-center rounded-lg"></input>
        <div className="flex flex-row items-center justify-center mt-10">
          <div className="rounded-xl text-center bg-blue-400 w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition" onClick={() => {
            if (loading) return;
            setLoading(true);
            if (!validateEmail() || !validatePassword()) {
              setError("Invalid Phone Number or Password...");
              setLoading(false);
              return;
            }
            fetch("http://localhost:3000/api/register", {
              mode: 'cors',
              method: 'POST',
              body: JSON.stringify({
                email: (document.getElementById("loginphone") as HTMLInputElement).value,
                password: (document.getElementById("loginpassword") as HTMLInputElement).value,
              }),
            }).then(async (result) => {
              if (result.status !== 200) {
                setError("User already registered...");
                setLoading(false);
                return console.log(`Registration error ${result.status}...`);
              }
              const data = (await result.json()).data;
              setLoading(false);
              const userData: UserData = {
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password,
                email: data.email,
                watchlist: data.watchlist,
                positions: data.positions
              };
              localStorage.setItem("user", JSON.stringify(userData));
              setUser(userData);
            })
            .catch((err) => {
              console.log(err);
            });
          }}>Register</div>
          <div className="rounded-xl text-center bg-blue-400 w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition" onClick={() => {
            if (loading) return;
            setLoading(true);
            if (!validateEmail() || !validatePassword()) {
              setError("Invalid Phone Number or Password...");
              setLoading(false);
              return;
            }
            fetch("http://localhost:3000/api/login", {
              mode: 'cors',
              method: 'POST',
              body: JSON.stringify({
                email: (document.getElementById("loginphone") as HTMLInputElement).value,
                password: (document.getElementById("loginpassword") as HTMLInputElement).value,
              }),
            }).then(async (result) => {
              if (result.status !== 200) {
                setError("Invalid Email or Password...");
                setLoading(false);
                return console.log(`Login error ${result.status}...`);
              }
              const data = (await result.json()).data;
              setLoading(false);
              const userData: UserData = {
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password,
                email: data.email,
                watchlist: data.watchlist,
                positions: data.positions
              };
              localStorage.setItem("user", JSON.stringify(userData));
              setUser(userData);
            })
            .catch((err) => {
              console.log(err);
            });
          }}>Login</div>
        </div>
        {loading && <LoadSVG className="w-6 h-6 animate-spin" />}
        {error && <div className="text-center text-red-400 font-black">{error}</div>}
      </div>
    </div>
  )
}