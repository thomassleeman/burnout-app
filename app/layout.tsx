import "./globals.css";
import type { Metadata, Viewport } from "next";
import Providers from "@/state/providers";

import Nav from "./_components/ui/nav/Nav";

import AudioPlayer from "@/components/ui/audioPlayer/AudioPlayer";

import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";

//TODO: Header stuff, SEO, etc.

export const metadata: Metadata = {
  title: "The Burnout Hub",
  description:
    "A comprehensive guide to understanding and preventing burnout. Includes practical exercises and resources for enhancing workplace wellness.",
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
    <html lang="en">
      <Providers>
        <body className="flex flex-col bg-amber-50/75 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 dark:to-zinc-900 dark:text-white">
          <Nav />
          <NextTopLoader showSpinner={false} shadow={false} />
          <h1 className=" w-full bg-amber-100 py-1 pl-3 text-sm font-extralight text-slate-600 lg:pl-8">
            The Burnout Hub is currently under development but please feel free
            to take a look around 😎
          </h1>
          <main className="selection:bg-fuchsia-300/50 selection:text-fuchsia-900">
            {children}
            <Analytics />
          </main>
          <AudioPlayer />
        </body>
      </Providers>
    </html>
  );
}
