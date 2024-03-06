"use client";

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

// import { useState, useEffect, useRef } from "react";
// import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

// export default function PlayArticle({ audio }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const audioRef = useRef(new Audio(audio));

//   useEffect(() => {
//     const onTimeUpdate = () => {
//       setProgress(
//         (audioRef.current.currentTime / audioRef.current.duration) * 100
//       );
//     };

//     if (isPlaying) {
//       audioRef.current.play();
//       audioRef.current.addEventListener("timeupdate", onTimeUpdate);
//     } else {
//       audioRef.current.pause();
//       audioRef.current.removeEventListener("timeupdate", onTimeUpdate);
//     }

//     return () => {
//       audioRef.current.removeEventListener("timeupdate", onTimeUpdate);
//     };
//   }, [isPlaying]);

//   return (
//     <div>
//       <button onClick={() => setIsPlaying(!isPlaying)}>
//         {isPlaying ? (
//           <PauseCircleIcon className="absolute left-4 top-4 h-10 w-10 rounded-xl bg-slate-400 text-white opacity-70 " />
//         ) : (
//           <PlayCircleIcon className="absolute left-4 top-4 h-10 w-10 rounded-xl bg-slate-400 text-white opacity-70 " />
//         )}
//       </button>
//       <progress value={progress} max="100" />
//     </div>
//   );
// }
