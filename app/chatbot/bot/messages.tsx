import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";

export const initialMessages = [
  createChatBotMessage("Hello and welcome!", {}),
  createChatBotMessage("Let’s check in and see how you are doing...", {
    delay: 1000,
  }),
  createChatBotMessage(
    "I'd like to ask you some questions. This will take just a few minutes and will allow me to guide you towards content that I believe would be helpful.",
    { delay: 2000 }
  ),
  createChatBotMessage("Your answers here are 100% confidential.", {
    delay: 3000,
    widget: "ResponseOptions",
    payload: { stream: "checkToProceed" },
  }),
];

export const goAhead = [
  createChatBotMessage("Great! Let’s get started.", {}),
  createChatBotMessage(
    "So, I'm going to give you a few statements that I would like you to consider...",
    {
      delay: 1000,
    }
  ),
  createChatBotMessage(
    "I want you to think only about the last 2 weeks in work...",
    {
      delay: 2000,
    }
  ),
  createChatBotMessage(
    "After each statement a list of options will appear to allow you to say how often you have felt like the statement is true for you.",
    {
      delay: 3000,
      widget: "ResponseOptions",
      payload: { stream: "checkToStart" },
    }
  ),
];

export const initialAssessmentMessages = {
  exhaustionOne: {
    intro: createChatBotMessage(
      "Great, so here's the first statement. Remember, you're just thinking about the last two weeks...",
      {
        delay: 1000,
      }
    ),
    prompt: createChatBotMessage(
      '"I have struggled to find the energy each day to carry out my job."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "exhaustion",
        },
      }
    ),
  },
  exhaustionTwo: {
    intro: createChatBotMessage("Thanks. The next one is...", {
      delay: 1000,
    }),
    prompt: createChatBotMessage(
      '"I have not been able to keep up with the pace of my work while still having time to rest and recover."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "exhaustion",
        },
      }
    ),
  },
  detachmentOne: {
    intro: createChatBotMessage("Ok, how about this one..?", {
      delay: 1000,
    }),
    prompt: createChatBotMessage(
      '"I have felt unenthusiastic and disengaged from my day-to-day work."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "detachment",
        },
      }
    ),
  },
  detachmentTwo: {
    intro: createChatBotMessage("Thanks. The next one is...", {
      delay: 1000,
    }),
    prompt: createChatBotMessage(
      '"I have felt that my work means little to others."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "detachment",
        },
      }
    ),
  },
  emotionalImparementOne: {
    intro: createChatBotMessage("Thanks. Here's another one to consider...", {
      delay: 1000,
    }),
    prompt: createChatBotMessage(
      '"At times I have been unable to control my emotions."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "emotionalImparement",
        },
      }
    ),
  },
  emotionalImparementTwo: {
    intro: createChatBotMessage("Ok, Now think about this one...", {
      delay: 1000,
    }),
    prompt: createChatBotMessage(
      '"When negative things happen I have not been able to manage my reactions."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "cognativeImparement",
        },
      }
    ),
  },
  cognativeImparementOne: {
    intro: createChatBotMessage("Thanks. Just two more to go...", {
      delay: 1000,
    }),
    prompt: createChatBotMessage(
      '"While at work I have struggled to concentrate on my day-to-day tasks."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "cognativeImparement",
        },
      }
    ),
  },
  cognativeImparementTwo: {
    intro: createChatBotMessage("Ok, and the last one...", {
      delay: 1000,
    }),
    prompt: createChatBotMessage(
      '"While at work I have not been able to focus without distraction."',
      {
        delay: 2000,
        widget: "ResponseOptions",
        payload: {
          stream: "responses",
          category: "cognativeImparement",
        },
      }
    ),
  },
};
