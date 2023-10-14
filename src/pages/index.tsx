import ChatContainer from "@/components/container/ChatContainer";
import MainContainer from "@/components/container/MainContainer";
import { Chat } from "@/lib/types";
import { useState } from "react";

interface HomeProps {
  
}

export default function Home({ }: HomeProps) {
  return (
    <div className="flex flex-row m-0 p-0 w-screen h-screen text-custom-gray-4">
      <ChatContainer />
      <MainContainer />
    </div>
  )
}

export function getServersideProps(): HomeProps {
  return {
    
  }
}