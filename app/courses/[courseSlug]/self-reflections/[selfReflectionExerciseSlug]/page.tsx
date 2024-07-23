import { getSelfReflectionExerciseData } from "@exercises/getExercisesData";
import { notFound } from "next/navigation";

//Sanity
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

//components
import TextAreaForm from "./TextAreaForm";

export const revalidate = 3600; // revalidate the data cache at most every hour

export default async function SelfReflectionExercise({
  params,
}: {
  params: { selfReflectionExerciseSlug: string };
}) {
  const { selfReflectionExerciseSlug } = params;
  const exerciseData = await getSelfReflectionExerciseData(
    selfReflectionExerciseSlug
  );

  if (!exerciseData) notFound();

  const { title, instructions, classification } = exerciseData;

  return (
    <>
      <section className="prose prose-slate mx-auto px-4 dark:prose-invert md:prose-lg sm:px-0">
        <h1 className="">{title}</h1>

        <div className="">
          <PortableText
            value={instructions}
            components={portableTextComponents}
          />
        </div>
        <TextAreaForm exerciseSlug={selfReflectionExerciseSlug} />
      </section>
    </>
  );
}
