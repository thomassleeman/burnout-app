import RollingNumber from "./RollingNumbers";

const stats = [
  {
    value: 40,
    description: (
      <p>
        Of employees reported feeling burnout{" "}
        <strong>&apos;sometimes&apos;</strong>, while{" "}
        <span className="text-lg font-semibold text-emerald-700">23%</span>{" "}
        reported feeling it <strong>&apos;very often&apos;</strong> or{" "}
        <strong>&apos;always&apos;</strong>.
      </p>
    ),
    ref: "Gallup, 'Employee Burnout: Causes and Cures'",
  },
  {
    value: 77,
    description:
      "Of respondents reported having experienced burnout at some time, leading many to leave jobs. Burnout-related turnover is highest in 'competitive industries'.",
    ref: "Deloitte, 'Workplace Burnout Survey'",
  },
  {
    value: 20,
    description:
      "Of employee salary: The estimated cost of burnout-related employee turnover.",
    ref: "Society for Human Resource Management (SHRM): 'The Cost of Employee Turnover'",
  },
];

export default function TheProblemSection() {
  return (
    <div className="mx-auto mt-16 px-6 py-28 lg:px-8 2xl:mt-32">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="font-mono text-base/7 font-semibold text-red-500">
          The Problem
        </h2>
        <h1 className="text-pretty lg:text-balance mt-16 text-4xl font-semibold tracking-tight sm:text-5xl">
          How much is employee burnout costing your organisation?
        </h1>
        <p className="mt-6 text-lg/8 text-gray-900">
          Burnout has a{" "}
          <strong className="font-semibold">significant impact</strong> on
          productivity, retention, absenteeism, and presenteeism. Recent studies
          reveal:
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-y-6">
              <h1 className="flex items-center gap-x-1 text-6xl font-semibold text-emerald-700">
                <RollingNumber value={stat.value} />

                <span>%</span>
              </h1>
              <dd className="mt-1 flex flex-auto flex-col font-serif text-base/7 text-gray-800">
                <div className="flex-auto">{stat.description}</div>
                <p className="mt-6">
                  <small className="rounded-lg bg-white px-2 py-1 text-xs text-gray-500">
                    {stat.ref}
                  </small>
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
