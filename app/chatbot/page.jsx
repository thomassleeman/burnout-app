"use client";

import config from "./bot/config.js";
import MessageParser from "./bot/MessageParser.jsx";
import ActionProvider from "./bot/ActionProvider.jsx";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./bot/customStyles.css";
import { useChatbotState } from "react-chatbot-kit";

const ChatbotPage = () => {
  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        // placeholderText='Type "save" to save your progress.'
        placeholderText="Text input is disabled for this exercise."
      />
    </div>
  );
};

export default ChatbotPage;
