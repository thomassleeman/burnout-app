import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
import { urlForImage } from "@/sanity/lib/image";
import defaultImage from "@articles/defaultImage.jpeg";

import CardSummary from "@/components/ui/CardSummary";

//types
import { Course } from "@/types/sanity";
type CloseResourcesNavFunction = () => void;

const CourseCard = ({
  course,
  closeResourcesNav,
}: {
  course: Course;
  closeResourcesNav: CloseResourcesNavFunction;
}) => {
  const { title, slug, headerImage, summary } = course;
  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  return (
    <article
      key={title}
      className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
    >
      <button onClick={closeResourcesNav}>
        <Link
          href={`/courses/${slug}`}
          className="flex h-full w-full flex-col rounded-lg outline-4 outline-offset-4 outline-sky-400/25 hover:outline sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
        >
          <div className="relative flex-none">
            <Image
              className="w-full rounded-lg border-4 border-gray-700/25 bg-gray-100 object-cover sm:h-32 lg:h-auto"
              width={250}
              height={250}
              src={headerImageUrl || defaultImage}
              alt={`header image for ${title}`}
            />
            <div className="absolute bottom-3 left-0 rounded-r-lg bg-gray-700/50  px-5 py-2 drop-shadow-2xl">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-4"></div>
          </div>
        </Link>
      </button>
      {summary ? <CardSummary summary={summary} title={title} /> : null}
    </article>
  );
};

export default CourseCard;
