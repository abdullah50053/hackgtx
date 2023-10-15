import { NextApiRequest, NextApiResponse } from "next";
import app from "../../lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const data = JSON.parse(body);
  try {
    const db = getFirestore(app)
    const document = await getDoc(doc(db, `account/${data.phone}`))
    if (document.exists()) {
      if (data.password !== document.data().password) return res.status(401).json({});
      return res.status(200).json({ data: document.data() });
    } else {
      return res.status(401).json({});
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export default async function handleLoginRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return handleLogin(req, res);
  } else {
    return;
  }
}