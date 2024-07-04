import getFormattedDate from "../getFormattedDate";
import { getArticleData } from "../getArticlesData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../defaultImage.jpeg";
import StudyModal from "@/components/ui/modal/StudyModal";
import ArticleFooter from "../_components/ArticleFooter";
import AudioPlayer from "../_components/AudioPlayer";

import MarkDown from "markdown-to-jsx";
import Share from "@/components/ui/Share";
import { Martel } from "next/font/google";
import brainLogo from "@/components/design/brainLogo.png";

//react-share
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

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
  params: { slug: string };
  searchParams: Record<string, string> | null | undefined;
}) {
  const { slug } = params;
  const articleData = await getArticleData(slug);

  //Show Modal if searchParams has modal=true
  const showModal = searchParams?.modal;
  const study = searchParams?.study;
  //Current url is passed to modal to enable the close button to link back to the article without the modal
  const currentUrl = `${
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_ORIGIN
      : process.env.NEXT_PUBLIC_DEV_ORIGIN
  }/articles/${slug}`;

  // const articleData = await getArticleData(slug);
  if (!articleData) notFound();

  const {
    title,
    date,
    content,
    audio,
    headerImage,
    author,
    readingTime,
    category,
  } = articleData;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  const authorImageUrl = author?.image ? urlForImage(author.image) : null;

  return (
    <>
      <article
        className={`${martel.className} prose prose-slate mx-auto dark:prose-invert md:prose-lg`}
      >
        {/* <div className="px-6 font-sans">
          <h1 className="mt-4 text-slate-800">{title}</h1>
          <div className="not-prose flex items-center">
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
          </div>
          <span className="w-fit rounded-lg bg-emerald-500/50 px-2 py-1 text-sm font-extralight text-slate-900">
            {category?.name}
          </span>
          <div className="flex items-center justify-between">
            <p className="not-prose text-green-800">
              {readingTime ? `${Math.round(readingTime)} min read` : null}
            </p>
            {audio && <AudioPlayer audio={audio} />}
          </div>
        </div> */}
        <div className="flex flex-col justify-items-start gap-y-4 px-2 py-2">
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
            <p className="mt-0">{author?.name || "Burnout Project Team"}</p>
            <p className="">&ndash;</p>
            <p className="">{getFormattedDate(date)}</p>
          </div>
          <span className="w-fit rounded-lg bg-emerald-500/50 px-2 py-1 text-sm font-extralight text-slate-900">
            {category?.name}
          </span>

          {audio && <AudioPlayer audio={audio} />}
        </div>
        <Share title={title} articleType="article" />

        <Image
          width={1200}
          height={630}
          src={headerImageUrl || defaultImage}
          alt={`header image for the article ${title}`}
          priority={true}
        ></Image>

        <div className="px-6 first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-extrabold first-letter:text-green-900">
          <PortableText value={content} components={portableTextComponents} />
        </div>
        <div className="not-prose mt-6 pl-1 font-sans lg:pl-0">
          <Link href="/articles">← Back to library</Link>
        </div>
        {showModal && study && (
          <StudyModal currentUrl={currentUrl} studyId={study} />
        )}
      </article>
      {slug && category ? (
        <ArticleFooter category={category} currentArticle={slug} />
      ) : null}{" "}
    </>
  );
}
