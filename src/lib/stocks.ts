import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import app from './firebase';
import { PositionInfo, UserData } from './user';
import { getCurrPrice } from './prices';

export async function buyStock(email: string, ticker: string, shares: number): Promise<boolean> {
    // TODO: Assume user has enough money

    // Get user
    const db = getFirestore(app);
    const userRef = doc(collection(db, 'users'), email);
    const userRes = await getDoc(userRef);
    if (userRes.data() === undefined) {
        console.error('User with email ' + email + ' does not exist.');
        return false;
    }
    const user: UserData = userRes.data() as UserData;

    // Get current price of ticker
    const price = await getCurrPrice(ticker);

    let idx = user.positions.findIndex((p) => p.ticker === ticker);
    if (idx !== -1) {
        user.positions[idx].shares += shares;
        user.positions[idx].lastPrice = price;
    } else {
        user.positions.push({
            ticker: ticker,
            shares: shares,
            lastPrice: price,
        });
    }
    user.money -= price * shares;

    // Update user
    await setDoc(userRef, user);

    return true;
}

export async function sellStock(email: string, ticker: string, shares: number): Promise<number> {
    // TODO: Assume user has enough shares

    // Get user
    const db = getFirestore(app);
    const userRef = doc(collection(db, 'users'), email);
    const userRes = await getDoc(userRef);
    if (userRes.data() === undefined) {
        console.error('User with email ' + email + ' does not exist.');
        return -1;
    }
    const user: UserData = userRes.data() as UserData;

    // Get current price of ticker
    const price = await getCurrPrice(ticker);

    let idx = user.positions.findIndex((p) => p.ticker === ticker);
    if (idx !== -1) {
        user.positions[idx].shares -= shares;
        user.positions[idx].lastPrice = price;
    } else {
        console.error('User does not own ' + ticker);
        return -1;
    }
    user.money += price * shares;

    // Update user
    await setDoc(userRef, user);

    return price * shares;
}

export async function getReturn(email: string, ticker: string): Promise<PositionInfo | null> {
    // Get user
    const db = getFirestore(app);
    const userRef = doc(collection(db, 'users'), email);
    const userRes = await getDoc(userRef);
    if (userRes.data() === undefined) {
        console.error('User with email ' + email + ' does not exist.');
        return null;
    }
    const user: UserData = userRes.data() as UserData;

    // Get current price of ticker
    const price = await getCurrPrice(ticker);

    let position = user.positions.find((p) => p.ticker === ticker);
    if (!position) {
        console.error('User does not own ' + ticker);
        return null;
    }

    return {
        ticker: ticker,
        shares: position.shares,
        return: position.shares * price / position.lastPrice,
    };
}
