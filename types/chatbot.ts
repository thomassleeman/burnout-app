import { ReactNode } from "react";

export type Actions = {
  [key: string]: (...args: any[]) => void;
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
  handleEndOfInitialAssessment: (userResponseToLastQuestion: string) => void;
  handleEngaged: () => void;
  handleNotEngagedNoGoAhead: () => void;
  handleNotEngaged: (
    profileString: string,
    userBurnoutProfiles: BurnoutProfiles
  ) => void;
  handleChooseProfileToDiscuss: () => void;
  handleSolitaryProfile: (profileString: string) => void;
  handleExhausted: (solitary?: boolean) => void;
  handleDetached: (solitary?: boolean) => void;
  handleEmotional: (solitary?: boolean) => void;
  handleDistracted: (solitary?: boolean) => void;
  handleSecondAssessmentOneToThree: (
    profile: string,
    userRatingString: string,
    profileStringArray: ProfileStringArray
  ) => void;
  handleSecondAssessmentFourToSeven: (
    profile: string,
    userRatingString: string,
    profileStringArray: ProfileStringArray
  ) => void;
  handleSecondAssessmentEightToTen: (
    profile: string,
    userRatingString: string,
    profileStringArray: ProfileStringArray
  ) => void;
};

export type BurnoutProfiles = {
  engaged: boolean;
  overExtended: (string | number | boolean)[];
  detached: (string | number | boolean)[];
  emotionallyImpaired: (string | number | boolean)[];
  cognitivelyImpaired: (string | number | boolean)[];
  burntOut: boolean;
};

export type SimpleActionButtonWidget = {
  id: number;
  content: string;
  action?: (userResponseToLastQuestion?: string) => void;
};

export type OneToTenAssessmentButtonWidget = {
  id: number;
  content: string;
  value: number;
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
  profileString: string;
  solitaryProfileString: string;
};

export type LinkButtonPayload = {
  profile?: string;
  content: string;
  href: string;
  target: string;
};

export type InitialAssessmentScores = {
  exhaustion: number;
  detachment: number;
  emotionalImpairment: number;
  cognitiveImpairment: number;
};

export type UserResponseToLastQuestion = string;
export type ProfileString = string;
export type ProfileStringArray = String[];

export type AssessmentScores = {
  exhaustion: number;
  detachment: number;
  emotionalImpairment: number;
  cognitiveImpairment: number;
};
