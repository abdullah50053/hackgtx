import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import app from './firebase';
import data from '../data.json';

const MIN_DELTA = 0.01;
const MAX_DELTA = 0.2;

async function getPrices(stock: string): Promise<number[]> {
    // Get open price
    const open = data.stockOpenPrices[data.stocks.indexOf(stock)];

    // Get the current price list
    const prices = await findPrices(stock);
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

    return prices;
}

// Returns a random value between min (inclusive) and max (exclusive)
function randVal(min: number, max: number) {
    return Math.random() * (max - min) + min;
}


async function addPrices(stock: string, prices: number[]): Promise<boolean> {
    try {
        const db = getFirestore(app); // Initialize Firestore

        // Add the prices data to Firestore
        const priceRef = collection(db, 'prices');

        // Get today's date
        const today = new Date();
        const date = stock + '-' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        // Set the prices data with the given date (today)
        const docRef = await setDoc(doc(priceRef, date), { prices });

        return true;
    } catch (error) {
        console.error(error);

        return false;
    }
}

async function findPrices(stock: string): Promise<number[]> {
    // Get today's date
    const today = new Date();
    const date = stock + '-' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // Get the prices data from Firestore
    const db = getFirestore(app); // Initialize Firestore
    const priceRef = collection(db, 'prices');
    const docRef = doc(priceRef, date);
    const docSnap = await getDoc(docRef);
    if (docSnap.data() === undefined) return [];
    const prices = docSnap.data()?.prices;

    return prices;
}

async function getCurrPrice(stock: string): Promise<number> {
    const prices = await getPrices(stock);
    return prices[prices.length - 1];
}

export { addPrices, findPrices, getPrices, getCurrPrice };
