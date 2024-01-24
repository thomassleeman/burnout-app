import { visit } from "unist-util-visit";
import { fromMarkdown } from "mdast-util-from-markdown";
import { useRemarkSync } from "react-remark";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import getFormattedDate from "../getFormattedDate";
import { getSortedArticlesData, getArticleData } from "../getArticlesData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../defaultImage.jpeg";
import Modal from "@/components/ui/modal/Modal";

import MarkDown from "markdown-to-jsx";
import testArticle from "./testArticle.md";

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

  const {
    title,
    date,
    content,
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

  // const reactContent = useRemarkSync(content || "");

  // export const MixedHTMLSanitized = ({ content }) => {
  // const reactContent = useRemarkSync(content || "", {
  //   remarkToRehypeOptions: { allowDangerousHtml: true },
  //   //@ts-ignore
  //   rehypePlugins: [rehypeRaw, rehypeSanitize],
  // });

  /* ---------------- */

  return (
    <article className="prose prose-slate mx-auto px-6 dark:prose-invert md:prose-lg">
      <h1 className="not-prose mb-0 mt-4 text-sm">{title}</h1>
      <div className="not-prose flex">
        <p className="mt-0">{pubDate}</p>
        <p className="mx-3">&ndash;</p>
        <p className="mt-0">{author || "Burnout Project Team"}</p>
      </div>
      <p className="not-prose text-green-800">
        {readingTime ? `${Math.round(readingTime)} min read` : null}
      </p>

      <Image
        width={1200}
        height={630}
        src={headerImage || defaultImage}
        alt={headerImageAlt || title}
        priority={true}
      ></Image>
      {/* <div className="first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-extrabold first-letter:text-green-900">
        {reactContent}
      </div> */}
      <div className="first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-extrabold first-letter:text-green-900">
        <MarkDown>{content}</MarkDown>
      </div>
      <p>
        <Link href="/articles">← Back to library</Link>
      </p>
      {showModal && study && <Modal currentUrl={currentUrl} studyId={study} />}
    </article>
  );
}
