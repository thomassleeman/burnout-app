import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="container mx-auto flex h-96 flex-col items-center justify-center p-4 text-lg">
      <h1>Your purchase was unsuccessful.</h1>
      <p>
        Please{" "}
        <Link
          className="text-emerald-600 underline underline-offset-2"
          href="/subscribe"
        >
          try again
        </Link>
        .
      </p>
    </div>
  );
}
