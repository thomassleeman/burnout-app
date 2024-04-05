import Image from "next/image";
import brainLogoCompressed from "@/components/design/brainLogoCompressed.png";

export default function LoadingComponent() {
  return (
    <div className="mt-32 flex w-full flex-col items-center justify-center lg:mt-24">
      <Image
        className="h-32 w-auto animate-spin-slow dark:animate-none dark:shadow-2xl dark:shadow-yellow-200 lg:h-56"
        src={brainLogoCompressed}
        alt="Burnout Project Logo"
      />
    </div>
  );
}
