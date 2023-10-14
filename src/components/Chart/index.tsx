import { convertToTimeseries } from "@/lib/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

interface ChartProps {
    inComponent: boolean
    prices: number[]
    ticker: string
    delta?: number
    className?: string
    width?: number
    height?: number
}

export default function Chart({ className, width, height, inComponent = false, prices, delta, ticker }: ChartProps) {
    const color = delta && delta > 0 ? "#26CF5E" : "#F24855"
    const marketOpen = new Date().setHours(8, 30, 0, 0)
    const marketClose = new Date().setHours(16, 0, 0, 0)

    return (
        <AreaChart className={className} width={width || 400} height={height || 350} data={convertToTimeseries(prices)}>
            {!inComponent ? <defs>
                {[["#aaa", "green"], ["#357ae4", "blue"]].map((data) => <linearGradient id={data[1]} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={data[0]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={data[0]} stopOpacity={0} />
                </linearGradient>)}
            </defs> : <defs>
                <linearGradient id={`gradient-${ticker}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
            </defs>}
            {!inComponent && <XAxis dataKey="timestamp" scale="time" type="number" domain={[marketOpen, marketClose]} hide={true} />}
            <YAxis hide={inComponent} domain={["auto", "auto"]} />
            {!inComponent && <CartesianGrid strokeDasharray="3 3" />}
            <Area type={inComponent ? "linear" : "monotone"} dataKey="price" stroke={inComponent ? color : "#357ae4"} fillOpacity={1} fill={`url(${inComponent ? `#gradient-${ticker}` : "#blue"})`} isAnimationActive={!inComponent} />
        </AreaChart>
    )
}