import getFormattedDate from "../getFormattedDate";
import { getDocumentData } from "../getDocumentsData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/components/design/defaultImage.jpeg";

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

export default async function DocumentPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const articleData = await getDocumentData(slug);

  if (!articleData) notFound();

  const { title, date, content, headerImage } = articleData;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;

  return (
    <>
      <article
        className={`${martel.className} prose prose-slate mx-auto dark:prose-invert md:prose-lg`}
      >
        <div className="flex flex-col justify-items-start gap-y-4 px-2 py-2">
          <h1 className="mb-2 text-2xl text-slate-800 md:text-3xl lg:text-5xl">
            {title}
          </h1>
          <div className="not-prose flex items-center gap-x-2">
            <p className="">Last reviewed &ndash;</p>
            <p className="">{getFormattedDate(date)}</p>
          </div>
        </div>
        <div className="mb-12 aspect-square h-72 w-72">
          <Image
            width={1200}
            height={630}
            src={headerImageUrl || defaultImage}
            alt={`header image for the article ${title}`}
            priority={true}
            className="h-full w-full rounded-xl object-cover outline outline-offset-2 outline-emerald-700/50"
          ></Image>
        </div>

        <div className="px-6">
          <PortableText value={content} components={portableTextComponents} />
        </div>
        <div className="not-prose mt-6 pl-1 font-sans lg:pl-0">
          <Link href="/home">← Back to home</Link>
        </div>
      </article>
    </>
  );
}
