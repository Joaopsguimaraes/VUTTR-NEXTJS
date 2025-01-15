import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className="size-full flex flex-col gap-2 items-center justify-center bg-primary">
        <h2 className="text-5xl text-gray-200 font-medium tracking-wide">
          VUTTR
        </h2>
        <p className="text-lg text-gray-200 font-medium">
          Very Useful Tools to Remember
        </p>
      </div>
      <div className="w-full flex justify-center">
        <SignUp />
      </div>
    </section>
  );
}
