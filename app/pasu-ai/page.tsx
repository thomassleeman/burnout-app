// app/chatbot/page.tsx
import ChatContainer from "./_components/ChatContainer";

export default function ChatbotPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-72px)] max-w-4xl px-4 py-8">
      <ChatContainer />
    </div>
  );
}
