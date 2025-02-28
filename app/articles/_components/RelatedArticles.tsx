/* This component should make up part of the footer, not the article, where it is effected by prose styles. */

import Image from "next/image";
import Link from "next/link";
import getFormattedDate from "../getFormattedDate";
import defaultImage from "@articles/defaultImage.jpeg";

//sanity
import { urlForImage } from "@/sanity/lib/image";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  let content;
  if (articles.length === 0) {
    content = null;
  }
  if (articles.length !== 0) {
    content = (
      <div className="mx-auto max-w-4xl text-slate-900">
        <h2 className="mb-16 px-6 text-2xl lg:px-0">
          Related articles from PASU
        </h2>

        <h3 className="sr-only">Recommended Articles</h3>
        <div className="grid grid-cols-1 justify-center gap-14 lg:grid-cols-2 lg:gap-20">
          {articles.map((article: Article) => {
            const { title, author, classification, date, slug, headerImage } =
              article;

            let formattedDate;
            if (date) {
              formattedDate = getFormattedDate(date);
            } else {
              formattedDate = "";
            }

            const headerImageUrl = headerImage
              ? urlForImage(headerImage)
              : defaultImage;

            return (
              <Link
                key={slug}
                href={`/articles/${slug}`}
                className="group isolate flex max-w-2xl flex-col items-center gap-x-8 gap-y-3 rounded-xl px-6 lg:px-0"
              >
                <div>
                  <Image
                    className="mb-3 aspect-[2/1] h-auto rounded-lg bg-gray-100 object-cover sm:aspect-[16/9]"
                    src={headerImageUrl}
                    alt={`header image for the article ${title}`}
                    height={200}
                    width={400}
                  />
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-4">
                      <span className="text-sm leading-6 text-emerald-800">
                        {author}
                      </span>
                      <span className="z-10 rounded-full bg-blue-100 px-2 py-1 text-xs text-slate-800">
                        {classification}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold leading-6 text-slate-800 group-hover:text-emerald-600">
                      {title}
                    </h4>
                    <time
                      dateTime={date ? new Date(date).toISOString() : ""}
                      className="text-sm leading-6 text-gray-600"
                    >
                      {formattedDate}
                    </time>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
  return content;
}
