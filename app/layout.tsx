import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/state/providers';

import Nav from './_components/ui/Nav';
import Footer from './_components/ui/Footer';

//TODO: Header stuff, SEO, etc.

export const metadata: Metadata = {
  title: 'Burnout Project',
  description:
    "A project to help people with burnout and pay Tom and Aaron's heating bills in the process",
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className="flex h-screen flex-col">
          <Nav />
          <main className="container mx-auto mb-auto flex flex-col space-y-32 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
