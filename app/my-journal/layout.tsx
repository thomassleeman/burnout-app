import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Journal",
  description:
    "Journaling is a proven way of organising your thoughts and reflecting on your day.",
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mx-2 md:mx-6 lg:mx-16">{children}</section>;
  // return <section className="">{children}</section>;
}
