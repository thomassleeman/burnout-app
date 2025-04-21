import Spinner from "@/components/ui/_components/Spinner";

export default function Loading() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
      <div className="flex items-center gap-x-6">
        <Spinner size="medium" />
        {/* <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent"></div> */}
        <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
          Loading profile...
        </h2>
      </div>
    </div>
  );
}
