import Footer from "../../_components/ui/Footer";
import ArticleFooter from "../_components/ArticleFooter";

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
      <section className={`mt-8 lg:mt-16`}>{children}</section>
      <Footer />
    </>
  );
}
