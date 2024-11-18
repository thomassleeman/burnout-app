import JournalWithCalendar from "./JournalWithCalendar";
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default async function MyJournalPage() {
  return (
    <>
      <div>
        <div className="my-6 flex max-w-fit items-center gap-x-2 rounded-xl border border-sky-600 p-2 text-sm text-sky-600 hover:border-sky-700 hover:text-sky-700">
          <InformationCircleIcon className="h-5 w-5" />
          <Link href={"#"} className="">
            Check out our Guide to Journaling
          </Link>
        </div>
        <JournalWithCalendar />
      </div>
    </>
  );
}
