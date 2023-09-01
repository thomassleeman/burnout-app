import getFormattedDate from "../getFormattedDate";
import { getSortedArticlesData, getArticleData } from "../getArticlesData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRemarkSync } from "react-remark";
import defaultImage from "../defaultImage.jpeg";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  // const articles = await getSortedArticlesData();
  const { slug } = params;

  // if (!articles.find((article) => article.id === articleId)) notFound();

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

  const reactContent = useRemarkSync(content || "");

  return (
    <article className="prose prose-slate mx-auto px-6 dark:prose-invert md:prose-lg lg:prose-xl">
      <h1 className="not-prose mb-0 mt-4 text-sm">{title}</h1>
      <div className="not-prose flex">
        <p className="mt-0">{pubDate}</p>
        <p className="mx-3">&ndash;</p>
        <p className="mt-0">{author || "Burnout Project Team"}</p>
      </div>
      {/* <p className="not-prose text-green-800">{`${readingTime} ${
        readingTime > 1 ? `mins` : `min`
      } read`}</p> */}
      <p className="not-prose text-green-800">
        {readingTime
          ? `${readingTime} ${readingTime > 1 ? `mins` : `min`} read`
          : null}
      </p>

      <Image
        width={1200}
        height={630}
        src={headerImage || defaultImage}
        alt={headerImageAlt || title}
        priority={true}
      ></Image>
      <div>{reactContent}</div>
      <p>
        <Link href="/articles">← Back to library</Link>
      </p>
    </article>
  );
}
