"use client";

import config from "@chatbot/bot/config.js";
import MessageParser from "@chatbot/bot/MessageParser.jsx";
import ActionProvider from "@chatbot/bot/ActionProvider.jsx";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "@chatbot/bot/customStyles.css";

const ChatbotPage = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        placeholderText="Text input is disabled for this exercise."
      />
    </div>
  );
};

export default ChatbotPage;
