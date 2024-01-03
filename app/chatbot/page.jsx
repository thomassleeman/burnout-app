"use client";

import config from "./bot/config.js";
import MessageParser from "./bot/MessageParser";
import ActionProvider from "./bot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./bot/customStyles.css";

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
