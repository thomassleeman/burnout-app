import React from "react";
import Footer from "../../_components/ui/Footer";
import { getCourseData } from "../getCoursesData";

import { CourseHeadNav, CourseFootNav } from "./courseNavs";

export const metadata = {
  title: "Burnout Course",
  description:
    "Understand burnout and how to create a more productive workplace.",
};

export default async function CourseLayout({
  params,
  children,
}: {
  params: { courseSlug: string };
  children: React.ReactNode;
}) {
  const { courseSlug } = params;

  const courseData = await getCourseData(courseSlug, "layout");

  return (
    <>
      <div className="container mx-auto mb-auto sm:px-6 lg:px-8">
        <div className="mt-4 flex flex-col gap-y-12 lg:gap-y-28">
          <div className="sticky top-0">
            <CourseHeadNav course={courseData} />
          </div>
          {children}
          <CourseFootNav course={courseData} />
        </div>
      </div>
      <Footer />
    </>
  );
}
