"use client";

import { Payload, Actions, InitialAssessmentScores } from "@/types/chatbot";
import { useState } from "react";

export default function CycleThroughProfilesToDiscuss({
  actions,

  profileArray,
}: {
  payload: Payload;
  actions: Actions;
  setState: Function;
  initialAssessmentScores: InitialAssessmentScores;
  profileArray: string[];
  lastUpdated: number;
}) {
  const [currentPosition, setCurrentPosition] = useState(true);

  console.log("profileArray: ", profileArray);

  const chooseProfileToDiscuss = profileArray.map((profile, index) => ({
    id: index,
    content: profile,
    //Action name converted to camelCase.
    action:
      actions[`handle${profile.charAt(0).toUpperCase() + profile.slice(1)}`],
  }));

  return (
    <div
      className={`${
        currentPosition ? "flex" : "hidden"
      } mt-6 flex-wrap justify-end gap-4 self-end`}
    >
      {chooseProfileToDiscuss.map((option) => (
        <button
          key={option.id}
          className="pointer rounded-lg border-2 border-blue-400 bg-white px-4 py-2 text-gray-800 drop-shadow-lg hover:border-blue-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 active:drop-shadow-sm"
          onClick={() => {
            setCurrentPosition(false);
            if ("action" in option && typeof option.action === "function") {
              option.action();
            }
          }}
        >
          {option.content}
        </button>
      ))}
    </div>
  );
}
