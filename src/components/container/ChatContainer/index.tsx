interface ChatContainerProps {
    
}

export default function ChatContainer({}: ChatContainerProps) {
    return (
        <div className="flex flex-col m-0 p-0 w-96 h-screen bg-gray-500">
            <div className="items-center m-0 p-0 w-full h-16 bg-red-500"/>
            <div className="flex-grow m-0 p-0 w-full h-auto bg-green-500 overflow-y-auto"/>
            <div className="m-0 p-0 w-full h-16 bg-blue-500" />
        </div>
    )
}