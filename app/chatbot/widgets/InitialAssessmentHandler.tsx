"use client";
import { Actions } from "@/types/chatbot";

import useInitialAssessmentHandler from "../bot/useInitialAssessmentHandler";

type InitialAssessmentScoreKeys =
  | "exhaustion"
  | "detachment"
  | "emotionalImpairment"
  | "cognitiveImpairment";

// for each key 'key' in InitialAssessmentScoreKeys, create a property of that key with type number
type InitialAssessmentScores = {
  [Key in InitialAssessmentScoreKeys]: number;
};

export default function InitialAssessmentHandler({
  actions,
  initialAssessmentScores,
}: {
  actions: Actions;
  initialAssessmentScores: InitialAssessmentScores;
  lastUpdated: number;
}) {
  useInitialAssessmentHandler({
    actions,
    initialAssessmentScores,
  });
  return null;
}
