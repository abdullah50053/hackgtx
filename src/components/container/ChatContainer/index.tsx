import ChatBubble from "@/components/ChatBubble"
import ChartSVG from "@/components/svg/ChartSVG"
import { Chat, Stock } from "@/lib/types"
import { UserData } from "@/lib/user"
import { useEffect, useRef, useState } from "react"

interface ChatContainerProps {
  stocks: Stock[]
  currIndex: number
  user: UserData | undefined
}

export default function ChatContainer({ stocks, currIndex, user }: ChatContainerProps) {
    const [chats, setChats] = useState<Chat[]>(/*[
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
      ]*/[])
    const [selected, setSelected] = useState<boolean>(false)
    const sendChat = async (chat: Chat): Promise<void> => {
      let newChats = chats.map((c) => c)
      newChats.push(chat)

      setChats(newChats)
      // Send fetch req
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat/any`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: chat.text
        })
      }).then(async (res) => {
      if (res.status !== 200) {
        console.error(res.status, res.statusText, res.body)
      } else {
        const data = await res.text();
        newChats.push({
          sender: "MoneyMoo",
          text: data,
          left: true
        });
      }
      });
    }
    const chatboxRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        chatboxRef.current && chatboxRef.current!.scrollIntoView({ behavior: "smooth" })
    }, [chats])
    let chatComponents: React.JSX.Element[] = []
    chats.forEach((chat) => chatComponents.push(<ChatBubble key={Math.random()} chat={chat} color={chat.sender === "You" ? "bg-blue-500" : "bg-gray-400"} />))

    const prompts = ["Should I buy/sell/hold?", "Next best time to buy?", "Stock information."]
    const promptComponents = prompts.map((p, i) => <div key={i} className="rounded-xl mx-4 p-4 w-fit flex-shrink-0 cursor-pointer bg-gray-200 text-center hover:brightness-90" onClick={() => {
      promptMsg(i);
    }}>{p}</div>)
    
    const promptMsg = async (i: number): Promise<void> => {
      let newChats = chats.map((c) => c)
      newChats.push({
        sender: "You",
        text: prompts[i],
        left: false
      })
      setChats(newChats)
      
      const t = stocks[currIndex].ticker;
      
      const eps = ['buy', 'buywhen', 'info']
      
      // Send fetch req
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat/${eps[i]}/${t}/${user ? user?.experience : 'beginner'}`, {
        mode: "cors",
        method: "POST",
        body: "",
      }).then(async (res) => {
        if (res.status !== 200) {
          console.error(res.status, res.statusText, res.body)
        } else {
          console.log(res);
          const data = await res.text();
          const newNewChats = newChats.map((c) => c)
          
          newNewChats.push({
            sender: "MoneyMoo",
            text: data,
            left: true
          });
          
          setChats(newNewChats);
        }
      });
    }

    return (
        <div className="flex flex-col m-0 p-0 w-96 h-screen bg-white">
            <div className="flex flex-row items-center justify-center mx-auto p-0 w-fit h-16 bg-white">
              <ChartSVG className="w-10 h-10 mr-8" />
              <div className="text-black text-center text-lg font-bold">Cash Course</div>
            </div>
            <div className="scrollbar flex-grow m-0 p-0 w-full h-auto bg-white overflow-y-auto">
                {chatComponents}
                <div ref={chatboxRef} />
            </div>
            <div className="flex flex-row m-0 p-1 items-center text-black h-fit overflow-x-auto bg-white">
              {promptComponents}
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