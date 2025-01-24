import getFormattedDate from "@articles/getFormattedDate";
import { getArticleData } from "@articles/getArticlesData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@articles/defaultImage.jpeg";
import StudyModal from "@/components/ui/modal/StudyModal";
import { CourseHeadNav, CourseFootNav } from "../../courseNavs";
import AudioPlayer from "@articles/_components/AudioPlayer";
import QuizModal from "../../../quiz/QuizModal";

import Share from "@/components/ui/Share";
import { Martel } from "next/font/google";
import brainLogo from "@/components/design/brainLogo.png";

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
  searchParams,
}: {
  params: { articleSlug: string };
  searchParams: Record<string, string> | null | undefined;
}) {
  const { articleSlug } = params;
  const articleData = await getArticleData(articleSlug);

  //Show Modal if searchParams has modal=true
  const showModal = searchParams?.modal;
  const study = searchParams?.study;
  //Current url is passed to modal to enable the close button to link back to the article without the modal
  const currentUrl = `${
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_ORIGIN
      : process.env.NEXT_PUBLIC_DEV_ORIGIN
  }/articles/${articleSlug}`;

  if (!articleData) notFound();

  const {
    title,
    date,
    content,
    audio,
    headerImage,
    author,
    readingTime,
    quiz,
    classification,
  } = articleData;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  const authorImageUrl = author?.image ? urlForImage(author.image) : null;

  return (
    <>
      <article
        className={`${martel.className} prose prose-slate mx-auto dark:prose-invert md:prose-lg prose-img:rounded-xl`}
      >
        <div className="px-6 font-sans">
          <h1 className="mt-4 text-slate-800">{title}</h1>
          {/* <div className="not-prose flex items-center">
            <div className="flex items-center gap-x-2">
              <Image
                src={authorImageUrl || brainLogo}
                alt={`author image for ${
                  author?.name || "the author of this article"
                }`}
                width={60}
                height={60}
                className="h-12 w-12 rounded-full"
              />
              <p className="mt-0">{author?.name || "Burnout Project Team"}</p>
            </div>
            <p className="mx-3">&ndash;</p>
            <p className="mt-0">{getFormattedDate(date)}</p>
          </div> */}
          <div className="flex items-center justify-between">
            {/* <p className="not-prose text-green-800">
              {readingTime ? `${Math.round(readingTime)} min read` : null}
            </p> */}
            {audio && <AudioPlayer audio={audio} />}
          </div>
        </div>
        {/* <Share title={title} articleType="article" /> */}
        <div className="mb-12 aspect-video h-full w-auto">
          <Image
            width={1200}
            height={630}
            src={headerImageUrl || defaultImage}
            alt={`header image for the article ${title}`}
            priority={true}
            className="h-full w-full object-cover"
          ></Image>
        </div>

        <div className="px-6 first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-extrabold first-letter:text-green-900">
          <PortableText value={content} components={portableTextComponents} />
        </div>

        {showModal && study && (
          <StudyModal currentUrl={currentUrl} studyId={study} />
        )}
      </article>
      {quiz && (
        <QuizModal
          quiz={quiz}
          articleSlug={articleSlug}
          courseSlug={classification.slug}
        />
      )}
    </>
  );
}
