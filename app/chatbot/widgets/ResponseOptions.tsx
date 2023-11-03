"use client";

import {
  Payload,
  Actions,
  SimpleActionButtonWidget,
  AssessmentButtonWidget,
  InitialAssessmentScores,
} from "@/types/chatbot";
import { useState, useEffect, use } from "react";

export default function ResponseOptions({
  payload,
  actions,
  setState,
  initialAssessmentScores,
  lastUpdated,
}: {
  payload: Payload;
  actions: Actions;
  setState: Function;
  initialAssessmentScores: InitialAssessmentScores;
  lastUpdated: number;
}) {
  //this useState is used to hide the response options when the user has clicked on one.
  const [currentPosition, setCurrentPosition] = useState(true);

  // console.log("initialAS: ", initialAssessmentScores, "payload: ", payload);
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

  const checkToStart: SimpleActionButtonWidget[] = [
    {
      id: 0,
      content: "Got it, let's start.",
      action: actions.handleQuestionOne,
    },
    { id: 1, content: "Tell me more about why this is useful" },
  ];

  const yesOrNo: SimpleActionButtonWidget[] = [
    {
      id: 0,
      content: "Yes",
      action: actions.handleQuestionOne,
    },
    { id: 1, content: "No" },
  ];

  //In action provider, each action of the assessment sequence allocated its own number to a the state variable lastUpdated. so 1 for question1, etc.
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

  // const handleOnClickResponses = () => {};

  const { stream } = payload;

  type CurrentOptions = SimpleActionButtonWidget[] | AssessmentButtonWidget[];

  let currentOptions: CurrentOptions = responses;
  if (stream === "checkToProceed") {
    currentOptions = checkToProceed;
  }

  if (stream === "checkToStart") {
    currentOptions = checkToStart;
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
          // className="pointer rounded-lg border-2 border-blue-400 bg-white px-4 py-2 text-gray-800 drop-shadow-lg hover:border-blue-600 hover:text-gray-900 focus:outline-none active:drop-shadow-sm"
          onClick={() => {
            if (stream === "responses") {
              console.log("on click responses ran");
              setState((prevState: any) => ({
                // update prevState with a new version of initialAssessmentScores that is icremented by the value of the option score in the category refered to in the payload.
                ...prevState,
                initialAssessmentScores: {
                  ...prevState.initialAssessmentScores,
                  // [payload.category]:
                  //   prevState.initialAssessmentScores[payload.category] +
                  //   option.score,
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
            } else {
              console.log("on click not responses ran");
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

/* ------------------------------------------------------------------------------------------------------------- */

// "use client";

// import {
//   Payload,
//   Actions,
//   SimpleActionButtonWidget,
//   AssessmentButtonWidget,
// } from "@/types/chatbot";
// import { useState, useMemo, useCallback } from "react";

// export default function ResponseOptions({
//   payload,
//   actions,
//   setState,
//   initialAssessmentScores,
//   lastUpdated,
// }: {
//   payload: Payload;
//   actions: Actions;
//   setState: Function;
//   initialAssessmentScores: object;
//   lastUpdated: number;
// }) {
//   //this useState is used to hide the response options when the user has clicked on one.
//   const [currentPosition, setCurrentPosition] = useState(true);

//   console.log("initialAS: ", initialAssessmentScores, "payload: ", payload);
//   const checkToProceed: SimpleActionButtonWidget[] = [
//     {
//       id: 0,
//       content: "I'm ready, let's go ahead",
//       action: actions.handleGoAhead,
//     },
//     {
//       id: 1,
//       content: "I don't want to do this now",
//       action: actions.handleNoGoAhead,
//     },
//     {
//       id: 2,
//       content: "Tell me more about confidentiality",
//       action: actions.handleTellMeAboutConfidentiality,
//     },
//   ];

//   const checkToStart: SimpleActionButtonWidget[] = [
//     {
//       id: 0,
//       content: "Got it, let's start.",
//       action: actions.handleQuestionOne,
//     },
//     { id: 1, content: "Tell me more about why this is useful" },
//   ];

//   const responses = [
//     { id: 4, content: "Not at all", score: 0, category: payload.category },
//     {
//       id: 3,
//       content: "Only occasionally",
//       score: 1,
//       category: payload.category,
//     },
//     { id: 2, content: "Sometimes", score: 2, category: payload.category },
//     { id: 1, content: "Often", score: 3, category: payload.category },
//     { id: 0, content: "All the time", score: 4, category: payload.category },
//   ];

//   // const handleOnClickResponses = () => {};

//   const { stream } = payload;

//   type CurrentOptions = SimpleActionButtonWidget[] | AssessmentButtonWidget[];

//   let currentOptions: CurrentOptions = responses;
//   if (stream === "checkToProceed") {
//     currentOptions = checkToProceed;
//   }

//   if (stream === "checkToStart") {
//     currentOptions = checkToStart;
//   }

//   const responseActions = [
//     "start of sequence",
//     actions.handleQuestionOne,
//     actions.handleQuestionTwo,
//     actions.handleQuestionThree,
//     actions.handleQuestionFour,
//     actions.handleQuestionFive,
//     actions.handleQuestionSix,
//     actions.handleQuestionSeven,
//     actions.handleQuestionEight,
//   ];

//   const handleClick = useCallback(
//     (option) => {
//       if (stream === "responses") {
//         console.log("on click responses ran");
//         setState((prevState: any) => ({
//           // update prevState with a new version of initialAssessmentScores that is icremented by the value of the option score in the category refered to in the payload.
//           ...prevState,
//           initialAssessmentScores: {
//             ...prevState.initialAssessmentScores,
//             // [payload.category]:
//             //   prevState.initialAssessmentScores[payload.category] +
//             //   option.score,
//             [payload.category]:
//               "score" in option
//                 ? prevState.initialAssessmentScores[payload.category] +
//                   option.score
//                 : prevState.initialAssessmentScores[payload.category],
//           },
//         }));
//         setCurrentPosition(false);
//         //check type because resposeActions contains a string at index 0.
//         if (typeof responseActions[lastUpdated + 1] === "function") {
//           (
//             responseActions[lastUpdated + 1] as (
//               userResponseToLastQuestion: string
//             ) => void
//           )(option.content);
//         }
//       } else {
//         console.log("on click not responses ran");
//         setCurrentPosition(false);
//         if ("action" in option && typeof option.action === "function") {
//           option.action();
//         }
//       }
//     },
//     [
//       stream,
//       responseActions,
//       lastUpdated,
//       setCurrentPosition,
//       payload.category,
//       setState,
//     ]
//   );

//   const buttons = useMemo(() => {
//     return currentOptions.map((option) => (
//       <button
//         key={option.id}
//         className="pointer rounded-lg border-2 border-blue-400 bg-white px-4 py-2 text-gray-800 drop-shadow-lg hover:border-blue-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 active:drop-shadow-sm"
//         onClick={() => handleClick(option)}
//       >
//         {option.content}
//       </button>
//     ));
//   }, [currentOptions, handleClick]);

//   return (
//     <div
//       className={`${
//         currentPosition ? "flex" : "hidden"
//       } mt-6 flex-wrap justify-end gap-4 self-end`}
//     >
//       {buttons}
//     </div>
//   );
// }
