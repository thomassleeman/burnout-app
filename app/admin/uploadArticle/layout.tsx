import { Martel } from "next/font/google";

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Upload an Article",
  description: "Use this page to upload an article to the site.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <article className={`${martel.className}`}>{children}</article>;
}
