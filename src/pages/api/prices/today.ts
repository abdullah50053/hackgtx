import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../data.json';
import { addPrices, getPrices } from '@/api-fb/prices';

type ResponseData = {
    prices: number[];
    error: string | null;
};

const MIN_DELTA = 0.01;
const MAX_DELTA = 0.2;

const stocks = data.stocks;
const stockOpenPrices = data.stockOpenPrices;

// GET /today?stock={stock}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Get the stock from the query string
    const stock = req.query.stock as string;
    if (stocks.indexOf(stock) === -1) {
        res.status(404).json({ prices: [], error: 'Stock not found' });
        return;
    }

    // Get open price
    const open = stockOpenPrices[stocks.indexOf(stock)];

    // Get the current price list
    const prices = await getPrices(stock);
    const origPriceLen = prices.length;

    // Get the total mins elapsed in the day
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const minElapsed = hour * 60 + minute;

    // Only generate new prices
    const toGen = minElapsed - prices.length + 1;

    // If there are no prices, add the open price
    if (prices.length === 0) {
        prices.push(open);
    }

    // Calculate the price for each minute
    let prev = prices[prices.length - 1];
    for (let i = 0; i < toGen; i++) {
        const d = randVal(MIN_DELTA, MAX_DELTA);

        let posChance = 0.5;
        if (prev - open > 2) 
            posChance = 0;
        else if (prev - open < -2)
            posChance = 1;
        
        const pos = Math.random() < posChance
        const delta = pos ? d : -d;

        prev = Math.round((prev + delta) * 100) / 100;

        prices.push(prev);
    }

    // Push the prices to Firestore if there are new prices
    if (prices.length > origPriceLen) {
        // Add the prices data to Firestore
        await addPrices(stock, prices);
    }

    // Filter out every 4 prices (ie. keep 0, 5, 10, 15, etc.)
    const filteredPrices = prices.filter((_: number, i: number) => i % 5 === 0);

    res.status(200).json({ prices: filteredPrices, error: null });
}

// Returns a random integer between min (inclusive) and max (exclusive)
function randVal(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
