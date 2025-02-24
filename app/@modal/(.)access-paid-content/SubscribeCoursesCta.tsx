import Image from "next/image";
import courseMobile from "@/components/design/landingPage/images/course-mobile.jpg";

export default function SubscribeCoursesCta() {
  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="relative">
        <div className="absolute inset-px rounded-lg" />
        <Image
          alt="Example image of a course."
          src={courseMobile}
          width={500}
          height={500}
          className="outline-blur-xl mx-auto mt-4 h-auto w-1/2 rounded-lg border border-gray-400 shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 mx-4 mb-4 rounded-lg border border-gray-300/50 bg-white/30 p-4 shadow-lg backdrop-blur-xl">
          <p className=" max-w-lg text-sm text-gray-600">
            <span className="font-semibold">Expertly designed courses</span> to
            educate users on burnout, stress and mental health at work.
          </p>
        </div>
        {/* </div> */}
        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
      </div>
    </div>
  );
}
