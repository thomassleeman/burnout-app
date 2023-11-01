import { Martel } from "next/font/google";
import Footer from "../_components/ui/Footer";

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
    <>
      <section className={`${martel.className} mt-8 lg:mt-16`}>
        {children}
      </section>
      <Footer />
    </>
  );
}
