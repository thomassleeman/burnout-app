import { getWritingExerciseData } from "../getWritingExercisesData";
import { notFound } from "next/navigation";

//Sanity
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

//components
import WritingExerciseForm from "../WritingExerciseForm";
import SidebarNav from "../SidebarNav";

export default async function WritingExercisePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const exerciseData = await getWritingExerciseData(slug);

  if (!exerciseData) notFound();

  const { title, introduction, journalingSections } = exerciseData;

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
        <article className="prose prose-slate mx-auto mt-8 ">
          <h1 id="introduction" className="py-2 text-2xl font-thin">
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
