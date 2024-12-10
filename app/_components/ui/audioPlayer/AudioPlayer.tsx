"use client";

//jotai
import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { playThisAtom } from "@/state/store";
import Image from "next/image";

import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Marquee from "@/components/design/Marquee";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
}

const ProgressBar = ({ currentTime, duration }: ProgressBarProps) => {
  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="relative h-2 w-4/5 self-center justify-self-center rounded bg-gray-300">
      <div
        className="absolute left-0 top-0 h-full rounded bg-sky-400"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <div
        className="absolute top-1/2 h-2 w-2 rounded-full bg-sky-600"
        style={{
          left: `${progressPercentage}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
};

interface PlayThisType {
  audio: string;
  image: string;
  title: string;
  author: string;
}

export default function AudioPlayer() {
  const [playThis, setPlayThis] = useAtom(playThisAtom);
  const { audio, image, title, author } = playThis;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play when audio file changes
  useEffect(() => {
    if (audio) {
      handleStop();
      if (audioRef.current) {
        audioRef.current.src = audio;
      } else {
        audioRef.current = new Audio(audio);
      }

      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          audioRef.current.play(); // Play audio after metadata is loaded
          setIsPlaying(true);
          setIsPaused(false);
        }
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        }
      };
    }
  }, [audio]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();

      // Update current time every second
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    } else {
      audioRef.current?.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Clean up the interval on component unmount or when stopping the audio
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio element's currentTime
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0); // Reset the currentTime state
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handlePauseButton = () => {
    setIsPlaying(!isPlaying);
    setIsPaused(!isPaused);
  };

  const handleCloseAndReset = () => {
    setPlayThis({
      audio: "",
      image: "",
      title: "",
      author: "",
    });
    handleStop();
  };

  let content;

  if (!audio) {
    content = null;
  } else {
    content = (
      <div className="fixed bottom-0 left-0 grid h-16 w-full grid-cols-10 place-items-center bg-amber-50 md:bottom-4 md:h-24 md:w-2/5 lg:bottom-2 lg:rounded-r-xl lg:drop-shadow-lg">
        <Image
          src={image}
          alt={`Header image for the article titled ${title} by ${author}`}
          objectFit="contain"
          width={40}
          height={40}
          className="z-50 col-span-2 h-full w-auto"
        />
        <div className="z-0 col-span-6 flex max-w-full flex-col gap-y-3 overflow-hidden">
          <Marquee
            title={title}
            subtext={author}
            classes="self-start col-span-6 text-zinc-950"
          />
          <ProgressBar currentTime={currentTime} duration={duration} />
        </div>

        {isPlaying || isPaused ? (
          <button onClick={handlePauseButton} className="col-span-1 ml-4">
            <PauseIcon
              className={`h-6 w-6 ${
                isPaused ? "animate-pulse text-gray-500" : "text-sky-400"
              } drop-shadow-xl`}
            />
          </button>
        ) : (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="col-span-1 lg:ml-4"
          >
            <PlayIcon className="h-6 w-6 text-sky-400 drop-shadow-xl" />
          </button>
        )}
        <button onClick={() => handleStop()} className="col-span-1 lg:mr-4">
          <StopIcon className="col-span-1 h-6 w-6 rounded-full text-sky-500 drop-shadow-xl" />
        </button>
        <button
          onClick={handleCloseAndReset}
          className="absolute -top-6 right-0 lg:-right-5 lg:-top-4"
        >
          <XMarkIcon className="h-7 w-7 rounded-full bg-gray-700/25 text-white drop-shadow-lg" />
        </button>
      </div>
    );

    return content;
  }
}
