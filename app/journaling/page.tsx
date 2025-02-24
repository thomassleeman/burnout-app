import Link from "next/link";
import Image from "next/image";
import journaling from "./resources/journaling.jpg";
import { getJournalsData } from "./getJournalsData";
import { urlForImage } from "@/sanity/lib/image";
import { journalOutlineFromSanity } from "@/types/journal";

// import ExerciseCard from "@/components/ui/nav/_components/resourcesNav/ExerciseCard";
import defaultImage from "@articles/defaultImage.jpeg";

export const revalidate = 1; // revalidate the data cache at most every hour

export default async function JournalingForInsightPage() {
  const journals = await getJournalsData();

  return (
    <div className="py-8 sm:py-12">
      {/* Hero section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16  px-6 py-16 sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center xl:gap-x-20 xl:px-20 2xl:py-20">
            <Image
              alt=""
              src={journaling}
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl outline outline-offset-4 outline-emerald-700/50  lg:aspect-square lg:h-auto lg:max-w-sm"
            />
            <div className="w-full flex-auto">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
                Journaling for insight.
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                <span className="font-semibold text-emerald-600">
                  Guided journaling is fundamental to the Pasu approach to
                  therapy.
                </span>
                <br />
                <br />
                Research consistently shows that Journaling reduces stress,
                improves emotional regulation, enhances self-awareness,
                alleviates symptoms of anxiety and depression, fosters
                mindfulness, strengthens problem-solving skills... the list goes
                on.<br></br>
                <br />{" "}
                <span className="text-gray-800">
                  Use the exercises here to benefit from this cornerstone of
                  therepeutic work.
                </span>
              </p>

              <div className="mt-10 flex"></div>
            </div>
          </div>

          <div className="mx-auto mb-12 max-w-2xl flex-col px-6 py-16 sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:px-20">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
              Journaling for insight exercises
            </h2>{" "}
            <div className="flex snap-x snap-mandatory flex-nowrap gap-x-8 overflow-x-scroll">
              {journals.map((journal: journalOutlineFromSanity) => (
                <JournalCard key={journal.slug} journal={journal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const JournalCard = ({ journal }: { journal: journalOutlineFromSanity }) => {
  const { name, slug, headerImage } = journal;
  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  return (
    <article
      key={slug}
      className="relative isolate flex flex-none basis-64 snap-center snap-always flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
    >
      <Link
        href={`/journaling/${slug}`}
        className="flex h-full w-full flex-col rounded-lg outline-4 outline-offset-4 outline-purple-400/25 hover:outline sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
      >
        <div className="relative aspect-square flex-none overflow-hidden">
          <Image
            className="h-64 w-64 rounded-lg border-4 border-gray-700/25 bg-gray-100 object-cover"
            width={250}
            height={250}
            src={headerImageUrl || defaultImage}
            alt={`header image for the journal, ${name}`}
          />
          <div className="absolute bottom-3 left-0 w-11/12 rounded-r-lg  bg-gray-800/50 px-5 py-2 drop-shadow-2xl">
            <h1 className="text-left text-lg text-white">{name}</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-4"></div>
        </div>
      </Link>
    </article>
  );
};
