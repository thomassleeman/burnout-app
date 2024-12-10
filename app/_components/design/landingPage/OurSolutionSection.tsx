"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import PageExamples from "@/components/design/landingPage/PageExamples";

import courseMobile from "./images/course-mobile.jpg";
import chatbot from "./images/chatbot-example.jpg";
import journal from "./images/journaling-example.jpg";
import article from "./images/article-example.jpg";
import stressGraph from "./images/stress-graph.jpg";
import stressRating from "./images/stress-rating.jpg";
import assessmentGraph from "./images/assessment-graph.jpg";
import courseExample from "./images/course-example.jpg";
import chatbotPageExample from "./images/chatbot-page-example.jpg";
import journalingPageExample from "./images/journaling-page-example.jpg";
import articlePageExample from "./images/article-page-example.jpg";
import visualisationsExample from "./images/visualisations-example.jpg";

const pageExamples = {
  courses: {
    image: courseExample,
    imageAlt: "Image of an example course page.",
  },
  chatbot: {
    image: chatbotPageExample,
    imageAlt: "Image of an example of the chatbot page.",
  },
  journaling: {
    image: journalingPageExample,
    imageAlt: "Image of an example of the my-journal page.",
  },
  articles: {
    image: articlePageExample,
    imageAlt: "Image of an example of an article page.",
  },
  visualisations: {
    image: visualisationsExample,
    imageAlt: "Image of an example of mental health tracker visualisations.",
  },
};

type Page = keyof typeof pageExamples;

export default function OurSolutionSection() {
  const [exampleOpen, setExampleOpen] = useState(false);
  const [image, setImage] = useState<StaticImageData | undefined>(undefined);
  const [imageAlt, setImageAlt] = useState<string | undefined>(undefined);

  const handleClick = (page: Page) => {
    const example = pageExamples[page];
    if (example) {
      setImage(example.image);
      setImageAlt(example.imageAlt);
      setExampleOpen(true);
    }
  };

  return (
    <>
      <PageExamples
        image={image}
        imageAlt={imageAlt}
        open={exampleOpen}
        setOpen={setExampleOpen}
      />
      <div className=" py-24 sm:py-32">
        {/* <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8"> */}
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 2xl:max-w-screen-2xl">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="font-mono text-base font-semibold text-emerald-600">
              Our Solution
            </h2>
            <p className="mt-16 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl 2xl:text-6xl">
              Everything you need to tackle burnout in your team
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We provide the tools and resources necessary for managing and
              preventing burnout, promoting a healthier and more productive
              workplace.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2 lg:gap-6 2xl:gap-20">
            {/* Courses Example */}
            <div
              onClick={() => handleClick("courses")}
              role="button"
              tabIndex={0}
              className="relative lg:col-span-3"
            >
              <div className="absolute inset-px rounded-lg max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] ring-emerald-600 ring-offset-8 hover:ring-2 max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <Image
                  alt="Example image of a course."
                  src={courseMobile}
                  width={500}
                  height={500}
                  className="outline-blur-xl mx-auto mt-4 h-auto w-1/2 rounded-lg border border-gray-400 shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"
                  // className="outline-blur-xl mx-auto mt-4 h-auto w-1/2 rounded-lg border border-gray-400 shadow-2xl shadow-amber-400"
                />
                <div className="absolute bottom-0 left-0 right-0 z-10 mx-4 mb-4 rounded-lg border border-gray-300/50 bg-white/30 p-10 pt-4 shadow-lg backdrop-blur-xl">
                  <h2 className="text-xl font-medium tracking-tight text-gray-950">
                    Burnout and mental-health courses
                  </h2>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Expertly designed courses to educate users on burnout,
                    stress and mental health at work.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>
            {/* Chatbot example */}
            <div
              onClick={() => handleClick("chatbot")}
              role="button"
              tabIndex={0}
              className="relative lg:col-span-3"
            >
              <div className="absolute inset-px rounded-lg lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] ring-emerald-600 ring-offset-8 hover:ring-2 lg:rounded-tr-[calc(2rem+1px)]">
                <Image
                  alt="Example image of the chatbot."
                  width={500}
                  height={500}
                  src={chatbot}
                  className="mt-4 h-auto w-5/6 self-end object-cover object-right lg:object-right"
                />
                <div className="absolute bottom-0 left-0 right-0 z-10 mx-4 mb-4 rounded-lg border border-gray-300/50 bg-white/30 p-10 pt-4 shadow-lg backdrop-blur-xl">
                  <h2 className="text-xl font-medium tracking-tight text-gray-950">
                    Chatbot Assessments
                  </h2>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Our interactive chatbot offers guided assessments to help
                    detect burnout early and recommend actions.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
            </div>
            {/* Journaling example */}
            <div
              onClick={() => handleClick("journaling")}
              role="button"
              tabIndex={0}
              className="relative lg:col-span-2"
            >
              <div className="absolute inset-px rounded-lg lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] ring-emerald-600 ring-offset-8 hover:ring-2 lg:rounded-bl-[calc(2rem+1px)]">
                <Image
                  alt="Example image of the journaling interface."
                  src={journal}
                  className="mt-4 h-auto w-10/12 self-end object-cover object-right lg:object-right"
                />
                <div className="absolute bottom-0 z-10 m-4 rounded-lg border border-gray-300/50 bg-white/30 p-10 pt-4 shadow-lg backdrop-blur-xl">
                  <h2 className="text-xl font-medium tracking-tight text-gray-950">
                    Guided Journaling and self-reflection exercises
                  </h2>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Daily journaling prompts help employees reflect on their
                    stressors and well-being in a structured manner.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
            </div>
            {/* Articles */}
            <div
              onClick={() => handleClick("articles")}
              role="button"
              tabIndex={0}
              className="relative lg:col-span-2"
            >
              <div className="absolute inset-px rounded-lg" />
              <div className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] ring-emerald-600 ring-offset-8 hover:ring-2">
                <Image
                  alt="Example image of the journaling interface."
                  src={article}
                  className="mt-4 h-auto w-11/12 self-end border border-gray-100 object-cover object-right drop-shadow-xl lg:object-right"
                />
                <div className="absolute bottom-0 z-10 m-4 rounded-lg border border-gray-300/50 bg-white/30 p-10 pt-4 shadow-lg backdrop-blur-xl">
                  <h2 className="text-xl font-medium tracking-tight text-gray-950">
                    In-depth articles with full audio
                  </h2>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Daily journaling prompts help employees reflect on their
                    stressors and well-being in a structured manner.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
            </div>
            {/* Data visualisations */}
            <div
              onClick={() => handleClick("visualisations")}
              role="button"
              tabIndex={0}
              className="relative lg:col-span-2"
            >
              <div className="absolute inset-px rounded-lg max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              <div className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] ring-emerald-600 ring-offset-8 hover:ring-2 max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                <Image
                  alt="Example image of the journaling interface."
                  src={stressGraph}
                  className="mt-4 h-auto w-full self-end  object-cover object-right lg:object-right"
                />
                <Image
                  alt="Example image of the journaling interface."
                  src={assessmentGraph}
                  className="mt-4 h-auto w-full self-end  object-cover object-right lg:object-right"
                />
                <Image
                  alt="Example image of the journaling interface."
                  src={stressRating}
                  className="absolute right-0 top-40 z-10 mt-4 h-auto w-1/2 drop-shadow-lg"
                />
                <div className="absolute bottom-0 z-10 m-4 rounded-lg border border-gray-300/50 bg-white/30 p-10 pt-4 shadow-lg backdrop-blur-xl">
                  <h2 className="text-xl font-medium tracking-tight text-gray-950">
                    Track mental health markers
                  </h2>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Our user-friendly UI makes keeping track of key mental
                    health markers simple, promoting awareness and continual
                    reflection.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
