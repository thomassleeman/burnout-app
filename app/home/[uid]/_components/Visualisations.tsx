import AssessmentVisualisation from "./AssessmentVisualisation";
import StressLevelVisualisation from "./StressLevelVisualisation";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { serialiseData } from "@/utils/serialiseData";

export default function Visualisations({ user }: { user: UserData }) {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-x-2 text-lg font-extralight text-gray-900">
        <h3 className="">Visualisations</h3>
        <ChartPieIcon className="h-5 w-5 text-emerald-600" />
      </div>
      <AssessmentVisualisation user={serialiseData(user)} />
      <StressLevelVisualisation user={serialiseData(user)} />
    </div>
  );
}
