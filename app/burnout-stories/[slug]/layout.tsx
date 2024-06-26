import StoriesHeader from "../StoriesHeader";

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
      <StoriesHeader />
      <section className={`lg:mt-18 mt-8 md:mt-14`}>{children}</section>
    </>
  );
}
