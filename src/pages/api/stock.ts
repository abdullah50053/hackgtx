import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data.json';

type ResponseData = {
    name: string;
    price: number;
    icon: string;
    error: string | null;
};

const stocks = data.stocks;
const stockOpenPrices = data.stockOpenPrices;
const stockNames = data.stockNames;
const stockIcons = data.stockIcons;

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Get the stock from the query string
    const ticker = req.query.stock as string;
    if (stocks.indexOf(ticker) === -1) {
        res.status(404).json({ name: "", price: 0, icon: "", error: 'Stock not found' });
        return;
    }

    // Get open price
    const open = stockOpenPrices[stocks.indexOf(ticker)];

    // Only generate new prices

    res.status(200).json({ name: stockNames[stocks.indexOf(ticker)], icon: stockIcons[stocks.indexOf(ticker)], price: open, error: null });
}