import { NextApiRequest, NextApiResponse } from "next";
import app from "../../lib/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

export async function handleProfileUpdate(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const data = JSON.parse(body);
  try {
    const db = getFirestore(app)
    let document = await getDoc(doc(db, `account/${data.email}`))
    if (!document.exists()) {
      return res.status(201).json({});
    } else {
      await updateDoc(doc(db, `account/${data.email}`), {
        ...data
      })
      return res.status(200).json({ data });
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export default async function handleProfileUpdateRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return handleProfileUpdate(req, res);
  } else {
    return;
  }
}