import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import app from '../../../lib/firebase';
import { UserData } from '@/lib/user';

type ResponseData = {
    ok: number;
    error: string | null;
};

// POST /money/add body: { email: string, amount: number }
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        res.status(405).json({ ok: 0, error: 'Method not allowed' });
        return;
    }

    const { amount, email } = JSON.parse(req.body);

    // Get the amount from the body
    if (amount <= 0) {
        res.status(400).json({ ok: 0, error: 'Amount must be positive' });
        return;
    }

    // Get the email from the body
    if (!email) {
        res.status(400).json({ ok: 0, error: 'Email must be provided' });
        return;
    }

    // Add the money
    try {
        const db = getFirestore(app);
        const userRef = doc(collection(db, 'account'), email);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists() || userDoc.data() === undefined) {
            res.status(404).json({ ok: 0, error: 'User with email ' + email + ' not found!' });
            return;
        }
        const user = userDoc.data() as UserData;
        
        // Add money
        user.money += amount;

        // Update user
        await setDoc(userRef, user);

        return res.status(200).json({ ok: 1, error: null });
    } catch (error: any) {
        return res.status(400).json({ ok: 0, error: error.message });
    }
}
