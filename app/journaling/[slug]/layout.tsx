import type { Metadata } from "next";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "My Journal",
  description:
    "Journaling is a proven way of organising your thoughts and reflecting on your day.",
};

export default async function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-2 md:mx-10 lg:mx-16">
        <section className="">{children}</section>
      </div>
      <Footer />
    </>
  );
}
