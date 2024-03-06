import Image from "next/image";
import logo from "@/components/design/brainLogo.png";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/20/solid";

export default function MediaPlayer() {
  return (
    <div className=" fixed bottom-0 left-0 flex w-full place-content-between items-center border-t-2 border-black bg-yellow-200 md:h-28">
      <div className="mx-2 h-full">
        <Image src={logo} alt="image of logo" className="h-full w-auto" />
      </div>
      <div className="mx-4">
        <h4 className="text-lg font-bold">Lorem ipsum</h4>
        <p className="mt-1">
          Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam
          expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.
        </p>
      </div>
      <div className="mx-2 h-full w-auto border ">
        <button className="bg-green-500">
          <PlayIcon className="h-12 w-12 text-white md:h-10 md:w-10" />
        </button>
      </div>
    </div>
  );
}
