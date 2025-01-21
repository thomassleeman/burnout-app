import Footer from "../../_components/ui/Footer";

export default function orgLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto mb-auto sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
