/* This component should make up part of the footer, not the article, where it is effected by prose styles. */

import Image from "next/image";
import Link from "next/link";
import getFormattedDate from "../getFormattedDate";

interface RelatedArticlesProps {
  articles: Article[]; // replace with actual type if not Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  let content;
  if (articles.length === 0) {
    content = null;
  }
  if (articles.length !== 0) {
    content = (
      <div className="mx-auto max-w-3xl text-slate-800">
        <h2 className="mb-16 px-6 text-xl lg:px-0">
          Recommended from The Burnout Hub
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <h3 className="sr-only">Recommended Articles</h3>
          {articles.map((article: Article) => {
            const {
              title,
              author,
              category,
              date,
              summary,
              slug,
              headerImage,
            } = article;

            let formattedDate;
            if (date) {
              formattedDate = getFormattedDate(date);
            } else {
              formattedDate = "";
            }

            return (
              <article
                key={slug}
                className=" isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 px-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch lg:px-0"
              >
                <img
                  className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
                  src={headerImage}
                  alt=""
                />
                {/* <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" /> */}
                <div className="flex flex-col gap-y-3">
                  <div className="flex items-center gap-x-4">
                    <span className="text-sm leading-6 text-emerald-800">
                      {author}
                    </span>
                    <span className="z-10 rounded-full bg-blue-100 px-2 py-1 text-xs text-slate-800">
                      {category}
                    </span>
                  </div>
                  <h4 className=" text-sm font-semibold leading-6 text-gray-900">
                    <Link
                      href={`/articles/${slug}`}
                      className="text-xl font-semibold text-slate-800 lg:text-base"
                    >
                      {title}
                    </Link>
                  </h4>
                  <p className=" text-sm leading-6 text-gray-600">{summary}</p>
                  <time
                    dateTime={date ? new Date(date).toISOString() : ""}
                    className="text-sm leading-6 text-gray-600"
                  >
                    {formattedDate}
                  </time>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }
  return content;
}
