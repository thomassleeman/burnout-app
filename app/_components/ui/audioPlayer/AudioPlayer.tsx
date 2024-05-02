import Image from "next/image";
import logo from "@/components/design/brainLogo.png";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/20/solid";
import Marquee from "@/components/design/Marquee";

export default function AudioPlayer() {
  return (
    <div className="fixed bottom-0 left-0 grid h-16 w-full grid-cols-10 place-items-center border-y border-gray-500/25 bg-amber-50 md:bottom-4 md:h-20 md:w-2/5 lg:bottom-6">
      {/* <div className="relative col-span-2 h-full"> */}
      <Image
        src={logo}
        alt="image of logo"
        // layout="fill"
        objectFit="contain"
        width={40}
        height={40}
        className="z-50 col-span-2 h-12 w-auto"
      />
      {/* </div> */}

      {/* <div className="col-span-6 place-self-center"> */}
      {/* <Marquee
        title="Lorem ipsum"
        subtext="Repudiandae sint consequuntur vel."
        classes="col-span-5 place-self-center"
      /> */}
      <div className="z-0 col-span-6 max-w-full overflow-hidden">
        <div className="">
          {/* <p className=" animate-marquee whitespace-nowrap">
            Workplace wellness apps do not cure a stressful work environment.
          </p> */}
          <Marquee
            title="Workplace wellness apps do not cure a stressful work environment"
            subtext="Thomas Sleeman"
            classes="col-span-5 place-self-center"
          />
        </div>
      </div>

      {/* </div> */}

      {/* <div className="flex items-center justify-center justify-self-center">
        <div className="mx-auto self-center"> */}
      {/* <button className="col-span-1 h-6 w-6 text-white drop-shadow-xl md:h-10 md:w-10"> */}
      <PlayIcon className="col-span-1 h-6 w-6 text-slate-700 drop-shadow-xl" />
      {/* </button> */}
      {/* <button className="col-span-1 h-6 w-6 text-white drop-shadow-xl md:h-10 md:w-1"> */}
      <StopIcon className="col-span-1 h-6 w-6 text-slate-700 drop-shadow-xl" />
      {/* </button> */}
      {/* </div>
      </div> */}
    </div>
  );
}
