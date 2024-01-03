import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbot",
  description: "Take a moment to reflect with our chatbot",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
