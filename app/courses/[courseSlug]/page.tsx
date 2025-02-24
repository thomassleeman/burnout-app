//next
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
//Sanity
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
import { Article } from "@/types/sanity";
//components
import Share from "@/components/ui/Share";
//functions
import { getResourcePathType } from "../functions";
import { getCourseData } from "../getCoursesData";
//fonts
import { Martel } from "next/font/google";
//assets
import defaultImage from "@articles/defaultImage.jpeg";
//icons
import {
  AcademicCapIcon,
  LightBulbIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
//types
import { CourseResourceSanity } from "@/types/sanity";
import GetStartedButton from "./GetStartedButton";

export const revalidate = 3600; // revalidate the data cache at most every hour

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default async function Course({
  params,
}: {
  params: { courseSlug: string };
}) {
  const { courseSlug } = params;

  const courseData = await getCourseData(courseSlug, "page");
  if (!courseData) notFound();
  console.log("course data: ", courseData);

  const { title, content, headerImage, resources } = courseData;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;

  return (
    <article className="prose prose-slate mx-auto dark:prose-invert md:prose-lg prose-img:rounded-xl">
      <Share title={title} articleType="course" />
      <div className="mb-12 aspect-square h-full w-auto">
        <Image
          width={1200}
          height={630}
          src={headerImageUrl || defaultImage}
          alt={`header image for the course ${title}`}
          priority={true}
          className="h-full w-full object-cover"
        />
      </div>

      <div className={`${martel.className} first-line:bold px-6`}>
        <PortableText value={content} components={portableTextComponents} />
      </div>

      <div className="space-y-4 px-2 lg:px-0">
        <h2 className="">Resources in this course</h2>
        <div className="space-y-4">
          {resources.map((resource: CourseResourceSanity) => {
            const articleImageUrl = resource.headerImage
              ? urlForImage(resource.headerImage)
              : null;
            return (
              <div
                key={resource.slug}
                className="not-prose flex items-center space-x-2"
              >
                {resource.type === "article" && (
                  <Image
                    width={50}
                    height={50}
                    src={articleImageUrl || defaultImage}
                    alt={`header image for the resource ${resource.title}`}
                    priority={true}
                    className="h-14 w-14 rounded-md"
                  />
                )}
                {resource.type === "selfReflectionExercise" && (
                  <PencilIcon className="h-14 w-14 rounded-md bg-gradient-to-r from-purple-500/75 to-pink-500/75 p-1.5 text-white" />
                )}
                <div className="flex flex-col">
                  {resource.type === "selfReflectionExercise" && (
                    <span className="text-sm text-gray-800">
                      Writing exercise:
                    </span>
                  )}
                  <h4>{resource.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <GetStartedButton
        courseSlug={courseSlug}
        resources={resources}
        title={title}
      />
    </article>
  );
}
