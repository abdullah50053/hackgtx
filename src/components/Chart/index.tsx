import { convertToTimeseries } from "@/lib/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import ChartTooltip from "./ChartTooltip"

interface ChartProps {
    inComponent: boolean
    prices: number[]
    ticker: string
    delta?: number
}

export default function Chart({ inComponent = false, prices, delta, ticker }: ChartProps) {
    const color = delta && delta > 0 ? "#26CF5E" : "#F24855"
    const marketOpen = new Date().setHours(8, 30, 0, 0)
    const marketClose = new Date().setHours(16, 0, 0, 0)

    return (
        <ResponsiveContainer>
            <AreaChart data={convertToTimeseries(prices)}>
                {!inComponent ? <defs>
                    <linearGradient id={"green"} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#aaa" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#aaa" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id={"blue"} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#357ae4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#357ae4" stopOpacity={0} />
                    </linearGradient>
                </defs> : <defs>
                    <linearGradient id={`gradient-${ticker}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                </defs>}
                {!inComponent && <XAxis dataKey="timestamp" scale="time" type="number" domain={[marketOpen, marketClose]} hide={true} />}
                <YAxis hide={inComponent} domain={["auto", "auto"]} />
                {!inComponent && <CartesianGrid strokeDasharray="3 3" />}
                {!inComponent && <Tooltip content={<ChartTooltip />} />}
                <Area type={inComponent ? "linear" : "monotone"} dataKey="price" stroke={inComponent ? color : "#357ae4"} fillOpacity={1} fill={`url(${inComponent ? `#gradient-${ticker}` : "#blue"})`} isAnimationActive={!inComponent} />
            </AreaChart>
        </ResponsiveContainer>
    )
}