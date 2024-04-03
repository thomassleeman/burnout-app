export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 flex flex-col gap-y-12 lg:mt-16 lg:gap-y-28">
      {children}
    </div>
  );
}
