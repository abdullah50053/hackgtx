import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    prices: number[];
    error: string | null;
};

const prices: number[] = [];

const MIN_DELTA = 0.01;
const MAX_DELTA = 0.1;

const stocks = ['AAPL'];
const stockOpenPrices = [178.85];

// GET /
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Get the stock from the query string
    const stock = req.query.stock as string;
    if (stocks.indexOf(stock) === -1) {
        res.status(404).json({ prices: [], error: 'Stock not found' });
        return;
    }

    // Get open price
    const open = stockOpenPrices[stocks.indexOf(stock)];

    // Get the total mins elapsed in the day
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const minElapsed = Math.floor((hour * 60 + minute) / 5);

    // Only generate new prices
    const toGen = minElapsed - prices.length + 1;

    // If there are no prices, add the open price
    if (prices.length === 0) {
        prices.push(open);
    }

    // Calculate the price for each minute
    let prev = prices[prices.length - 1]
    for (let i = 0; i < toGen; i++) {
        const d = randVal(MIN_DELTA, MAX_DELTA);

        let posChance = 0.5;
        if (prev > open) {
            posChance = prev - open;
        } else if (prev < open) {
            posChance = open - prev;
        }

        const pos = Math.random() < posChance;
        const delta = pos ? d : -d;

        prev = Math.round((prev + delta) * 100) / 100;

        prices.push(prev);
    }

    res.status(200).json({ prices, error: null });
}

// Returns a random integer between min (inclusive) and max (exclusive)
function randVal(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
