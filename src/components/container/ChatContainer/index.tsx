import ChatBubble from "@/components/ChatBubble"
import { Chat } from "@/lib/types"
import { useEffect, useRef, useState } from "react"

interface ChatContainerProps {
    
}

export default function ChatContainer({ }: ChatContainerProps) {
    const [chats, setChats] = useState<Chat[]>([
        {
          sender: "You",
          text: "Should I buy this stock?",
          left: false,
        },
        {
          sender: "ChatGPT",
          text: "Buying AAPL stocks is generally safe.",
          left: true,
        },
        {
          sender: "You",
          text: "Is it likely the price will go up soon?",
          left: false,
        },
        {
          sender: "ChatGPT",
          text: "Based on current market sentiment, it's likely that AAPL will go up in price.",
          left: true
        },
        {
          sender: "You",
          text: "Should I buy this stock?",
          left: false,
        },
        {
          sender: "ChatGPT",
          text: "Buying AAPL stocks is generally safe.",
          left: true,
        },
        {
          sender: "You",
          text: "Is it likely the price will go up soon?",
          left: false,
        },
        {
          sender: "ChatGPT",
          text: "Based on current market sentiment, it's likely that AAPL will go up in price.",
          left: true
        }
      ])
    const [selected, setSelected] = useState<boolean>(false)
    const sendChat = (chat: Chat): void => {
      let newChats = chats.map((c) => c)
      newChats.push(chat)
      setChats(newChats)
    }
    const chatboxRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        chatboxRef.current && chatboxRef.current!.scrollIntoView({ behavior: "smooth" })
    }, [chats])
    let chatComponents: React.JSX.Element[] = []
    chats.forEach((chat) => chatComponents.push(<ChatBubble key={Math.random()} chat={chat} color={chat.sender === "You" ? "bg-blue-500" : "bg-gray-400"} />))
    return (
        <div className="flex flex-col m-0 p-0 w-3/5 h-screen bg-white">
            <div className="items-center m-0 p-0 w-full h-16 bg-white"/>
            <div className="scrollbar flex-grow m-0 p-0 w-full h-auto bg-white overflow-y-auto">
                {chatComponents}
                <div ref={chatboxRef} />
            </div>
            <div className={`transition flex m-0 p-1 items-center justify-center w-full h-fit bg-white ${selected ? "brightness-95" : "brightness-100"}`}>
                <input className="rounded-lg block text-black w-full h-fit p-2 bg-gray-200 outline-none" type="text" placeholder="Send a message" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} onKeyDown={(e) => {
                    const value = e.currentTarget.value
                    if (e.key !== "Enter" || !value) return
                    e.currentTarget.value = ""
                    const chat = {
                        sender: "You",
                        text: value,
                        left: false
                    }
                    sendChat(chat)
                }} />
            </div>
        </div>
    )
}