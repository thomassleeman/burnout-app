import "./globals.css";
import type { Metadata, Viewport } from "next";
import Providers from "@/state/providers";
import SetUser from "@/state/SetUser";
import AuthNoticeModal from "./_components/ui/modal/AuthNoticeModal";
import ErrorAlert from "@/components/ui/ErrorAlert";

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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <Providers>
        <body className="z-50 flex h-full min-h-screen flex-col bg-amber-50/25 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 dark:to-zinc-900 dark:text-white">
          <Nav />
          <NextTopLoader showSpinner={false} shadow={false} color="#047857" />

          <SetUser />
          {/* <AuthNoticeModal notice="accountRequired" /> */}
          <main className="selection:bg-emerald-500/25 selection:text-emerald-900">
            {children}
            {modal}
            <Analytics />
          </main>
          <ErrorAlert />
          <AudioPlayer />
        </body>
      </Providers>
    </html>
  );
}
