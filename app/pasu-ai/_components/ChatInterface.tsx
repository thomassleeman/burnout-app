// app/chatbot/_components/ChatInterface.tsx
"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import logo from "@/components/design/brainLogoCompressed.png";
import ChatMessage from "./ChatMessage";
import LogoAI from "./LogoAI";
import InfoDialogue from "./InfoDialogue";

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
          <div className="mb-2 flex items-center gap-x-2">
            <h2 className="text-2xl font-light text-gray-900">
              PASU AI Therapy Assistant
            </h2>
            <InfoDialogue />
          </div>
          <p className="max-w-md text-sm text-gray-500">
            Your conversations here are private and designed to help you reflect
            on your wellbeing and develop strategies for managing stress.
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLoading={isLoading}
            />
          ))}
          {/* {isLoading && (
            <div className="mb-4 flex items-start">
              <Image
                className="mr-2 h-11 w-auto py-2"
                src={logo}
                alt="AI-powered Logo"
              />
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
          )} */}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;
