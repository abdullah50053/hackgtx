export interface Stock {
    ticker: string
    name: string
    iconUrl?: string
    price: number
    delta: number
}

export interface Chat {
    sender?: string
    text: string
    left: boolean
}