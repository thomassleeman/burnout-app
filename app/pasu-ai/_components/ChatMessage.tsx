// app/chatbot/_components/ChatMessage.tsx

import Image from "next/image";
import LogoAI from "./LogoAI";
import logo from "@/components/design/brainLogoCompressed.png";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

type ChatMessageProps = {
  message: Message;
  isLoading: Boolean;
};

const ChatMessage = ({ message, isLoading }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`mb-6 flex items-start`}>
      {!isUser && (
        <Image
          src={logo}
          alt="Pasu health logo"
          height={200}
          width={200}
          className={`mr-2 h-11 w-auto py-2 ${isLoading && "animate-pulse"}`}
        />
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[75%] px-4 py-2 ${
          isUser
            ? "ml-auto rounded-lg bg-emerald-700 text-white"
            : "text-gray-900"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
