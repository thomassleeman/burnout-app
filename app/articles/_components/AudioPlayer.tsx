import accessAssetUrl from "@/sanity/lib/accessAssetUrl";
import { Audio } from "@/types/sanity";

type AudioPlayerProps = {
  audio: Audio;
};

export default function AudioPlayer({ audio }: AudioPlayerProps) {
  return (
    <audio controls>
      <source src={accessAssetUrl(audio)} type="audio/mpeg" />
    </audio>
  );
}
