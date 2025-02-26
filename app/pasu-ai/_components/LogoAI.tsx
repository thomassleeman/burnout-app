import Image from "next/image";
import logo from "@/components/design/brainLogoCompressed.png";

export default function Logo() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      {/* Gradient glow effect */}
      <div className="absolute inset-0 -z-10 h-16 w-16 animate-spin-slower rounded-xl bg-gradient-to-r from-fuchsia-500 via-sky-500 to-indigo-500 outline outline-4 outline-offset-8 outline-yellow-300 blur-lg"></div>

      <Image
        className="h-12 w-auto drop-shadow-xl"
        src={logo}
        alt="AI-powered Logo"
      />
    </div>
  );
}
