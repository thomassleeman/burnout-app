"use client";
import { useRouter } from "next/navigation";

export default function PaymentSuccessful({
  email,
  quantity,
}: {
  email: string;
  quantity: number;
}) {
  console.log("quantity: ", quantity);
  const router = useRouter();
  return (
    <div className=" py-12 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className=" mx-auto flex max-w-2xl flex-col gap-y-12 lg:mx-0">
          <div className="">
            <p className="text-base/7 font-semibold text-emerald-600">
              Payment successful
            </p>
            <p className="text-gray-500">Your subscription is now active.</p>
            <h1 className="text-pretty mb-8 mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Welcome aboard!
            </h1>
            <div className="my-6 border-y-2 border-y-sky-200 py-6">
              <q className="mt-6 text-xl/8 font-extralight text-gray-700">
                Burnout is what happens when you try to avoid being human for
                too long.
              </q>
              <p className="text-sm font-semibold">- Michael Gungor</p>
            </div>
          </div>
          <div className=" font-semibold tracking-tight text-gray-900">
            {quantity !== null && quantity > 1 ? (
              <div>
                <p>{email}</p>
                <p className="mb-16 text-2xl underline">
                  You have purchased <strong>{quantity}</strong> seats.
                </p>
                <p>Let&apos;s create an organization to manage your team:</p>
                <button
                  onClick={() => router.push("/subscribe/create-organisation")}
                  className="btn btn-primary mt-4 rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-600"
                >
                  Create Organization
                </button>
              </div>
            ) : (
              <p>You have purchased a single-seat subscription.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
