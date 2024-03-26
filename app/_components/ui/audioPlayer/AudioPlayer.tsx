import Image from "next/image";
import logo from "@/components/design/brainLogo.png";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/20/solid";
import { GoForward15Icon, GoBack15Icon } from "./forwardBack15";
import Marquee from "@/components/design/Marquee";

export default function MediaPlayer() {
  return (
    <div className=" fixed bottom-0 left-0 grid h-16 w-full grid-cols-10 bg-white/30 drop-shadow-lg backdrop-blur-xl md:bottom-4 md:h-20 md:w-2/5 lg:bottom-6">
      <div className="relative col-span-2 h-full">
        <Image
          src={logo}
          alt="image of logo"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* <div className="col-span-6 place-self-center"> */}
      <Marquee
        title="Lorem ipsum"
        subtext="Repudiandae sint consequuntur vel."
        classes="col-span-5 place-self-center"
      />
      {/* </div> */}

      {/* <div className="flex items-center justify-center justify-self-center">
        <div className="mx-auto self-center"> */}
      {/* <button className="col-span-1 h-6 w-6 text-white drop-shadow-xl md:h-10 md:w-10"> */}
      <PlayIcon className="col-span-1 h-6 w-6 text-white drop-shadow-xl" />
      {/* </button> */}
      {/* <button className="col-span-1 h-6 w-6 text-white drop-shadow-xl md:h-10 md:w-1"> */}
      <StopIcon className="col-span-1 h-6 w-6 text-white drop-shadow-xl" />
      {/* </button> */}
      {/* </div>
      </div> */}
    </div>
  );
}
