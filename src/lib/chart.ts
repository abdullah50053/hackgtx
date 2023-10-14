export function convertToTimeseries(prices: number[]) {
    let res: {
        timestamp: Date,
        price: number
    }[] = []
    let timestamp = new Date()
    timestamp.setHours(8, 30, 0, 0)
    prices && prices.forEach((price) => {
        res.push({
            timestamp,
            price
        })
        timestamp = new Date(timestamp.getTime() + 5 * 60 * 1000)
    })
    return res
}