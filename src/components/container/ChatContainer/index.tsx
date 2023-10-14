import ChatBubble from "@/components/ChatBubble"
import { Chat } from "@/lib/types"

interface ChatContainerProps {
    chats: Chat[]
}

export default function ChatContainer({ chats }: ChatContainerProps) {
    let chatComponents: React.JSX.Element[] = []
    chats.forEach((chat) => chatComponents.push(<ChatBubble key={Math.random()} chat={chat} color={chat.sender === "You" ? "bg-blue-500" : "bg-gray-500"} />))
    return (
        <div className="flex flex-col m-0 p-0 w-96 h-screen bg-gray-500">
            <div className="items-center m-0 p-0 w-full h-16 bg-red-500"/>
            <div className="scrollbar flex-grow m-0 p-0 w-full h-auto bg-green-500 overflow-y-auto">{chatComponents}</div>
            <div className="flex m-0 p-0 items-center justify-center w-full h-fit bg-blue-500">
                <input className="rounded-lg block text-black w-full h-fit p-2 bg-gray-200 outline-none" type="text" placeholder="Send a message" />
            </div>
        </div>
    )
}