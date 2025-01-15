"use client";

export function MainNav() {
  return (
    <header className="flex items-center justify-center gap-4 w-full py-4">
      <h2 className="text-5xl text-gray-200 font-medium tracking-widest">
        VUTTR
        <span className="pl-4 before:content-[' '] border-r-blue-800 border-r-[6px]"></span>
      </h2>
      <p className="text-sm text-gray-200 font-medium">
        Very Useful Tools to Remember
      </p>
    </header>
  );
}
