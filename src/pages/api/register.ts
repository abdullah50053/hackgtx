import { NextApiRequest, NextApiResponse } from "next";
import app from "../../lib/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export async function handleRegister(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const data = JSON.parse(body);
  try {
    const db = getFirestore(app)
    let document = await getDoc(doc(db, `account/${data.email}`))
    if (document.exists()) {
      return res.status(201).json({});
    } else {
      const newData = {
        first_name: "",
        last_name: "",
        password: data.password,
        email: data.email,
        watchlist: [],
        positions: []
      };
      await setDoc(doc(db, `account/${data.email}`), {
        ...newData
      })
      return res.status(200).json({ data: newData });
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export default async function handleRegistrationRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return handleRegister(req, res);
  } else {
    return;
  }
}