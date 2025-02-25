// app/chatbot/_components/ChatInput.tsx

"use client";
import { useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Send a message..."
          //   className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          className="w-full rounded-full border-0 bg-white px-4 py-4 pr-12 text-gray-900 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700/50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        {/* Clip/attachment button */}
        <button
          type="button"
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Send button */}
        <button
          type="submit"
          className={`absolute right-3 top-1/2 -translate-y-1/2 transform text-emerald-700 hover:text-emerald-600 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          <ArrowUpCircleIcon className="h-9 w-9" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
