import Link from "next/link";
export default function FourOOne() {
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <h1 className="mt-24 text-4xl">401: Unauthorized</h1>
      </div>
      <Link
        className="mt-12 flex justify-center text-lg text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
        href="/home"
      >
        Home
      </Link>
    </>
  );
}
