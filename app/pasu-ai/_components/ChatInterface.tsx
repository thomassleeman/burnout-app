// app/chatbot/_components/ChatInterface.tsx
"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import logo from "@/components/design/brainLogoCompressed.png";
import ChatMessage from "./ChatMessage";
import LogoAI from "./LogoAI";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type ChatInterfaceProps = {
  messages: Message[];
  isLoading: boolean;
  showIntro: boolean;
};

const ChatInterface = ({
  messages,
  isLoading,
  showIntro,
}: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-4">
      {showIntro ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="mb-4">
              <LogoAI />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Burnout Support Assistant
          </h2>
          <p className="mb-6 text-gray-700 md:max-w-md">
            This is an AI-powered assistant designed to help you understand and
            manage workplace burnout. It uses advanced AI to provide
            personalised support and guidance.
          </p>
          <p className="max-w-md text-sm text-gray-500">
            Your conversations are private and designed to help you reflect on
            your wellbeing and develop strategies for managing stress.
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="mb-4 flex items-start">
              <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                </svg>
              </div>
              <div className=" px-4 py-2 text-gray-900">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;
