import getFormattedDate from "../getFormattedDate";
import { getArticleData } from "../getArticlesData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../defaultImage.jpeg";
import Modal from "@/components/ui/modal/Modal";

import MarkDown from "markdown-to-jsx";
import Share from "../_components/Share";

export default async function Article({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string> | null | undefined;
}) {
  const { slug } = params;

  //Show Modal if searchParams has modal=true
  const showModal = searchParams?.modal;
  const study = searchParams?.study;
  //Current url is passed to modal to enable the close button to link back to the article without the modal
  const currentUrl = `${
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_ORIGIN
      : process.env.NEXT_PUBLIC_DEV_ORIGIN
  }/articles/${slug}`;

  const articleData = await getArticleData(slug);
  if (!articleData) notFound();

  console.log(articleData, "articleData");

  const {
    title,
    date,
    content,
    audio,
    headerImage,
    headerImageAlt,
    author,
    readingTime,
  } = articleData;

  let pubDate;
  if (date) {
    pubDate = getFormattedDate(date);
  } else {
    pubDate = "";
  }

  return (
    <article className="prose prose-slate mx-auto dark:prose-invert md:prose-lg">
      <div className="px-6">
        <h1 className="mb-0 mt-4 text-lg md:text-xl lg:text-5xl">{title}</h1>
        <div className="not-prose flex">
          <p className="mt-0">{pubDate}</p>
          <p className="mx-3">&ndash;</p>
          <p className="mt-0">{author || "Burnout Project Team"}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="not-prose text-green-800">
            {readingTime ? `${Math.round(readingTime)} min read` : null}
          </p>
          {/* <TextToSpeech text={content} /> */}
          <div className="flex flex-col items-center">
            <audio controls>
              <source src={audio} type="audio/mpeg" />
            </audio>
          </div>
        </div>
        <Share />
      </div>

      <Image
        width={1200}
        height={630}
        src={headerImage || defaultImage}
        alt={headerImageAlt || title}
        priority={true}
      ></Image>

      <div className="px-6 first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-extrabold first-letter:text-green-900">
        <MarkDown>{content}</MarkDown>
      </div>
      <p>
        <Link href="/articles">← Back to library</Link>
      </p>
      {showModal && study && <Modal currentUrl={currentUrl} studyId={study} />}
      <small className="mt-1 text-xs">
        <sup>&#42;</sup> Audio for this article is provided by an ai voice.
      </small>
    </article>
  );
}
