import { SiteHeader } from "@/components/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full flex flex-col flex-1">
      <SiteHeader />
      {children}
    </div>
  );
}
