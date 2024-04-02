import { Highlight } from "react-instantsearch";
import Link from "next/link";

import { Hit } from "instantsearch.js";

import {
  BookmarkSquareIcon,
  CalendarDaysIcon,
  LifebuoyIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import getFormattedDate from "@articles/getFormattedDate";

type HitProps = {
  hit: Hit; //
  sendEvent: (...args: any[]) => void;
};

export default function HitComponent({
  hit,
  sendEvent,
}: HitProps): JSX.Element {
  const formattedDate = getFormattedDate(hit.date);
  return (
    <Link href={`articles/${hit.slug}`}>
      {" "}
      <li key={hit.slug} className="relative p-3 hover:bg-slate-100">
        <time dateTime={hit.date} className=" text-xs text-gray-600">
          {formattedDate}
        </time>
        <Highlight
          hit={hit}
          attribute="title"
          className="block truncate text-sm font-semibold leading-6 text-gray-900"
        />
        <span className="absolute inset-0" />
        <Highlight
          hit={hit}
          attribute="author"
          className="text-xs text-sky-800"
        />
      </li>
    </Link>
    // <div>
    //   {" "}
    //   <li key={hit.slug} className="relative p-3 hover:bg-slate-100">
    //     <time dateTime={hit.date} className=" text-xs text-gray-600">
    //       {formattedDate}
    //     </time>
    //     <Link
    //       href={`articles/${hit.slug}`}
    //       className="block truncate text-sm font-semibold leading-6 text-gray-900"
    //     >
    //       <Highlight hit={hit} attribute="title" />
    //       <span className="absolute inset-0" />
    //     </Link>
    //     <Highlight
    //       hit={hit}
    //       attribute="author"
    //       className="text-xs text-sky-800"
    //     />
    //   </li>
    // </div>
  );
}
