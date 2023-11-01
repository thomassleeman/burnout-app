export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-8 flex flex-col gap-y-32 lg:mt-16">{children}</div>;
}
