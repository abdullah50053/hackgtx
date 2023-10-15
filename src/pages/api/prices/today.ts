import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../data.json';
import { updatePrices } from '@/api-fb/prices';

type ResponseData = {
    prices: number[];
    error: string | null;
};

// GET /today?stock={stock}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Get the stock from the query string
    const stock = req.query.stock as string;
    if (data.stocks.indexOf(stock) === -1) {
        res.status(404).json({ prices: [], error: 'Stock not found' });
        return;
    }

    const prices = await updatePrices(stock);

    // Filter out every 4 prices (ie. keep 0, 5, 10, 15, etc.)
    const filteredPrices = prices.filter((_: number, i: number) => i % 5 === 0);

    res.status(200).json({ prices: filteredPrices, error: null });
}