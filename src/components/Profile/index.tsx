import { useState } from "react";
import { getUser, UserData } from "../../lib/user";
import LoadSVG from "../svg/LoadSVG";
interface ProfileProps {
  setUser: any;
  setProfile: any;
}

function validateFirstName() {
  const regex = /^[A-Z][a-z]+$/
  const e = document.getElementById("profilefirst") as HTMLInputElement;
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
function validateLastName() {
  const regex = /^[A-Z][a-z]+$/
  const e = document.getElementById("profilelast") as HTMLInputElement;
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
function validateExperience() {
  const regex = /^(beginner|intermediate|advanced)$/
  const e = document.getElementById("profileexperience") as HTMLInputElement
  const v = e.value
  let validated = false
  let color = "#F24855"
  if (v.match(regex)) {
    color = "#26CF5E"
    validated = true
  }
  if (v === undefined || v === "") color = "#F5F5F5"
  e.style.setProperty("--color", color)
  return validated
}

export default function Profile({ setUser, setProfile }: ProfileProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let user = getUser()!;
  return (
    <div id="profile" className="absolute flex items-center justify-center w-full h-full bg-gray-200 z-10">
      <div id="profileactual" className="relative flex flex-col items-center w-1/3 h-max p-3 bg-gray-400 rounded-xl text-white">
        <div className="text-3xl font-black mb-7">Profile</div>
        <div className="text-xl font-bold my-3">First Name</div>
        <input id="profilefirst" onChange={validateFirstName} className="w-1/2 bg-gray-700 text-lg text-center rounded-lg" defaultValue={user.first_name}></input>
        <div className="text-xl font-bold my-3">Last Name</div>
        <input id="profilelast" onChange={validateLastName} className="w-1/2 bg-gray-700 text-lg text-center rounded-lg" defaultValue={user.last_name}></input>
        <div className="text-xl font-bold my-3">Experience</div>
        <input id="profileexperience" list="profileexperiencelist" className="w-1/2 bg-gray-700 text-lg text-center rounded-lg" onChange={validateExperience} defaultValue={user.experience}></input>
        <datalist id="profileexperiencelist" defaultValue={user.experience}>
          <option value="beginner" />
          <option value="intermediate" />
          <option value="advanced" />
        </datalist>
        <div className="flex flex-row items-center justify-center mt-10">
          <div className="rounded-xl text-center bg-blue-400 w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition" onClick={() => {
            setLoading(true);
            if (!validateFirstName() || !validateLastName() || !validateExperience()) {
              setLoading(false);
              return setError("Invalid profile data...");
            }
            fetch("http://localhost:3000/api/profile", {
              mode: 'cors',
              method: 'POST',
              body: JSON.stringify({
                email: user.email,
                first_name: (document.getElementById("profilefirst") as HTMLInputElement).value,
                last_name: (document.getElementById("profilelast") as HTMLInputElement).value,
                watchlist: user.watchlist,
                positions: user.positions,
                experience: (document.getElementById("profileexperience") as HTMLInputElement).value
              }),
            }).then(async (result) => {
              if (result.status !== 200) {
                setError("User update failed...");
                setLoading(false);
                return console.log(`Profile update error ${result.status}...`);
              }
              const data = (await result.json()).data;
              setLoading(false);
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
              setUser(userData);
              setProfile(false);
            })
            .catch((err) => {
              console.log(err);
            });
          }}>Save</div>
        </div>
        {loading && <LoadSVG className="w-6 h-6 animate-spin" />}
        {error && <div className="text-center text-red-400 font-black">{error}</div>}
      </div>
    </div>
  )
}