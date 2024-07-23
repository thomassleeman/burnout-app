"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";

type MainButtonProps = {
  href: string;
  content: string;
};

export const PrimaryLinkButton: React.FC<MainButtonProps> = ({
  href,
  content,
}) => {
  return (
    <Link href={href}>
      {/* <button className="flex w-full justify-center rounded-md border border-transparent bg-emerald-800 px-4 py-2 text-base font-medium text-white hover:bg-emerald-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:text-sm"> */}
      <button className="rounded-md bg-emerald-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-emerald-600 focus-visible:ring-2 focus-visible:ring-offset-2">
        {content}
      </button>
    </Link>
  );
};

export function SubmitButton({
  children,
  classes,
}: {
  children: React.ReactNode;
  classes?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button className={classes} type="submit" disabled={pending}>
      {children}
    </button>
  );
}
