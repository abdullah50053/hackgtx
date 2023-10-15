import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../data.json';
import { sellStock } from '@/lib/stocks';

type ResponseData = {
    ok: number;
    error: string | null;
};

// POST /trade/sell body: { email: string, stock: string, shares: number }
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        res.status(405).json({ ok: 0, error: 'Method not allowed' });
        return;
    }

    const {stock, shares, email} = JSON.parse(req.body);

    // Get the stock from the body
    if (data.stocks.indexOf(stock) === -1) {
        res.status(404).json({ ok: 0, error: 'Stock not found' });
        return;
    }

    // Get the shares from the body
    if (shares <= 0) {
        res.status(400).json({ ok: 0, error: 'Shares must be positive' });
        return;
    }

    // Get the email from the body
    if (!email) {
        res.status(400).json({ ok: 0, error: 'Email must be provided' });
        return;
    }

    // Sell the stock
    try {
        const ok = await sellStock(email, stock, shares);
        return res.status(200).json({ ok: ok ? 1 : 0, error: null });
    } catch (error: any) {
        return res.status(400).json({ ok: 0, error: error.message });
    }
}
