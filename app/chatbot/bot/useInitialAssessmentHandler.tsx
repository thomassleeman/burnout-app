"use client";
import { useEffect, useRef, useMemo } from "react";
import { Actions, BurnoutProfiles } from "@/types/chatbot";

type InitialAssessmentScoreKeys =
  | "exhaustion"
  | "detachment"
  | "emotionalImparement"
  | "cognitiveImparement";

// for each key 'key' in InitialAssessmentScoreKeys, create a property of that key with type number
type InitialAssessmentScores = {
  [Key in InitialAssessmentScoreKeys]: number;
};

export default function useInitialAssessmentHandler({
  actions,
  initialAssessmentScores,
}: {
  actions: Actions;
  initialAssessmentScores: InitialAssessmentScores;
}) {
  const averageInitialAssessmentScores = Object.keys(
    initialAssessmentScores
  ).reduce((newScores: Record<string, number>, key: string) => {
    newScores[key] =
      initialAssessmentScores[key as InitialAssessmentScoreKeys] / 2;
    return newScores;
  }, {});

  /* ------------------------ BURNOUT PROFILES ----------------------------------- */
  /* Gives a boolean for engaged and burntout. For each of the 4 profiles it gives 
  a) boolean for that profile based on ave score >= 1.5
  b) average score between 0 - 4 for each profile. 
  c) string for that profile.
  This object will be saved to database.
  */
  // const burnoutProfilesRef = useRef(null);

  const burnoutProfilesRef = useRef<BurnoutProfiles | null>(null);

  if (burnoutProfilesRef.current === null) {
    burnoutProfilesRef.current = {
      engaged:
        Object.values(initialAssessmentScores)
          .map((score) => score / 2)
          .filter((score) => score < 1.5).length === 4,
      overExtended: [
        averageInitialAssessmentScores.exhaustion >= 1.5,
        averageInitialAssessmentScores.exhaustion,
        "exhausted",
      ],
      detached: [
        averageInitialAssessmentScores.detachment >= 1.5,
        averageInitialAssessmentScores.detachment,
        "detached",
      ],
      emotionallyImpaired: [
        averageInitialAssessmentScores.emotionalImparement >= 1.5,
        averageInitialAssessmentScores.emotionalImparement,
        "emotional",
      ],
      cognitivelyImpaired: [
        averageInitialAssessmentScores.cognitiveImparement >= 1.5,
        averageInitialAssessmentScores.cognitiveImparement,
        "distracted",
      ],
      burntOut:
        Object.values(initialAssessmentScores)
          .map((score) => score / 2)
          .filter((score) => score >= 1.5).length === 4,
    };
  }

  const burnoutProfiles = burnoutProfilesRef.current;

  //Without useEffect as below we get an infinite loop due to actions causing a state update. Here I have used useRef to create a reference to the actions.handleEngaged function. This means that the function is only created once, and so the useEffect hook only runs once. This is because the reference to the function is not changing, so the useEffect hook does not run again. Without useRef the useEffect would require actions as a dependency and hence the infinite loop would persist.
  const handleEngagedRef = useRef(actions.handleEngaged);
  const handleNotEngagedRef = useRef(actions.handleNotEngaged);

  function getBurnoutDescriptions(burnoutProfiles: any): string[] {
    if (!burnoutProfiles) {
      return [];
    }
    let descriptions: string[] = [];
    [
      "overExtended",
      "detached",
      "emotionallyImpaired",
      "cognitivelyImpaired",
    ].forEach((key) => {
      if (burnoutProfiles[key] && burnoutProfiles[key][0]) {
        descriptions.push(burnoutProfiles[key][2]);
      }
    });

    return descriptions;
  }

  const userBurnoutProfiles = useMemo(() => {
    return getBurnoutDescriptions(burnoutProfiles);
  }, [burnoutProfiles]);
  // console.log("userBurnoutProfiles: ", userBurnoutProfiles);

  function createProfileString(userBurnoutProfiles: string[]): string {
    const length = userBurnoutProfiles.length;
    if (length === 0) {
      return "";
    } else if (length === 1) {
      return userBurnoutProfiles[0];
    } else if (length === 2) {
      return userBurnoutProfiles.join(" and ");
    } else {
      return `${userBurnoutProfiles.slice(0, length - 1).join(", ")} and ${
        userBurnoutProfiles[length - 1]
      }`;
    }
  }

  const profileString = createProfileString(userBurnoutProfiles);

  useEffect(() => {
    if (burnoutProfiles && burnoutProfiles.engaged) {
      handleEngagedRef.current();
    } else {
      handleNotEngagedRef.current(profileString, burnoutProfiles);
    }
  }, [burnoutProfiles.engaged, profileString, burnoutProfiles]);

  return null;
}
