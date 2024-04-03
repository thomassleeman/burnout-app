"use client";
//react
import { useState } from "react";
//next.js
import Image from "next/image";
import Link from "next/link";
//jotai
import { useAtom } from "jotai";
import { showSearchResultsAtom } from "@/state/store";
//components
import getFormattedDate from "@/app/articles/getFormattedDate";
import defaultImage from "@articles/defaultImage.jpeg";
import { ImageWithTextSkeleton } from "@/app/_components/ui/loading/LoadingSkeletons";
import { CardSkeleton } from "@/app/_components/ui/loading/LoadingSkeletons";
import PlayArticle from "./PlayArticle";
//Icons
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Play } from "next/font/google";

interface ArticleSummaryProps {
  summary: string;
  title: string;
}

const ArticleSummary = ({ summary, title }: ArticleSummaryProps) => {
  const [open, setOpen] = useState(false);
  let content;

  if (!open) {
    content = (
      <span
        onClick={() => setOpen(true)}
        className="absolute bottom-0 right-0 h-9 w-9 cursor-pointer rounded-tl-lg bg-gray-50 px-3 py-1.5 text-sm text-gray-700 opacity-70 hover:opacity-90"
      >
        <InformationCircleIcon className="absolute bottom-2 right-2 h-5 w-5" />
      </span>
    );
  } else {
    content = (
      <div className="absolute bottom-0 right-0 h-full w-full cursor-default overflow-y-scroll bg-slate-800 p-5 opacity-95">
        <h2 className="mb-3 font-serif text-lg font-semibold text-slate-200 dark:text-slate-50">
          {title}
        </h2>
        <p className=" font-serif text-sm text-gray-100">{summary}</p>
        <span
          onClick={() => setOpen(false)}
          className="absolute bottom-0 right-0 h-9 w-9 rounded-tl-lg bg-white px-3 py-1.5 text-sm text-gray-700 opacity-70 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-900"
        >
          <XMarkIcon className="absolute bottom-2 right-2 h-5 w-5" />
        </span>
      </div>
    );
  }
  return content;
};

interface ContentCarouselProps {
  carouselTitle?: string;
  carouselTagline?: string;
  articles?: Article[];
}

export default function ContentCarousel({
  carouselTitle = "",
  carouselTagline = "",
  articles = [],
}: ContentCarouselProps) {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const [showSearchResults, setShowSearchResults] = useAtom(
    showSearchResultsAtom
  );
  let content;
  if (articles.length === 0) {
    content = null;
  } else {
    content = (
      <div>
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
              {carouselTitle}
            </h2>

            {/* {carouselTagline && (
              <div className="text leading-8 text-gray-600">
                <span className="mr-4">{carouselTagline}</span>
                <br className="inline md:hidden" />
                <span className="text-right text-sm text-green-900">
                  {`${articles.length} ${
                    articles.length === 1 ? "article" : "articles"
                  }`}
                  {articles.length === 1 ? null : (
                    <ArrowRightIcon className="ml-2 inline-block h-4 w-4 lg:hidden" />
                  )}
                </span>
              </div>
            )}
            {!carouselTagline && (
              <div className="text leading-8 text-gray-600">
                <span className="text-right text-sm text-green-900">
                  {`${articles.length} ${
                    articles.length === 1 ? "article" : "articles"
                  }`}
                  {articles.length === 1 ? null : (
                    <ArrowRightIcon className="ml-2 inline-block h-4 w-4 lg:hidden" />
                  )}
                </span>
              </div>
            )} */}
            <div className="text leading-8 text-gray-600">
              <span className="text-right text-sm text-green-900">
                {`${articles.length} ${
                  articles.length === 1 ? "article" : "articles"
                }`}
                {articles.length === 1 ? null : (
                  <ArrowRightIcon className="ml-2 inline-block h-4 w-4 lg:hidden" />
                )}
              </span>
            </div>
          </div>
          <div className="mt-6 flex h-80 snap-x snap-mandatory gap-x-4 overflow-x-scroll overscroll-x-none md:snap-none md:gap-x-6 lg:gap-x-10">
            {articles.map((article) => {
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
                audio,
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

                  <PlayArticle
                    audio={audio || ""}
                    anotherArticleIsPlaying={
                      playingAudioId !== null && id !== playingAudioId
                    }
                    isPlaying={id === playingAudioId}
                    onPlay={() => setPlayingAudioId(id)}
                    onPauseOrStop={() => setPlayingAudioId(null)}
                  />

                  {summary ? (
                    <ArticleSummary summary={summary} title={title} />
                  ) : null}

                  <div className="flex items-center gap-y-1 leading-6 text-gray-300">
                    <div className="flex items-center gap-x-4">
                      <time dateTime={date} className="text-xs">
                        {formattedDate}
                      </time>
                      <div className="flex items-center gap-x-2.5 text-sm"></div>
                      {/* <span className="text-xs text-white">{author}</span> */}
                    </div>
                  </div>
                  <h3 className="mt-3 cursor-pointer font-serif text-xl leading-6 text-white hover:underline">
                    <Link
                      href={`/articles/${slug}`}
                      onClick={() => setShowSearchResults(false)}
                    >
                      {/* <span className="absolute inset-0" /> */}
                      {title}
                    </Link>
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export const ContentCarouselSkeleton = () => {
  return (
    <div>
      <div className=" lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="mx-auto">
          <div className="w-full">
            <div className="mb-4 h-6 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-3 w-[20rem] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="mt-6 flex snap-x snap-mandatory gap-x-4 overflow-hidden overflow-x-scroll overscroll-x-none md:snap-none md:gap-x-6 lg:gap-x-10">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
};
