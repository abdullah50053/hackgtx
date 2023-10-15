import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../lib/firebase';

export default function addPrices(prices: number[]) {
    try {
        // TODO: WIP
        // const firestore = getFirestore(app); // Initialize Firestore

        // // Add the prices data to Firestore
        // const docRef = await addDoc(collection(firestore, 'pricesCollection'), {
        //     prices: prices,
        //     timestamp: new Date(), // You can include a timestamp if needed
        // });

        // res.status(200).json({ id: docRef.id });
    } catch (error) {
        return 
    }
}
