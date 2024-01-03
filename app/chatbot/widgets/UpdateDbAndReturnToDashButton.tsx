"use client";
import { useState } from "react";
import Link from "next/link";
import updateDatabase from "./functions/updateDatabase";
import { AssessmentScores } from "@/types/chatbot";
import Spinner from "@/app/_components/design/Spinner";

export default function UpdateDbAndReturnToDashButton({
  initialAssessmentScores,
  secondaryAssessmentScores,
}: {
  initialAssessmentScores: AssessmentScores;
  secondaryAssessmentScores: AssessmentScores;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await updateDatabase(initialAssessmentScores, secondaryAssessmentScores);
    setLoading(false);
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className="pointer rounded-lg border-2 border-blue-400 bg-white px-4 py-2 text-gray-800 hover:border-blue-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        {loading ? (
          <Spinner stroke="blue" />
        ) : (
          <Link className="flex items-center space-x-3" href="/dashboard">
            Save session and return to dashboard
          </Link>
        )}
      </button>
    </div>
  );
}
