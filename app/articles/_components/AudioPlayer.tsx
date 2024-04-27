import accessAssetUrl from "@/sanity/lib/accessAssetUrl";

export default function AudioPlayer({ audio }) {
  return (
    <div className="flex flex-col items-center">
      <audio controls>
        <source src={accessAssetUrl(audio)} type="audio/mpeg" />
      </audio>
    </div>
  );
}
