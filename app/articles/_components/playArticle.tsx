"use client";

// import { useState, useEffect, useRef } from "react";
// import { useAtom } from "jotai";
// import { hasTheMicAtom } from "@/state/store";
// import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

// export default function PlayArticle({ audio, id }) {
//   const [hasTheMic, setHasTheMic] = useAtom(hasTheMicAtom);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   //   //Check to ensure this does not attempt to run on the server which causes hydration errors
//   useEffect(() => {
//     audioRef.current = new Audio(audio);
//   }, [audio]);

//   useEffect(() => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying]);

// const handleStop = () => {
//   if (audioRef.current) {
//     audioRef.current.pause();
//     audioRef.current.currentTime = 0;
//     onPauseOrStop();
//   }
// };

// return (
//   <span
//     className={`absolute left-2 top-2 flex gap-x-2 ${
//       anotherArticleIsPlaying && "hidden"
//     }`}
//   >
//     <button onClick={() => (isPlaying ? onPauseOrStop() : onPlay())}>
//       {isPlaying ? (
//         <PauseIcon className=" h-12 w-12 animate-pulse text-white md:h-10 md:w-10" />
//       ) : (
//         <PlayIcon className=" h-12 w-12 text-white md:h-10 md:w-10" />
//       )}
//     </button>
//     {isPlaying && (
//       <button onClick={handleStop}>
//         <StopIcon className=" h-12 w-12 text-white md:h-10 md:w-10" />
//       </button>
//     )}
//   </span>
// );

//   return (
//     <div>
//       <button onClick={() => setIsPlaying(!isPlaying)}>
//         {isPlaying ? (
//           <PauseCircleIcon className="absolute left-4 top-4 h-10 w-10 rounded-xl bg-slate-400 text-white opacity-70 " />
//         ) : (
//           <PlayCircleIcon className="absolute left-4 top-4 h-10 w-10 rounded-xl bg-slate-400 text-white opacity-70 " />
//         )}
//       </button>
//     </div>
//   );
// }

/* -------------------------------------- */

import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/20/solid";
interface PlayArticleProps {
  audio: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPauseOrStop: () => void;
  // Add this line
  anotherArticleIsPlaying: boolean;
}

export default function PlayArticle({
  audio,
  isPlaying,
  onPlay,
  onPauseOrStop,
  anotherArticleIsPlaying,
}: PlayArticleProps) {
  // const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  //   //Check to ensure this does not attempt to run on the server which causes hydration errors
  useEffect(() => {
    audioRef.current = new Audio(audio);
  }, [audio]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      onPauseOrStop();
    }
  };

  return (
    <span
      className={`absolute left-2 top-2 flex gap-x-2 ${
        anotherArticleIsPlaying && "hidden"
      }`}
    >
      <button onClick={() => (isPlaying ? onPauseOrStop() : onPlay())}>
        {isPlaying ? (
          <PauseIcon className=" h-12 w-12 animate-pulse text-white md:h-10 md:w-10" />
        ) : (
          <PlayIcon className=" h-12 w-12 text-white md:h-10 md:w-10" />
        )}
      </button>
      {isPlaying && (
        <button onClick={handleStop}>
          <StopIcon className=" h-12 w-12 text-white md:h-10 md:w-10" />
        </button>
      )}
    </span>
  );
}

/* -------------------------------------- */
