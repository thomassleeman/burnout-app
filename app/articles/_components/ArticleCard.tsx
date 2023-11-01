import Link from "next/link";
import getFormattedDate from "../getFormattedDate";
import defaultImage from "../defaultImage.jpeg";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const {
    title,
    date,
    headerImage,
    headerImageAlt,
    slug,
    id,
    category,
    summary,
    author,
  } = article;
  let formattedDate;
  if (date) {
    formattedDate = getFormattedDate(date);
  } else {
    formattedDate = "";
  }
  return (
    <article
      key={id}
      className="relative isolate flex h-72 flex-none basis-64 snap-center snap-always flex-col justify-end overflow-hidden rounded-xl px-4 pb-4 md:snap-none"
    >
      <Image
        src={headerImage || defaultImage}
        alt={headerImageAlt || "Article image"}
        height={500}
        width={500}
        className="absolute inset-0 -z-10 h-80 w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 h-80 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 h-80 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      <span className="absolute right-0 top-4 rounded-l-lg bg-gray-700 px-3 py-1.5 text-xs text-white opacity-70">
        {author}
      </span>

      {/* <ArticleSummary summary={summary} title={title} /> */}

      <div className="flex items-center gap-y-1 leading-6 text-gray-300">
        <div className="flex items-center gap-x-4">
          <time dateTime={date} className="text-xs">
            {formattedDate}
          </time>
          <div className="flex items-center gap-x-2.5 text-sm"></div>
        </div>
      </div>
      <h3 className="mt-3 font-serif text-xl leading-6 text-white hover:underline hover:underline-offset-2">
        <a href={`/articles/${slug}`}>{title}</a>
      </h3>
    </article>
  );
}
