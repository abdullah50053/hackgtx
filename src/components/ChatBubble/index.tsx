import { Chat } from "@/lib/types"

interface ChatBubbleProps {
    chat: Chat
    color: string
}

export default function ChatBubble({ chat, color }: ChatBubbleProps) {
    return (
        <div className="flex flex-col w-full h-fit my-1 px-4">
            {chat.sender && <div className={`text-sm text-gray-800 ${!chat.left && "text-right"}`}>{chat.sender}</div>}
            <div className={`rounded-xl w-fit p-2 ${color} ${!chat.left && "ml-auto"}`}>{chat.text}</div>
        </div>
    )
}