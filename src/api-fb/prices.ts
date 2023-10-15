import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';

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

async function getPrices(stock: string): Promise<number[]> {
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

export { addPrices, getPrices };
