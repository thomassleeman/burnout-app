import Footer from "../_components/ui/Footer";

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col gap-y-12">{children}</div>
      <Footer />
    </div>
  );
}
