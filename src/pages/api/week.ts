import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data.json';

type ResponseData = {
    prices: number[];
    error: string | null;
};

// GET /week?stock={stock}
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Get the stock from the query string
    const stock = req.query.stock as string;
    if (data.stocks.indexOf(stock) === -1) {
        res.status(404).json({ prices: [], error: 'Stock not found' });
        return;
    }

    // Get the prices for the stock
    const prices = data.week[data.stocks.indexOf(stock)];

    res.status(200).json({ prices, error: null });
}
