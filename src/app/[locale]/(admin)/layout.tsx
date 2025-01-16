import { SiteHeader } from '@/components/header'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex size-full flex-1 flex-col">
      <SiteHeader />
      {children}
    </div>
  )
}
