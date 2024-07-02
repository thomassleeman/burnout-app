import Link from "next/link";
import { usePathname } from "next/navigation";
import Share from "@/components/ui/Share";
import { FingerPrintIcon } from "@heroicons/react/20/solid";

export default function StoriesHeader({ title }: { title: string }) {
  return (
    <>
      <div>
        <Link href={``}>
          <div className="m-4 flex items-center space-x-6 text-slate-700">
            <FingerPrintIcon className="h-5 w-5" />
            {/* <h3 className=" font-mono  md:text-lg lg:text-xl"> */}
            <h3 className=" font-mono">Burnout Stories</h3>
          </div>
        </Link>

        <div className="">
          <div className="border-y border-gray-200">
            <nav
              className="-mb-px flex space-x-8 overflow-x-scroll "
              aria-label="Tabs"
            ></nav>
          </div>
          <div className="ml-4">
            <Share title={title} articleType="burnout story" />
          </div>
        </div>
      </div>
    </>
  );
}
