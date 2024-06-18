import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Martel } from "next/font/google";
// import Modal from "@/components/ui/modal/Modal";
import { getCourseData } from "../getCoursesData";
import defaultImage from "@articles/defaultImage.jpeg";

import { AcademicCapIcon } from "@heroicons/react/20/solid";

//Sanity

import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
import { Article } from "@/types/sanity";

export const revalidate = 3600; // revalidate the data cache at most every hour

const martel = Martel({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default async function Course({
  params,
}: {
  params: { courseSlug: string };
}) {
  const { courseSlug } = params;

  const courseData = await getCourseData(courseSlug);
  if (!courseData) notFound();

  const { title, content, headerImage, articles, slug } = courseData;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;

  return (
    <article className="prose prose-slate mx-auto dark:prose-invert md:prose-lg">
      {/* <div className="px-6">
        <h1 className="my-4 text-3xl lg:text-5xl">{title}</h1>
        <Share />
      </div> */}

      <Image
        width={1200}
        height={630}
        src={headerImageUrl || defaultImage}
        alt={`header image for the course ${title}`}
        priority={true}
        className=""
      ></Image>

      <div className={`${martel.className} first-line:bold px-6`}>
        <PortableText value={content} components={portableTextComponents} />
      </div>

      <div className="space-y-4 px-2 lg:px-0">
        <h2 className="">Resources in this course</h2>
        <div className="space-y-4">
          {articles.map((article: Article) => {
            const articleImageUrl = article.headerImage
              ? urlForImage(article.headerImage)
              : null;
            return (
              <div
                key={article.slug}
                className="not-prose flex items-center space-x-2"
              >
                <Image
                  width={50}
                  height={50}
                  src={articleImageUrl || defaultImage}
                  alt={`header image for the article ${article.title}`}
                  priority={true}
                  className=""
                ></Image>
                <h4>{article.title}</h4>
              </div>
            );
          })}
        </div>
      </div>

      <button className="mt-32 w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700">
        <Link
          className="text-white no-underline"
          href={`${courseSlug}/${articles[0].slug}`}
        >
          Get Started
        </Link>
      </button>
    </article>
  );
}
