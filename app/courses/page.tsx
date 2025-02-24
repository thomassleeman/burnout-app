import Link from "next/link";
import Image from "next/image";
import mountains from "./resources/mountains.jpg";
import { getCoursesData } from "./getCoursesData";
import { urlForImage } from "@/sanity/lib/image";
import defaultImage from "@articles/defaultImage.jpeg";
import { CourseSanity } from "@/types/sanity";

export const revalidate = 3600; // revalidate the data cache at most every hour

interface CourseCardProps {
  course: CourseSanity;
}

export default async function CoursesPage() {
  const courses = await getCoursesData();

  return (
    <div className="py-8 sm:py-12">
      {/* Hero section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16  px-6 py-16 sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center xl:gap-x-20 xl:px-20 2xl:py-20">
            <Image
              alt="An image of a person holding a mirror in front of their head reflecting the blue sky around them."
              src={mountains}
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl outline outline-offset-4 outline-emerald-700/50  lg:aspect-square lg:h-auto lg:max-w-sm"
            />
            <div className="w-full flex-auto">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
                Courses.
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                <span className="font-semibold text-emerald-600">
                  Start here to learn about Burnout and work-related mental
                  health.
                </span>
                <br />
                <br />
                Our evidence-based courses are designed to empower you to
                recognise, manage, and prevent burnout before it derails
                wellbeing. Each module delivers practical strategies developed
                by workplace mental health experts that you can immediately
                apply to your professional life.
                <br></br>
                <br />{" "}
                <span className="text-gray-800">
                  From boundary-setting to cognitive reframing techniques, these
                  tools build the resilience muscles needed to thrive under
                  pressure while maintaining sustainable performance.
                </span>
              </p>

              <div className="mt-10 flex">
                {/* <Link
                  href="#"
                  className="text-sm/6 font-semibold text-emerald-800"
                >
                  What is journaling for insight?{" "}
                  <span aria-hidden="true">&rarr;</span>
                </Link> */}
              </div>
            </div>
          </div>
          {/* Carousel section */}
          {/* <div className="mx-auto mb-12 mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 xl:mt-12"> */}
          {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          {/* <div className="mx-auto max-w-4xl"> */}
          <div className="mx-auto mb-12 max-w-2xl flex-col px-6 py-16 sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:px-20">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
              Courses
            </h2>{" "}
            <div className="flex snap-x snap-mandatory flex-nowrap gap-x-8 overflow-x-scroll">
              {courses.map((course: CourseSanity) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
          {/* </div> */}
          {/* ------------------------- */}
        </div>
      </div>
    </div>
  );
}

const CourseCard = ({ course }: { course: CourseSanity }) => {
  const { title, slug, headerImage } = course;
  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  return (
    <article
      key={title}
      // className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
      className="relative isolate flex flex-none basis-64 snap-center snap-always flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
    >
      <Link
        href={`/courses/${slug}`}
        className="flex h-full w-full flex-col rounded-lg outline-4 outline-offset-4 outline-purple-400/25 hover:outline sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
      >
        <div className="relative aspect-square flex-none overflow-hidden">
          <Image
            className="h-64 w-64 rounded-lg border-4 border-gray-700/25 bg-gray-100 object-cover"
            width={250}
            height={250}
            src={headerImageUrl || defaultImage}
            alt={`header image for ${title}`}
          />
          <div className="absolute bottom-3 left-0 w-11/12 rounded-r-lg  bg-gray-800/50 px-5 py-2 drop-shadow-2xl">
            <h1 className="text-left text-lg text-white">{title}</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-4"></div>
        </div>
      </Link>
    </article>
  );
};
