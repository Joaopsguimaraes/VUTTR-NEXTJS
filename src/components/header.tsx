import { UserButton } from '@clerk/nextjs'

import { MainNav } from './main-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-zinc-900 backdrop-blur">
      <div className="container flex max-w-screen-2xl items-center justify-between">
        <MainNav />
        <UserButton />
      </div>
    </header>
  )
}
