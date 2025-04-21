"use client";

import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "default" | "danger";
}

export default function ProfileSection({
  title,
  description,
  children,
  variant = "default",
}: ProfileSectionProps) {
  const isDefault = variant === "default";

  return (
    <section className={`mb-12 ${!isDefault ? "mt-12" : ""}`}>
      <div className="px-4 sm:px-0">
        <h3
          className={`text-base font-semibold leading-7 ${
            isDefault ? "text-gray-900" : "text-red-400"
          }`}
        >
          {title}
        </h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div
        className={`mt-6 rounded-2xl p-6 outline outline-1 ${
          isDefault ? "outline-emerald-600" : "outline-red-400"
        }`}
      >
        <dl className="divide-y divide-gray-100">{children}</dl>
      </div>
    </section>
  );
}
