// app/not-found.tsx
import Link from "next/link";
import Image from "next/image";
import Footer from "./_components/ui/Footer";
import Lost from "@/public/lost.jpg";
export default function NotFound() {
  return (
    <>
      <main className="relative isolate min-h-full">
        <Image
          src={Lost}
          alt="Not found image"
          className="absolute inset-0 left-0 top-0 -z-10 flex h-screen w-full items-center object-cover object-top"
          priority
        />
        <div className="mx-auto flex max-w-7xl justify-center justify-items-center px-6 py-32 text-center align-middle sm:py-40 lg:px-8">
          <div className="max-w-fit bg-slate-600 bg-opacity-20 p-4">
            <p className="text-base text-xl font-semibold leading-8 text-white">
              404
            </p>
            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-base text-white/70 sm:mt-6">
              Sorry, we couldn&apos;t find the page you’re looking for.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/dashboard"
                className="text-sm font-semibold leading-7 text-white"
              >
                <span aria-hidden="true">&larr;</span> Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
