import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Burnout Prevention Courses",
    description:
      "Access expertly designed courses to educate employees on recognizing and preventing burnout.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Chatbot Assessments",
    description:
      "Our interactive chatbot offers guided assessments to help detect burnout early and recommend actions.",
    icon: LockClosedIcon,
  },
  {
    name: "Guided Journaling Prompts",
    description:
      "Daily journaling prompts help employees reflect on their stressors and well-being in a structured manner.",
    icon: ArrowPathIcon,
  },
  {
    name: "Stress Tracking and Data Visualizations",
    description:
      "Track and understand stress levels over time with visualized data trends, helping manage mental health proactively.",
    icon: FingerPrintIcon,
  },
];

export default function OurSolutionSection() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="font-mono text-base font-semibold text-emerald-600">
          Our Solution
        </h2>
        <p className="mt-16 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Everything you need to tackle burnout in your team
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          We provide the tools and resources necessary for managing and
          preventing burnout, promoting a healthier and more productive
          workplace.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <feature.icon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
