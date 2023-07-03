import Head from 'next/head';
import ChatInterface from '@chatbot/_components/ChatInterface';
import { initialSteps } from '@chatbot/_components/Steps';

export default function Chatbot({ params }: { params: { id: number } }) {
  console.log(params);
  return (
    <>
      <ChatInterface steps={initialSteps} />
    </>
  );
}
