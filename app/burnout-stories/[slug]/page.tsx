//next.js
import { notFound } from "next/navigation";
import Image from "next/image";

import getFormattedDate from "@articles/getFormattedDate";
import { getBurnoutStoryData } from "../getStoriesData";
import defaultImage from "@articles/defaultImage.jpeg";
import AudioPlayer from "@articles/_components/AudioPlayer";
import StoriesHeader from "../StoriesHeader";

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

  const { title, date, content, audio, headerImage, author, readingTime } =
    storyData;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  const authorImageUrl = author?.image ? urlForImage(author.image) : null;

  return (
    <>
      <StoriesHeader title={title} />
      <section className={`lg:mt-18 mt-8 md:mt-14`}>
        <article
          className={`${martel.className} prose prose-slate mx-2 dark:prose-invert md:prose-lg md:mx-auto`}
        >
          <div className="flex w-full flex-col items-center">
            <div className="not-prose flex w-full flex-wrap justify-between gap-10">
              <div className="flex flex-col justify-items-start gap-y-4 py-2">
                <h1 className="mb-2 text-5xl text-slate-800">{title}</h1>
                <div className="not-prose flex items-center gap-x-2">
                  {authorImageUrl && (
                    <Image
                      src={authorImageUrl}
                      alt={`author image for ${
                        author?.name || "the author of this article"
                      }`}
                      width={60}
                      height={60}
                      className="h-12 w-12 rounded-full"
                    />
                  )}
                  <p className="mt-0">
                    {author?.name || "Burnout Project Team"}
                  </p>
                  <p className="">&ndash;</p>
                  <p className="">{getFormattedDate(date)}</p>
                </div>
                {/* <div className="flex items-center"> */}
                {/* <p className="not-prose text-green-800">
                  {readingTime ? `${Math.round(readingTime)} min read` : null}
                  </p> */}
                {audio && <AudioPlayer audio={audio} />}
                {/* </div> */}
              </div>
              <Image
                width={1200}
                height={630}
                src={headerImageUrl || defaultImage}
                alt={`header image for the article ${title}`}
                priority={true}
                className="h-auto w-56 justify-self-end rounded-lg"
              ></Image>
            </div>
          </div>
          <div className="my-2">
            <Disclaimer />
          </div>

          <div className="">
            <PortableText value={content} components={portableTextComponents} />
          </div>
        </article>
      </section>
    </>
  );
}
