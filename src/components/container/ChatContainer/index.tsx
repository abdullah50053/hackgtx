interface ChatContainerProps {
    
}

export default function ChatContainer({}: ChatContainerProps) {
    return (
        <div className="flex flex-col m-0 p-0 w-96 h-screen bg-gray-500">
            <div className="items-center m-0 p-0 w-full h-16 bg-red-500"/>
            <div className="flex-grow m-0 p-0 w-full h-auto bg-green-500 overflow-y-auto"/>
            <div className="flex m-0 p-0 items-center justify-center w-full h-fit bg-blue-500">
                <input className="rounded-lg block text-black w-full h-fit p-2 bg-gray-200 outline-none" type="text" placeholder="Send a message" />
                {/*<textarea className="block p-2.5 w-1/2 text-black resize-none" placeholder="Enter a message..." />*/}
            </div>
        </div>
    )
}