"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const content = [
  {
    id: 0,
    title: (
      <div className="flex items-center gap-x-4">
        <p className="text-sm font-bold">Please Note</p>
        <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
      </div>
    ),
    body: (
      <p className="text-sm">
        Burnout Stories are first person accounts of burnout and work stress
        told from the author&apos;s own perspective and shared in the hope that
        they might help others reflect on and make sense of their own
        experiences. <br />
        <br />
        The events, people, and conversations described are based on the
        author&apos;s memory of events and their perception of those events.
        Certain details may have been altered or omitted for clarity, privacy,
        or literary purposes. These accounts often explore difficult and
        upsetting experiences, however they are not intended as criticism of
        anyone or any organisation. <br />
        <br />
        The views and opinions expressed here are solely those of the author and
        do not necessarily reflect those of PASU Health or anyone else. <br />
        <br />
        For the protection of privacy all names of people, places, and
        businesses/organisations have been changed. Any resemblance to real
        people, living or dead, or to existing organisations is purely
        coincidental.
      </p>
    ),
  },
];

export default function Disclaimer() {
  return (
    <div className="not-prose font-sans">
      {content.map((contentItem) => (
        <Disclosure as="div" key={contentItem.id} className="py-6">
          {({ open }) => (
            <>
              <DisclosureButton className="flex w-full items-start text-left text-blue-900">
                <h1 className="text-xl font-light leading-7 text-blue-900">
                  {contentItem.title}
                </h1>
                <span className="ml-10 flex items-center">
                  {open ? (
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </DisclosureButton>
              <DisclosurePanel as="dd" className="mt-2">
                <div className="mt-6 text-base leading-7 text-blue-900">
                  {contentItem.body}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
