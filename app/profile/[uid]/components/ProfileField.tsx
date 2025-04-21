"use client";

import { ReactNode } from "react";

interface ProfileFieldProps {
  label: string;
  value: ReactNode;
  action?: ReactNode;
}

export default function ProfileField({
  label,
  value,
  action,
}: ProfileFieldProps) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <span className="flex-grow">{value}</span>
        {action && <span className="ml-4 flex-shrink-0">{action}</span>}
      </dd>
    </div>
  );
}
