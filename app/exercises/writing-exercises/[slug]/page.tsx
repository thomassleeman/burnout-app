import { getWritingExerciseData } from "../getWritingExercisesData";
import { notFound } from "next/navigation";
import Image from "next/image";

//Sanity
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
import { urlForImage } from "@/sanity/lib/image";

//components
import WritingExerciseForm from "../WritingExerciseForm";
import SidebarNav from "../SidebarNav";

export const revalidate = 3600; // revalidate the data cache at most every hour

export default async function WritingExercisePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const exerciseData = await getWritingExerciseData(slug);

  if (!exerciseData) notFound();

  const { title, introduction, journalingSections, headerImage } = exerciseData;
  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;

  const sections = [
    { id: "introduction", title: "Introduction" },
    ...journalingSections.map((section: any) => ({
      id: section.slug,
      title: section.sectionTitle,
      prompts:
        section.promptGroups?.flatMap((group: any) =>
          group.prompts.map((prompt: any) => ({
            id: prompt._key,
            title: prompt.content[0]?.text || "Prompt",
          }))
        ) || [],
    })),
  ];

  return (
    <div className="flex">
      <div className="h-screen w-full overflow-y-auto">
        <article className="prose prose-slate mx-auto mt-8 prose-img:rounded-xl">
          <div className="mb-12 aspect-square h-72 w-72">
            <Image
              src={headerImageUrl || ""}
              alt={title}
              height={250}
              width={250}
              className="h-full w-full object-cover outline outline-offset-2 outline-emerald-700/50"
            />
          </div>
          <h1 id="introduction" className="py-2 text-3xl font-thin">
            Introduction
          </h1>
          <div>
            <PortableText
              value={introduction}
              components={portableTextComponents}
            />
          </div>
          <WritingExerciseForm
            exerciseSlug={slug}
            prompts={journalingSections}
          />
        </article>
      </div>
      <SidebarNav sections={sections} />
    </div>
  );
}
