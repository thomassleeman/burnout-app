import React from "react";
import Image from "next/image";
import { getJournalData } from "../getJournalsData";
import JournalWithCalendar from "@/app/journaling/JournalWithCalendar";
import { journalOutlineFromSanity } from "@/types/journal";
import SidebarNav from "../SidebarNav";

//Sanity
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 1; // revalidate the data cache at most every hour

export default async function JournalingPage({ params }: PageProps) {
  // Fetch journal data from Sanity
  let journalOutline: journalOutlineFromSanity | null = null;
  try {
    journalOutline = await getJournalData(params.slug);
  } catch (error) {
    console.error("Error fetching journal data:", error);
  }

  if (!journalOutline) {
    return <div>Loading...</div>;
  }

  const { name, headerImage, description, promptCategories, exampleEntries } =
    journalOutline;

  console.log;

  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;

  // Validate the journal outline
  if (!journalOutline || !journalOutline.slug) {
    console.error("Invalid journal outline data:", journalOutline);
    return (
      <article className="prose mx-auto px-4 py-8 lg:prose-xl">
        <h1>Journal Not Found</h1>
        <p>
          Sorry, we couldn&apos;t find the journal template you&apos;re looking
          for.
        </p>
        <p>Requested slug: {params.slug}</p>
      </article>
    );
  }

  return (
    <div className="flex">
      <div className="h-screen w-full overflow-y-auto">
        <article className="prose prose-slate mx-auto px-4 py-8 lg:prose-xl prose-img:rounded-xl">
          <h1>{name}</h1>
          <div className="border-y border-gray-400">
            <details className="group my-4" open>
              <summary className="cursor-pointer list-none text-sm font-semibold text-emerald-700 hover:text-emerald-500 focus:outline-none">
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 transform transition duration-200 ease-in-out group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
                  </svg>
                  <span className="select-none">Introduction</span>
                </div>
              </summary>
              <div className="group-closed:translate-y-2 group-closed:opacity-0 mb-12 mt-4 aspect-square h-72 w-72 transform opacity-100 transition-all duration-300 ease-in-out group-open:translate-y-0">
                <Image
                  src={headerImageUrl || ""}
                  alt={`header image for the journal, ${name}`}
                  height={250}
                  width={250}
                  className="h-full w-full object-cover outline outline-offset-2 outline-emerald-700/50"
                />
              </div>
              <h2 id="introduction" className="py-2 font-thin">
                Introduction
              </h2>
              <PortableText
                value={description}
                components={portableTextComponents}
              />
              <div className="border-x border-y-8 border-emerald-600/25 px-6">
                <details className="group my-4" open={false}>
                  <summary className="cursor-pointer list-none text-sm font-semibold text-emerald-700 hover:text-emerald-500 focus:outline-none">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 transform transition duration-200 ease-in-out group-open:rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
                      </svg>
                      <span className="select-none">Example</span>
                    </div>
                  </summary>
                  <PortableText
                    value={exampleEntries}
                    components={portableTextComponents}
                  />
                </details>
              </div>
            </details>
          </div>
          <JournalWithCalendar journalOutlineFromSanity={journalOutline} />
        </article>
      </div>
      <SidebarNav promptCategories={promptCategories} />
    </div>
  );
}
