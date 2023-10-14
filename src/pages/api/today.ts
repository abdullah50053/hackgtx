// api/addPrices.ts
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../../../firebase';

export async function addPricesToFirestore(prices: Array<number>) {
  try {
    const firestore = getFirestore(app);
    const docRef = await addDoc(collection(firestore, 'pricesCollection'), {
      prices: prices,
      timestamp: new Date(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error('Failed to add prices data');
  }
}
