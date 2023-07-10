import Head from "next/head";
import ChatInterface from "@chatbot/_components/ChatInterface";
import { initialSteps } from "@/app/chatbot/steps/Steps";

export default function Chatbot({ params }: { params: { id: number } }) {
  return (
    <>
      <ChatInterface steps={initialSteps} />
    </>
  );
}
