import {
  AcademicCapIcon,
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import getFormattedDate from "@articles/getFormattedDate";

async function getStudyData(studyId: string) {
  try {
    const url = `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_ORIGIN
        : process.env.NEXT_PUBLIC_DEV_ORIGIN
    }`;
    const res = await fetch(`${url}/api/researchStudy?studyId=${studyId}`);
    const study = await res.json();
    return study;
  } catch (err) {
    console.log(err);
  }
}

export default async function StudyModalContent({
  studyId,
}: {
  studyId: string;
}) {
  const { title, summary, published, authors, link } = await getStudyData(
    studyId
  );

  const authorsString = authors.join(", ");
  // const pubDate = new Date(published).toLocaleDateString("en-UK", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  const timestampMs = published._seconds * 1000;
  const date = new Date(timestampMs);

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <>
      <div className="mx-auto mb-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
        <AcademicCapIcon
          className="h-6 w-6 text-green-600"
          aria-hidden="true"
        />
      </div>
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h6 className="font-semibold text-gray-900">{title}</h6>
          <p className="text-sm text-green-800">{authorsString}</p>
          <div className="not-prose flex items-center space-x-3 text-blue-800">
            <CalendarDaysIcon className="h-5 w-5" />
            <p className="text-sm ">{formattedDate}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{summary}</p>
          </div>
          {/* <div className="flex items-center space-x-1">
            <a
              className="font-sans text-xs text-gray-900"
              href={link}
              target="_blank"
            >
              Navigate to original publication
            </a>
            <ArrowTopRightOnSquareIcon className="h-3 w-3 text-gray-900" />
          </div> */}
          <a
            href={link}
            target="_blank"
            className="flex items-center space-x-1 hover:text-green-700"
          >
            <div className="font-sans text-xs ">
              Navigate to original publication
            </div>
            <ArrowTopRightOnSquareIcon className="h-4 w-4 " />
          </a>
        </div>
      </div>
    </>
  );
}
