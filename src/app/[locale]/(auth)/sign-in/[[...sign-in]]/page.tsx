import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <div className="flex size-full flex-col items-center justify-center gap-2 bg-primary">
        <h2 className="text-5xl font-medium tracking-wide text-gray-200">
          VUTTR
        </h2>
        <p className="text-lg font-medium text-gray-200">
          Very Useful Tools to Remember
        </p>
      </div>
      <div className="flex w-full justify-center">
        <SignIn />
      </div>
    </section>
  )
}
