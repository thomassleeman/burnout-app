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
  return (
    <section className="">
      {/* <div className="max-w-7xl">
        <h1 className="my-3 ml-2 text-2xl font-thin leading-tight text-gray-900 sm:ml-0">
          Chatbot
        </h1>
      </div> */}
      {children}
    </section>
  );
}
