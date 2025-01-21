"use client";

import { useState } from "react";
import Link from "next/link";
import VideoModal from "./VideoModal";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

export default function WatchVideo() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowVideo(true)}
        className="flex items-center space-x-2 rounded-lg border border-slate-600 bg-transparent from-pink-300 via-white to-yellow-300 px-4 py-2 text-slate-600 hover:bg-gradient-to-r "
      >
        <PlayCircleIcon className="inline-block h-6 w-6" />
        <span>Watch the video</span>
      </button>
      {showVideo && <VideoModal open={showVideo} setOpen={setShowVideo} />}
    </>
  );
}
