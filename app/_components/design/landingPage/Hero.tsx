import Link from "next/link";
import BurnoutIllustration from "./BurnoutIllustration";
import WatchVideo from "./WatchVideo";

import { Martel } from "next/font/google";

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Hero() {
  return (
    <div className="mx-auto mt-10 overflow-hidden px-2 py-6 md:px-8">
      <div className="relative flex h-full flex-col items-center gap-x-6 md:flex-row">
        <div className=" p-4 md:p-8 lg:p-16">
          <h1
            className={`${martel.className} text-5xl font-bold tracking-tight text-emerald-900 md:text-6xl`}
          >
            Let&apos;s make Burnout a thing of the{" "}
            <em className="underline decoration-yellow-300 underline-offset-8">
              past{" "}
            </em>
            .
          </h1>
          <p className="mt-6 text-lg tracking-wide text-slate-500">
            Stay happy, focussed and productive with our free content and tools.
            Avoid burnout using the workplace wellness app that focusses on
            stress and mental health.
          </p>
          <div className="mt-8 flex justify-center gap-x-6 lg:justify-start">
            <button className=" rounded-lg bg-emerald-900 px-4 py-2 text-white hover:bg-emerald-800">
              <Link href="/signup">Get Started</Link>
            </button>

            <WatchVideo />
          </div>
        </div>

        <BurnoutIllustration classes="" />
      </div>
    </div>
  );
}
