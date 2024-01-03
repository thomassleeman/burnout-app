import brainLogo from "@/components/design/brainLogo.png";
import Image from "next/image";

export default function BotAvatar() {
  return (
    <>
      <Image
        alt="MindHub Logo"
        src={brainLogo}
        className="h-10 w-auto pr-4 drop-shadow-lg"
      />
    </>
  );
}
