import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/state/providers";

import Nav from "./_components/ui/nav/Nav";
import Footer from "./_components/ui/Footer";
// import GlossaryModal from "./_components/ui/modal/Modal";

//TODO: Header stuff, SEO, etc.

export const metadata: Metadata = {
  title: "Burnout Project",
  description:
    "A project to help people with burnout and pay Tom and Aaron's heating bills in the process",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //h-full
    <html lang="en" className=" dark:bg-slate-700 dark:text-white">
      <Providers>
        {/* h-screen */}
        <body className="flex flex-col">
          <Nav />
          {/* space-y-32 */}
          <main className="container mx-auto mb-auto flex flex-col sm:px-6 lg:px-8">
            {children}
          </main>
          {/* <Footer /> */}
        </body>
      </Providers>
    </html>
  );
}
