import { Suspense } from "react";
import Spinner from "@/app/_components/ui/_components/Spinner";
import JoinPageContent from "./JoinPageContent";

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
          <div className="flex items-center gap-x-6">
            <Spinner size="medium" />
            <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
              Loading join page...
            </h2>
          </div>
        </div>
      }
    >
      <JoinPageContent />
    </Suspense>
  );
}
