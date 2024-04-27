import { Highlight } from "react-instantsearch";
import Link from "next/link";

import { Hit } from "instantsearch.js";
import { Popover } from "@headlessui/react";

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
    <Popover.Button as={Link} href={`/articles/${hit.slug}`}>
      {" "}
      <div className="relative p-3 hover:bg-slate-100">
        <time dateTime={hit.date} className=" text-xs text-gray-600">
          {formattedDate}
        </time>
        {/* <Highlight
          hit={hit}
          attribute="title"
          className="block truncate text-sm font-semibold leading-6 text-gray-900"
        /> */}
        <span className="absolute inset-0" />
        {/* <Highlight
          hit={hit}
          attribute="author"
          className="text-xs text-sky-800"
        /> */}
      </div>
    </Popover.Button>
  );
}
