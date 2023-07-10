import { ReactNode } from "react";

export type Message = {
  id: string;
  message: string;
  trigger?: string;
  end?: boolean;
};

export type Options = {
  id: string;
  options: {
    value: number;
    label: string;
    trigger: string;
  }[];
};

export interface Component {
  id: string;
  component: ReactNode;
  trigger: string;
}

export type Steps = (Message | Options | Component)[];

export interface BotRedirectProps {
  url: string;
  message: string;
}

// define results from chatbot.
export type RenderedStep = {
  id: string;
  message: string;
  value?: number;
};

export interface ChatResults {
  renderedSteps: RenderedStep[];
}
