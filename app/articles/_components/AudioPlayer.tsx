import accessAssetUrl from "@/sanity/lib/accessAssetUrl";
import { Audio } from "@/types/sanity";

type AudioPlayerProps = {
  audio: Audio;
};

export default function AudioPlayer({ audio }: AudioPlayerProps) {
  return (
    <div className="z-0">
      <audio controls>
        <source src={accessAssetUrl(audio)} type="audio/mpeg" />
      </audio>
    </div>
  );
}
