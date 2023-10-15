import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import app from '../../../lib/firebase';
import { UserData } from '@/lib/user';

type ResponseData = {
    money: number;
    error: string | null;
};

// GET /money?email=string
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'GET') {
        res.status(405).json({ money: -1, error: 'Method not allowed' });
        return;
    }

    // Get the email from the body
    const { email } = req.query;
    if (!email) {
        res.status(400).json({ money: -1, error: 'Email must be provided' });
        return;
    }

    // Get the money
    try {
        const db = getFirestore(app);
        const userRef = doc(collection(db, 'account'), email as string);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists() || userDoc.data() === undefined) {
            res.status(404).json({ money: -1, error: 'User with email ' + email + ' not found!' });
            return;
        }
        const user = userDoc.data() as UserData;

        return res.status(200).json({ money: user.money, error: null });
    } catch (error: any) {
        return res.status(400).json({ money: -1, error: error.message });
    }
}