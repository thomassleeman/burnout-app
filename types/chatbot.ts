import { ReactNode } from "react";

export type Actions = {
  handleGoAhead: () => void;
  handleNoGoAhead: () => void;
  handleTellMeAboutConfidentiality: () => void;
  handleQuestionOne: (userResponseToLastQuestion?: string) => void;
  handleQuestionTwo: (userResponseToLastQuestion: string) => void;
  handleQuestionThree: (userResponseToLastQuestion: string) => void;
  handleQuestionFour: (userResponseToLastQuestion: string) => void;
  handleQuestionFive: (userResponseToLastQuestion: string) => void;
  handleQuestionSix: (userResponseToLastQuestion: string) => void;
  handleQuestionSeven: (userResponseToLastQuestion: string) => void;
  handleQuestionEight: (userResponseToLastQuestion: string) => void;
  // Add more functions here...
};

export type SimpleActionButtonWidget = {
  id: number;
  content: string;
  action?: (userResponseToLastQuestion?: string) => void;
};

export type AssessmentButtonWidget = {
  id: number;
  content: string;
  score: number;
  category: string;
};

export type Payload = {
  stream: string;
  category: string;
};

export type LinkButtonPayload = {
  content: string;
  href: string;
  target: string;
};

// export type Message = {
//   id: string;
//   message: string;
//   trigger?: string;
//   end?: boolean;
// };

// export type Options = {
//   id: string;
//   options: {
//     value: number;
//     label: string;
//     trigger: string;
//   }[];
// };

// export interface Component {
//   id: string;
//   component: ReactNode;
//   trigger: string;
// }

// export type Steps = (Message | Options | Component)[];

// export interface BotRedirectProps {
//   url: string;
//   message: string;
// }

// // define results from chatbot.
// export type RenderedStep = {
//   id: string;
//   message: string;
//   value?: number;
// };

// export interface ChatResults {
//   renderedSteps: RenderedStep[];
// }
