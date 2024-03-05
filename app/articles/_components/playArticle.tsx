import { useState, useEffect, useRef } from "react";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

interface PlayArticleProps {
  audio: string;
}

export default function PlayArticle({ audio }: PlayArticleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audio));

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <button onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? (
        <PauseCircleIcon className="absolute left-2 top-2 h-12 w-12 animate-pulse rounded-xl bg-slate-400 text-white opacity-90 " />
      ) : (
        <PlayCircleIcon className="absolute left-2 top-2 h-12 w-12 rounded-xl bg-slate-400 text-white opacity-90 " />
      )}
    </button>
  );
}

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
