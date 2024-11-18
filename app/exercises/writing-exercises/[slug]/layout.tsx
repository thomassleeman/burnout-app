import type { Metadata } from "next";
import { getWritingExerciseData } from "../getWritingExercisesData";
import { HeadNav } from "../WritingExerciseNavs";

export const metadata: Metadata = {
  title: "Writing Exercise",
  description: "Writing exercises to help you reflect and grow",
};

export default async function WritingExercise({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const { slug } = params;

  const exerciseData = await getWritingExerciseData(slug);

  console.log("exerciseData: ", exerciseData);

  return (
    <section className="mx-2">
      <HeadNav exercise={exerciseData} />

      {children}
    </section>
  );
}
