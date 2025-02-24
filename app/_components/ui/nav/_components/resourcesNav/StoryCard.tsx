import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
import { urlForImage } from "@/sanity/lib/image";
import defaultImage from "@articles/defaultImage.jpeg";
import CardSummary from "@/components/ui/CardSummary";

//types
import { CourseSanity } from "@/types/sanity";
type CloseResourcesNavFunction = () => void;

const StoryCard = ({
  story,
  color,
  closeResourcesNav,
}: {
  story: CourseSanity;
  color: string;
  closeResourcesNav: CloseResourcesNavFunction;
}) => {
  const { title, slug, headerImage, summary } = story;
  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;

  const bgColorClass = (() => {
    switch (color) {
      case "sky":
        return "bg-sky-700/75";
      case "rose":
        return "bg-rose-700/75";
      case "lime":
        return "bg-lime-700/75";
      case "orange":
        return "bg-orange-700/75";
      case "violet":
        return "bg-violet-700/75";
      default:
        return "bg-gray-700/75"; // A default color
    }
  })();
  const borderColorClass = (() => {
    switch (color) {
      case "sky":
        return "border-sky-700/75";
      case "rose":
        return "border-rose-700/75";
      case "lime":
        return "border-lime-700/75";
      case "orange":
        return "bg-orange-700/75";
      case "violet":
        return "bg-violet-700/75";
      default:
        return "border-gray-700/75"; // A default color
    }
  })();

  return (
    <article
      key={title}
      className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
    >
      <button onClick={closeResourcesNav}>
        <Link
          href={`/burnout-stories/${slug}`}
          className="flex h-full w-full flex-col rounded-lg outline-4 outline-offset-4 outline-sky-400/25 hover:outline sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
        >
          <div className="relative flex-none">
            <Image
              className={`w-full rounded-lg border-4 ${borderColorClass} bg-gray-100 object-cover sm:h-32 lg:h-auto`}
              width={250}
              height={250}
              src={headerImageUrl || defaultImage}
              alt={`header image for ${title}`}
            />
            <div
              className={`absolute bottom-3 left-0 rounded-r-lg ${bgColorClass} px-5 py-2`}
            >
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
            {/* <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" /> */}
          </div>
          <div>
            <div className="flex items-center gap-x-4">
              {/* <time
            dateTime={post.datetime}
            className="text-sm leading-6 text-gray-600"
            >
            {post.date}
            </time> */}
              {/* <a
            href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
            >
            {post.category.title}
            </a> */}
            </div>
            {/* <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
            <span className="absolute inset-0" />
            {title}
            </h4> */}
            {/* <div className="p-1 text-sm font-light leading-6 text-gray-600">
              <PortableText
                value={summary}
                components={portableTextComponents}
              />
            </div> */}
          </div>
        </Link>
      </button>
      {summary ? <CardSummary summary={summary} title={title} /> : null}
    </article>
  );
};

export default StoryCard;
