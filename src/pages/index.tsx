import ChatContainer from "@/components/container/ChatContainer";
import MainContainer from "@/components/container/MainContainer";

export default function Home() {
  return (
    <div className="flex flex-row m-0 p-0 w-screen h-screen text-custom-gray-4">
      <ChatContainer />
      <MainContainer />
    </div>
  )
}
