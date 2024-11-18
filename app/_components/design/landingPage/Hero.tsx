import Link from "next/link";
import BurnoutImage from "./images/BurnoutImage";
import TargetImage from "./images/TargetImage";
import WatchVideo from "./WatchVideo";
import AlarmClockImage from "./images/AlarmClockImage";
import CalculatorImage from "./images/CalculatorImage";
import BossArmImage from "./images/BossArmImage";

import { Martel } from "next/font/google";

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Hero() {
  return (
    <div className="mx-auto mt-0 overflow-hidden px-2 py-6 md:mt-6 md:px-8 lg:mt-16 lg:px-12">
      <div className=" flex h-full flex-col items-center gap-x-6 lg:flex-row">
        <div className="mt-6 flex-1 px-4 lg:mt-0 lg:px-2 xl:px-4">
          <h1
            className={`${martel.className} text-5xl font-bold tracking-tight text-emerald-900 md:text-6xl`}
          >
            Let&apos;s make{" "}
            <span className="font-sans font-semibold">Burnout</span> a thing of
            the{" "}
            <em className="underline decoration-yellow-300 underline-offset-8">
              past
            </em>
            .
          </h1>
          <p className="mt-6 tracking-wide text-slate-500 lg:text-lg xl:text-xl">
            Articles, courses and tools to{" "}
            <em className="font-semibold">fight burnout amongst your team</em>.
            Welcome to the wellness platform focused on stress and mental health
            at work.
          </p>
          <div className="mt-8 flex max-w-fit flex-row justify-center gap-x-6 lg:flex-col lg:gap-y-4 xl:flex-row xl:justify-start">
            <button className=" rounded-lg bg-emerald-900 px-4 py-2 text-white hover:bg-emerald-800">
              <Link href="/signup">Get Started</Link>
            </button>

            <WatchVideo />
          </div>
        </div>

        <div className="relative mt-16 flex h-full w-full flex-1 justify-center lg:mt-0">
          <BurnoutImage
            classes={" h-full w-auto lg:w-full lg:h-auto max-w-xl xl:max-w-3xl"}
          />
          <TargetImage classes="h-16 sm:h-24 2xl:h-32 w-auto animate-bounce absolute top-0 left-0 md:left-1/4 lg:left-0 2xl:left-4 z-20" />
          <AlarmClockImage classes="absolute h-14 sm:h-20 2xl:h-24 w-auto animate-spin bottom-5 sm:bottom-20 right-14 md:right-1/4 lg:right-14 2xl:right-24 z-20" />
          <CalculatorImage classes=" absolute h-12 sm:h-20 w-auto animate-quick-bounce bottom-12 left-16 sm:left-20 2xl:left-1/4 z-20" />
          <BossArmImage classes=" absolute h-24 xl:h-40 w-auto animate-wave top-4 sm:top-12 right-0 md:right-20 lg:right-0 z-20" />
        </div>
      </div>
    </div>
  );
}
