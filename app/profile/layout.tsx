import Footer from "../_components/ui/Footer";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto mb-auto sm:px-6 lg:px-8">
      <div className=" flex flex-col gap-y-12 lg:gap-y-28">{children}</div>
      <Footer />
    </div>
  );
}
