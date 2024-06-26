//next.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import getFormattedDate from "@articles/getFormattedDate";
import { getBurnoutStoryData } from "../getStoriesData";
import defaultImage from "@articles/defaultImage.jpeg";
// import ArticleFooter from "../../articles/_components/ArticleFooter";
import AudioPlayer from "@articles/_components/AudioPlayer";

//Components
import Disclaimer from "../_components/Disclaimer";

import { Martel } from "next/font/google";

//Sanity

import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

export const revalidate = 3600; // revalidate the data cache at most every hour

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const storyData = await getBurnoutStoryData(slug);

  // const articleData = await getArticleData(slug);
  if (!storyData) notFound();

  const {
    title,
    date,
    content,
    audio,
    headerImage,
    author,
    readingTime,
    category,
  } = storyData;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  const authorImageUrl = author?.image ? urlForImage(author.image) : null;

  return (
    <>
      <article
        className={`${martel.className} prose prose-slate mx-2 dark:prose-invert md:prose-lg md:mx-auto`}
      >
        <div className="flex w-full flex-col items-center">
          <div className="not-prose md:grid md:grid-cols-2 md:gap-x-14">
            <div className="py-4">
              <h1 className="mb-2 text-5xl text-slate-800">{title}</h1>
              <div className="not-prose ml-2 flex items-center">
                <div className="flex items-center gap-x-2">
                  <p className="mt-0">
                    {author?.name || "Burnout Project Team"}
                  </p>
                </div>
                <p className="mx-3">&ndash;</p>
                <p className="mt-0">{getFormattedDate(date)}</p>
              </div>
            </div>
            <Image
              width={1200}
              height={630}
              src={headerImageUrl || defaultImage}
              alt={`header image for the article ${title}`}
              priority={true}
              className="rounded-lg md:h-40 md:w-auto"
            ></Image>
          </div>

          {/* <div className="flex items-center justify-between">
            <p className="not-prose text-green-800">
              {readingTime ? `${Math.round(readingTime)} min read` : null}
            </p>
            {audio && <AudioPlayer audio={audio} />}
          </div> */}
        </div>
        <Disclaimer />

        {/* <div className="first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-extrabold first-letter:text-green-900"> */}
        <div className="">
          <PortableText value={content} components={portableTextComponents} />
        </div>
      </article>
      {/* {slug && category ? (
        <ArticleFooter category={category} currentArticle={slug} />
      ) : null}{" "} */}
    </>
  );
}
