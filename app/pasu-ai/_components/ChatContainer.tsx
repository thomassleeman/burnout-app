// app/chatbot/_components/ChatContainer.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import ChatInterface from "./ChatInterface";
import ChatInput from "./ChatInput";
import SuggestedPrompts from "./SuggestedPrompts";
import { model } from "@/firebase/auth/appConfig";
import { ChatSession } from "firebase/vertexai";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const SYSTEM_INSTRUCTIONS = `You are a therapeutic assistant specializing in workplace mental health and burnout. 
Your goal is to help users understand their stress levels, identify signs of burnout, and develop coping strategies. Do not answer questions that are not relevant to mental health or wellbeing.

Important guidelines:
- Be empathetic, warm, and supportive in your tone
- Ask insightful follow-up questions to better understand the user's situation
- Provide evidence-based information about burnout (physical, emotional, and cognitive symptoms)
- Suggest practical coping strategies specific to workplace burnout
- Emphasize self-care and setting boundaries
- Recognize when to recommend professional help
- Keep responses concise (100-150 words max) and conversational
- Never claim to be a replacement for professional therapy

Focus on the most common burnout factors: workload, control, reward, community, fairness, and values alignment.`;

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);

  // Calculate available height on mount and window resize
  useEffect(() => {
    const calculateHeight = () => {
      if (containerRef.current) {
        const navHeight = 64; // Approximate height of your Nav
        const viewportHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const availableHeight = viewportHeight - containerTop - 24; // 24px bottom padding

        containerRef.current.style.height = `${availableHeight}px`;
      }
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  // Initialize chat session
  useEffect(() => {
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    setChatSession(chat);
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !chatSession) return;

    // Hide intro when first message is sent
    if (showIntro) {
      setShowIntro(false);
    }

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepend system instructions to first message
      const isFirstMessage = messages.length === 0;
      let messageToSend = message;

      if (isFirstMessage) {
        messageToSend = `${SYSTEM_INSTRUCTIONS}
        
        User message: ${message}`;
      }

      // Create an initial empty assistant message
      const botResponseId = (Date.now() + 1).toString();
      const initialBotResponse: Message = {
        id: botResponseId,
        content: "",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, initialBotResponse]);

      // Send message to Vertex AI and get streaming response
      const result = await chatSession.sendMessageStream(messageToSend);

      // Process the streaming response
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();

        // Update the bot message with the new chunk
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const botMessageIndex = updatedMessages.findIndex(
            (msg) => msg.id === botResponseId
          );

          if (botMessageIndex !== -1) {
            updatedMessages[botMessageIndex] = {
              ...updatedMessages[botMessageIndex],
              content: updatedMessages[botMessageIndex].content + chunkText,
            };
          }

          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message to Vertex AI:", error);

      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I encountered an issue while processing your message. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = [
    {
      content: "What are the signs of workplace burnout?",
      onClick: () =>
        handleSendMessage("What are the signs of workplace burnout?"),
    },
    {
      content: "I feel overwhelmed at work. Could I be experiencing burnout?",
      onClick: () =>
        handleSendMessage(
          "I feel overwhelmed at work. Could I be experiencing burnout?"
        ),
    },
    {
      content: "How can I establish better work-life boundaries?",
      onClick: () =>
        handleSendMessage("How can I establish better work-life boundaries?"),
    },
    {
      content: "What are some strategies to recover from burnout?",
      onClick: () =>
        handleSendMessage("What are some strategies to recover from burnout?"),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col items-stretch justify-between rounded-lg"
    >
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto">
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          showIntro={showIntro}
        />
      </div>

      {/* Suggested prompts shown only when intro is visible */}
      {showIntro && (
        <div className="mb-4 hidden px-4 lg:inline-block">
          <SuggestedPrompts prompts={suggestedPrompts} />
        </div>
      )}

      {/* Input at the bottom */}
      <div className="">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
