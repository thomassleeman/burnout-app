import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import basicsCourse from "./images/basics-course-stacked.jpg";

const benefits = [
  "What exactly burnout is.",
  "What the key signs of burnout are.",
  "How it can lead to other mental health issues.",
  "The benefits of facing up to burnout.",
  "The two key strategies work challenges.",
  "How to recognise when work struggles go beyond normal stress.",
  "The wider impact of burnout on our minds and bodies.",
  "Understanding the 4 core symptoms of burnout.",
  "How the core symptoms of burnout interact.",
];

export default function BasicsCourseSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-4 flex max-w-2xl flex-col gap-8 bg-white/75 px-6 py-16 shadow-lg ring-1 ring-gray-50 sm:mx-auto sm:gap-16 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-12 xl:gap-x-20 xl:px-20">
            <Image
              alt=""
              src={basicsCourse}
              className="h-full w-auto flex-none rounded-2xl border border-emerald-200 object-cover p-4 sm:border-none sm:p-0 md:h-fit"
            />
            <div className="w-full flex-auto">
              <h2 className="text-pretty text-4xl font-light tracking-wide text-emerald-700 sm:text-5xl">
                Access our free <span className="font-extrabold">Basics</span>{" "}
                short-course...
              </h2>
              <p className="text-pretty mt-6 text-lg/8 text-gray-800">
                Sign up for a free account for you and your team and learn the
                fundamentals of burnout. This course covers the basics of:
              </p>
              <ul
                role="list"
                className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 text-gray-600 sm:grid-cols-2"
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-7 w-5 flex-none text-green-600"
                    />
                    <span className="text-base leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex">
                <a href="#" className="text-lg font-semibold text-emerald-600">
                  Start here <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-emerald-700 opacity-25"
          />
        </div> */}
      </div>
    </div>
  );
}
