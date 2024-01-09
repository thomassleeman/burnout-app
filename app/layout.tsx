import "./globals.css";
import type { Metadata, Viewport } from "next";
import Providers from "@/state/providers";

import Nav from "./_components/ui/nav/Nav";
import Footer from "./_components/ui/Footer";
// import GlossaryModal from "./_components/ui/modal/Modal";

//TODO: Header stuff, SEO, etc.

export const metadata: Metadata = {
  title: "Burnout Project",
  description:
    "A project to help people with burnout and pay Tom and Aaron's heating bills in the process",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //h-full
    // <html lang="en" className="dark:bg-slate-700 dark:text-white">
    // <html lang="en" className="dark">
    <html lang="en">
      <Providers>
        <body className="flex flex-col bg-amber-50/75 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 dark:to-zinc-900 dark:text-white">
          {/* <body> */}
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
