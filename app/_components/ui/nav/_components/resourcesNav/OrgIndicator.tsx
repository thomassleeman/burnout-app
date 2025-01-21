"use client";

import Image from "next/image";

//jotai
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";

/* -------------- USER INDICATOR -------------------- */
export default function OrgIndicator() {
  const user = useAtomValue(userAtom);

  if (!user) return null;
  if (!user.organisation) return null;
  if (!user.organisation.logoUrl) return null;

  const logo = user.organisation.logoUrl;

  return (
    <Image
      src={logo}
      alt="Organisation Logo"
      width={60}
      height={60}
      className="h-full w-auto max-w-md py-1"
    />
  );
}
