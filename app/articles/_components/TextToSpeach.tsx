"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/20/solid";

interface Props {
  text: string;
}

const TextToSpeech = ({ text }: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    if (utterance !== null) {
      synth.speak(utterance);
    }
    setIsStopped(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
    setIsStopped(true);
  };

  const play = (
    <button onClick={handlePlay}>
      <PlayIcon className="h-6 w-6 text-green-600 hover:text-green-700 md:h-5 md:w-5" />
    </button>
  );

  const pause = (
    <button onClick={handlePause}>
      <PauseIcon className="h-6 w-6 text-blue-700 hover:text-gray-700 md:h-5 md:w-5" />
    </button>
  );

  const stop = (
    <button onClick={handleStop}>
      <StopIcon className="h-6 w-6 text-slate-700 md:h-5 md:w-5" />
    </button>
  );

  const playerText = () => {
    if (isStopped) {
      return (
        <span className="font-mono text-slate-600 md:text-sm">Listen</span>
      );
    }
    if (isPaused) {
      return (
        <span className="animate-pulse font-mono text-sm text-slate-600">
          Paused
        </span>
      );
    } else {
      return (
        <span className="animate-pulse font-mono text-sm text-slate-600">
          Playing
        </span>
      );
    }
  };

  return (
    <div
      className={`${
        !isStopped
          ? "fixed bottom-3 right-2 bg-emerald-100 outline-emerald-500 md:static md:rounded-xl md:bg-emerald-300/25 md:outline-sky-400/25"
          : "static  bg-emerald-300/25 outline-sky-400/25"
      } flex items-center space-x-4 rounded-xl px-3 py-1 outline outline-offset-4  md:space-x-2`}
    >
      {playerText()}
      {isPaused || isStopped ? play : pause}
      {stop}
    </div>
  );
};

export default TextToSpeech;
