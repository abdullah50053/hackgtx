// api/addPrices.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../../../firebase'; // Import your Firebase configuration

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const firestore = getFirestore(app); // Initialize Firestore
      const { prices } = req.body; // Assuming you're sending prices in the request body

      // Add the prices data to Firestore
      const docRef = await addDoc(collection(firestore, 'pricesCollection'), {
        prices: prices,
        timestamp: new Date(), // You can include a timestamp if needed
      });

      res.status(200).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add prices data' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
