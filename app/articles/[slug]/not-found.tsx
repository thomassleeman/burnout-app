//TODO: Does this clash with my 404 page?
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Oops, sorry, we couldn&apos;t find that article</h1>
      <Link href="/articles">
        <button className="mt-6 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Return to Library
        </button>
      </Link>
    </>
  );
}
