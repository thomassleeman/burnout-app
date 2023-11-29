import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { LinkButtonPayload } from "@/types/chatbot";

export default function GoToDashboard({
  payload,
}: {
  payload: LinkButtonPayload;
}) {
  const { content, href, target, profile } = payload;

  return (
    <div className="">
      <button className="pointer rounded-lg border-2 border-blue-400 bg-white px-4 py-2 text-gray-800 hover:border-blue-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        <Link
          className="flex items-center space-x-3"
          href={href}
          target={target || "_self"}
        >
          {content}{" "}
          {target === "_blank" ? (
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          ) : null}
        </Link>
      </button>
    </div>
  );
}
