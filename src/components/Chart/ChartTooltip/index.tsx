interface ChartTooltipProps {
    active?: boolean
    payload?: any[]
    label?: Date
}

export default function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
    if (!active || !payload || !payload.length || !label) return <></>
    return (
        <div className="bg-gray-500 bg-opacity-80 p-1 rounded-lg">
            <p>{label.toLocaleTimeString()}</p>
            <p>${payload[0].value.toFixed(2)}</p>
        </div>
    )
}