"use client";
import { useEffect, useRef, useMemo } from "react";
import { Payload, Actions } from "@/types/chatbot";
import Spinner from "@/app/_components/design/Spinner";
import { profile } from "console";

type InitialAssessmentScoreKeys =
  | "exhaustion"
  | "detachment"
  | "emotionalImparement"
  | "cognitiveImparement";

// for each key 'key' in InitialAssessmentScoreKeys, create a property of that key with type number
type InitialAssessmentScores = {
  [Key in InitialAssessmentScoreKeys]: number;
};

export default function InitialAssessmentHandler({
  actions,
  initialAssessmentScores,
}: {
  payload: Payload;
  actions: Actions;
  setState: Function;
  initialAssessmentScores: InitialAssessmentScores;
  lastUpdated: number;
}) {
  const averageInitialAssessmentScores = Object.keys(
    initialAssessmentScores
  ).reduce((newScores: Record<string, number>, key: string) => {
    newScores[key] =
      initialAssessmentScores[key as InitialAssessmentScoreKeys] / 2;
    return newScores;
  }, {});

  const burnoutProfiles = useMemo(
    () => ({
      engaged:
        Object.values(initialAssessmentScores)
          .map((score) => score / 2)
          .filter((score) => score < 1.5).length === 4,
      overExtended: [
        averageInitialAssessmentScores.exhaustion >= 1.5,
        averageInitialAssessmentScores.exhaustion / 2,
        "exhausted",
      ],
      detached: [
        averageInitialAssessmentScores.detachment >= 1.5,
        averageInitialAssessmentScores.detachment / 2,
        "a sense of detachment from your work",
      ],
      emotionallyImpared: [
        averageInitialAssessmentScores.emotionalImparement >= 1.5,
        averageInitialAssessmentScores.emotionalImparement / 2,
        "emotional",
      ],
      cognativelyImpared: [
        averageInitialAssessmentScores.cognitiveImparement >= 1.5,
        averageInitialAssessmentScores.cognitiveImparement / 2,
        "distracted",
      ],
      burntOut:
        Object.values(initialAssessmentScores)
          .map((score) => score / 2)
          .filter((score) => score >= 1.5).length === 4,
    }),
    [initialAssessmentScores, averageInitialAssessmentScores]
  );

  console.log("burnout profiles: ", burnoutProfiles);

  //Without useEffect as below we get an infinite loop due to actions causing a state update. Here I have used useRef to create a reference to the actions.handleEngaged function. This means that the function is only created once, and so the useEffect hook only runs once. This is because the reference to the function is not changing, so the useEffect hook does not run again. Without useRef the useEffect would require actions as a dependency and hence the infinite loop would persist.
  const handleEngagedRef = useRef(actions.handleEngaged);
  const handleNotEngagedRef = useRef(actions.handleNotEngaged);

  function getBurnoutDescriptions(burnoutProfiles: any): string[] {
    let descriptions: string[] = [];
    [
      "overExtended",
      "detached",
      "emotionallyImpared",
      "cognativelyImpared",
    ].forEach((key) => {
      if (burnoutProfiles[key][0]) {
        descriptions.push(
          burnoutProfiles[key][2]
          // value: burnoutProfiles[key][1],
        );
      }
    });

    // descriptions.sort((a, b) => b.value - a.value);

    // const descriptionStringsOrdered = descriptions.map(
    //   (item) => item.description
    // );
    return descriptions;
  }

  const userBurnoutProfiles = getBurnoutDescriptions(burnoutProfiles);

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
    if (burnoutProfiles.engaged) {
      handleEngagedRef.current();
    } else {
      handleNotEngagedRef.current(profileString);
    }
  }, [burnoutProfiles.engaged, profileString]);

  return null;
}
