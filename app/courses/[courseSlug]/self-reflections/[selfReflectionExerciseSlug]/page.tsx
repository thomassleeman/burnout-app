import { getSelfReflectionExerciseData } from "@exercises/getExercisesData";
import { notFound } from "next/navigation";

//Sanity
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

//components
import NewTextAreaForm from "./NewTextAreaForm";

export const revalidate = 3600; // revalidate the data cache at most every hour

export default async function SelfReflectionExercise({
  params,
}: {
  params: { courseSlug: string; selfReflectionExerciseSlug: string };
}) {
  const { courseSlug, selfReflectionExerciseSlug } = params;
  const exerciseData = await getSelfReflectionExerciseData(
    selfReflectionExerciseSlug
  );

  if (!exerciseData) notFound();

  const { title, introduction, prompts } = exerciseData;

  return (
    <>
      <section className="prose prose-slate mx-auto px-4 dark:prose-invert md:prose-lg sm:px-0">
        <h1 className="">{title}</h1>

        <div className="">
          <PortableText
            value={introduction}
            components={portableTextComponents}
          />
        </div>
        <NewTextAreaForm
          courseSlug={courseSlug}
          exerciseSlug={selfReflectionExerciseSlug}
          prompts={prompts}
        />
        {/* {prompts.map((prompt, index) => (
          <div key={index} className=" mb-20 p-4">
            <h2 className="text-2xl font-light">{prompt.title}</h2>
            <div className="">
              <PortableText
                value={prompt.instructions}
                components={portableTextComponents}
              />
            </div>
            <TextAreaForm
              exerciseSlug={selfReflectionExerciseSlug}
              prompts={prompts}
            />
          </div>
        ))} */}
      </section>
    </>
  );
}
