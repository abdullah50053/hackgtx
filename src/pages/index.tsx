import ChatContainer from "@/components/container/ChatContainer";
import MainContainer from "@/components/container/MainContainer";

export default function Home() {
  const chats = [
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
  ]
  return (
    <div className="flex flex-row m-0 p-0 w-screen h-screen text-custom-gray-4">
      <ChatContainer chats={chats} />
      <MainContainer />
    </div>
  )
}
