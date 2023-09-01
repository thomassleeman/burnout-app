import { Martel } from "next/font/google";

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Burnout Project Articles",
  description:
    "Understand burnout and how to create a more productive workplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className={`${martel.className} dark:bg-slate-800`}>
      {children}
    </article>
  );
}
