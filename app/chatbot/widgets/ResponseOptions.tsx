"use client";

import {
  Payload,
  Actions,
  SimpleActionButtonWidget,
  OneToTenAssessmentButtonWidget,
  AssessmentButtonWidget,
  InitialAssessmentScores,
} from "@/types/chatbot";
import { useState } from "react";

export default function ResponseOptions({
  payload,
  actions,
  setState,
  profileString,
  profileArray,
  lastUpdated,
}: {
  payload: Payload;
  actions: Actions;
  setState: Function;
  initialAssessmentScores: InitialAssessmentScores;
  profileString: string;
  profileArray: string[];
  lastUpdated: number;
}) {
  const { stream } = payload;
  //Convert profileString to an array of strings.
  const profileStringArray = profileString.split(/,|and/).map((s) => s.trim());
  //this useState is used to hide the response options when the user has clicked on one.
  const [currentPosition, setCurrentPosition] = useState(true);

  /* OPTION STREAMS */
  /* ------------------------------------------------------------------------------------------------------------------- */

  const checkToProceed: SimpleActionButtonWidget[] = [
    {
      id: 0,
      content: "I'm ready, let's go ahead",
      action: actions.handleGoAhead,
    },
    {
      id: 1,
      content: "I don't want to do this now",
      action: actions.handleNoGoAhead,
    },
    {
      id: 2,
      content: "Tell me more about confidentiality",
      action: actions.handleTellMeAboutConfidentiality,
    },
  ];
  /* ------------------------------------------------------------------------------------------------------------------- */

  const checkToStart: SimpleActionButtonWidget[] = [
    {
      id: 0,
      content: "Got it, let's start.",
      action: actions.handleQuestionOne,
    },
    { id: 1, content: "Tell me more about why this is useful" },
  ];
  /* ------------------------------------------------------------------------------------------------------------------- */
  const yesOrNo: SimpleActionButtonWidget[] = [
    {
      id: 0,
      content: "Yes",
      action: () =>
        actions.handleBeginCyclingThroughProfilesToDiscuss(profileStringArray),
    },
    { id: 1, content: "No", action: actions.handleNotEngagedNoGoAhead },
  ];
  // const yesOrNo: SimpleActionButtonWidget[] = [
  //   {
  //     id: 0,
  //     content: "Yes",
  //     action: () =>
  //       profileStringArray.length > 1
  //         ? actions.handleChooseProfileToDiscuss()
  //         : actions.handleSolitaryProfile(profileString),
  //   },
  //   { id: 1, content: "No", action: actions.handleNotEngagedNoGoAhead },
  // ];
  /* ------------------------------------------------------------------------------------------------------------------- */

  //In action provider, each action of the initial assessment sequence is allocated its own number to a the state variable lastUpdated. so 1 for question1, etc.
  const responseActions = [
    "start of sequence",
    actions.handleQuestionOne,
    actions.handleQuestionTwo,
    actions.handleQuestionThree,
    actions.handleQuestionFour,
    actions.handleQuestionFive,
    actions.handleQuestionSix,
    actions.handleQuestionSeven,
    actions.handleQuestionEight,
    actions.handleEndOfInitialAssessment,
  ];

  const responses = [
    { id: 4, content: "Not at all", score: 0, category: payload.category },
    {
      id: 3,
      content: "Only occasionally",
      score: 1,
      category: payload.category,
    },
    { id: 2, content: "Sometimes", score: 2, category: payload.category },
    { id: 1, content: "Often", score: 3, category: payload.category },
    { id: 0, content: "All the time", score: 4, category: payload.category },
  ];
  /* ------------------------------------------------------------------------------------------------------------------- */

  const chooseProfileToDiscuss = profileStringArray.map((profile, index) => ({
    id: index,
    content: profile,
    //Action name converted to camelCase.
    action:
      actions[`handle${profile.charAt(0).toUpperCase() + profile.slice(1)}`],
  }));

  /* ------------------------------------------------------------------------------------------------------------------- */

  const secondAssessment = [
    {
      id: 0,
      value: 1,
      content: "1",
    },
    {
      id: 1,
      value: 2,
      content: "2",
    },
    {
      id: 2,
      value: 3,
      content: "3",
    },
    {
      id: 3,
      value: 4,
      content: "4",
    },
    {
      id: 4,
      value: 5,
      content: "5",
    },
    {
      id: 5,
      value: 6,
      content: "6",
    },
    {
      id: 6,
      value: 7,
      content: "7",
    },
    {
      id: 7,
      value: 8,
      content: "8",
    },
    {
      id: 8,
      value: 9,
      content: "9",
    },
    {
      id: 9,
      value: 10,
      content: "10",
    },
  ];

  /* ------------------------------------------------------------------------------------------------------------------- */

  // Type guard function
  // function isOneToTenAssessmentButtonWidgetArray(
  //   array: CurrentOptions
  // ): array is OneToTenAssessmentButtonWidget[] {
  //   return array.length > 0 && "value" in array[0];
  // }

  type CurrentOptions =
    | SimpleActionButtonWidget[]
    | AssessmentButtonWidget[]
    | OneToTenAssessmentButtonWidget[];
  let currentOptions: CurrentOptions = responses;

  if (stream === "checkToProceed") {
    currentOptions = checkToProceed;
  }

  if (stream === "checkToStart") {
    currentOptions = checkToStart;
  }

  if (stream === "yesOrNo") {
    currentOptions = yesOrNo;
  }

  if (stream === "chooseProfileToDiscuss") {
    currentOptions = chooseProfileToDiscuss;
  }

  if (
    stream === "exhausted" ||
    stream === "detached" ||
    stream === "emotional" ||
    stream === "distracted"
  ) {
    currentOptions = secondAssessment;
  }

  return (
    <div
      className={`${
        currentPosition ? "flex" : "hidden"
      } mt-6 flex-wrap justify-end gap-4 self-end`}
    >
      {currentOptions.map((option) => (
        <button
          key={option.id}
          className="pointer rounded-lg border-2 border-blue-400 bg-white px-4 py-2 text-gray-800 drop-shadow-lg hover:border-blue-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 active:drop-shadow-sm"
          onClick={() => {
            /* --------------------------------------------- FIRST ASSESSMENT --------------------------------------------- */
            if (stream === "responses") {
              setState((prevState: any) => ({
                // update prevState with a new version of initialAssessmentScores that is icremented by the value of the option score in the category refered to in the payload.
                ...prevState,
                initialAssessmentScores: {
                  ...prevState.initialAssessmentScores,
                  [payload.category]:
                    "score" in option
                      ? prevState.initialAssessmentScores[payload.category] +
                        option.score
                      : prevState.initialAssessmentScores[payload.category],
                },
              }));
              setCurrentPosition(false);
              //check type because resposeActions contains a string at index 0.
              if (typeof responseActions[lastUpdated + 1] === "function") {
                (
                  responseActions[lastUpdated + 1] as (
                    userResponseToLastQuestion: string
                  ) => void
                )(option.content);
              }
              /* --------------------------------------------- SECOND ASSESSMENT --------------------------------------------- */
            } else if (currentOptions === secondAssessment) {
              setCurrentPosition(false);
              //Type guard for value property.
              if ("value" in option) {
                switch (option.value) {
                  case 1:
                  case 2:
                  case 3:
                    actions.handleSecondAssessmentOneToThree(
                      stream,
                      option.content,
                      profileArray
                    );
                    break;
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    // actions[
                    //   `handleSecondAssessmentFourToSeven${
                    //     stream.charAt(0).toUpperCase() + stream.slice(1)
                    //   }`
                    // ](stream, option.content, profileArray);
                    actions.handleSecondAssessmentFourToSeven(
                      stream,
                      option.content,
                      profileArray
                    );
                    break;
                  case 8:
                  case 9:
                  case 10:
                    actions.handleSecondAssessmentEightToTen(option.content);
                    break;
                }
              }
            } else if (currentOptions === chooseProfileToDiscuss) {
              /* --------------------------------------------- CHOOSE PROFILE TO DISCUSS --------------------------------------------- */

              // setState((prevState: any) => ({
              //   ...prevState,
              //   initialAssessmentScores: {
              //     ...prevState.initialAssessmentScores,
              //     [payload.category]:
              //       "score" in option
              //         ? prevState.initialAssessmentScores[payload.category] +
              //           option.score
              //         : prevState.initialAssessmentScores[payload.category],
              //   },
              // }));
              setCurrentPosition(false);
              if ("action" in option && typeof option.action === "function") {
                option.action();
              }
            } else {
              /* --------------------------------------------- OTHERS --------------------------------------------- */
              setCurrentPosition(false);
              if ("action" in option && typeof option.action === "function") {
                option.action();
              }
            }
          }}
        >
          {option.content}
        </button>
      ))}
    </div>
  );
}
