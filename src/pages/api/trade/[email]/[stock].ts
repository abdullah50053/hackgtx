import { getReturn } from '@/lib/stocks';
import { PositionInfo } from '@/lib/user';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    position: PositionInfo | null;
    error: string | null;
};

// GET /trade/[email]/[ticker]
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'GET') {
        res.status(405).json({ position: null, error: 'Method not allowed' });
        return;
    }

    // Get the email and ticker from the body
    const { email, stock } = req.query;
    if (!stock) {
        res.status(400).json({ position: null, error: 'Stock must be provided' });
        return;
    }
    if (!email) {
        res.status(400).json({ position: null, error: 'Email must be provided' });
        return;
    }

    // Get the return
    try {
        const position = await getReturn(email as string, stock as string);
        return res.status(200).json({ position: position, error: null });
    } catch (error: any) {
        return res.status(400).json({ position: null, error: error.message });
    }
}
