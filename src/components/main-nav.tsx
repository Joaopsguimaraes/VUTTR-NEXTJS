'use client'

export function MainNav() {
  return (
    <header className="flex w-full items-center justify-center gap-4 py-4">
      <h2 className="text-5xl font-medium tracking-widest text-gray-200">
        VUTTR
        <span className="before:content-[' '] border-r-[6px] border-r-blue-800 pl-4"></span>
      </h2>
      <p className="text-sm font-medium text-gray-200">
        Very Useful Tools to Remember
      </p>
    </header>
  )
}
