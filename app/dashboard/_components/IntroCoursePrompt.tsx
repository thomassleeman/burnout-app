import Link from "next/link";
import Image from "next/image";
import manHoldingGlasses from "./assets/man-holding-glasses.jpeg";
import { AcademicCapIcon } from "@heroicons/react/20/solid";

export default function IntroCoursePrompt() {
  return (
    <Link href="/articles/burnoutCourse/defining-burnout">
      <div className="h-full ">
        <article className="relative isolate flex h-full w-full rounded-lg">
          <Image
            className="absolute inset-0 -z-10 h-full w-full rounded-lg object-cover"
            src={manHoldingGlasses}
            alt="Burnout course image"
            width="500"
            height="500"
            priority
          />
          <div className="absolute left-0 w-1/2 pt-6">
            {/* <h1 className="bg-slate-700 p-6 font-serif text-2xl font-thin leading-6 tracking-wide text-white">
              What is Burnout?
            </h1> */}
            <div className="mb-4 flex items-center space-x-6 pl-2 text-slate-700 md:mx-0">
              <AcademicCapIcon className="h-6 w-6" />
              <h3 className=" font-mono  md:text-lg lg:text-xl">
                Burnout Course
              </h3>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 pb-6">
            <h1 className="mt-6 bg-white p-2 text-right text-xl font-thin leading-6 tracking-wide text-slate-900">
              A free, short course to learn more about Burnout, what it is and
              how to approach the issue.
            </h1>
          </div>
        </article>
      </div>
    </Link>
  );
}
