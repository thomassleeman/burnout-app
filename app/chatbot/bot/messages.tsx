import {
  createChatBotMessage,
  createCustomMessage,
  createClientMessage,
} from "react-chatbot-kit";

import { ProfileString, ProfileStringArray } from "@/types/chatbot";

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
  createClientMessage("I'm ready, let's go ahead", {}),
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

export const noGoAhead = [
  createClientMessage("I don't want to do this now", {}),
  createChatBotMessage(
    "No problem. It's important to check in with yourself regularly just to see how you’re doing. Come back any time if you want to check in and we will take it from there.",
    {
      delay: 0,
      widget: "LinkButton",
      payload: { content: "Go to Dashboard", href: "/dashboard" },
    }
  ),
];

export const tellMeAboutConfidentiality = [
  createClientMessage("Tell me more about confidentiality", {}),
  createChatBotMessage(
    "Here is an article from our information section that discusses these issues in much greater detail.",
    {
      delay: 0,
      widget: "LinkButton",
      payload: {
        content: "Go to confidentiality article",
        href: "/articles/confidentiality",
        target: "_blank",
      },
    }
  ),
  createChatBotMessage("Shall we proceed?", {
    delay: 1000,
    widget: "ResponseOptions",
    payload: {
      stream: "checkToProceedAfterArticle",
    },
  }),
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
          category: "emotionalImparement",
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
          category: "cognitiveImparement",
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
          category: "cognitiveImparement",
        },
      }
    ),
  },
};

export const secondAssessmentOneToThreeMessages = (profile: ProfileString) => {
  return [
    createChatBotMessage(
      `Sounds like you are really struggling with feeling ${profile}. I imagine it's been difficult for you.`,
      {
        delay: 1000,
      }
    ),
    createChatBotMessage(
      "I think we have some quick advice that might help you. Take a look below.",
      {
        delay: 2000,
        widget: "LinkButton",
        payload: {
          profile: profile,
          content: profile + " article",
          href: "/articles",
          target: "_blank",
        },
      }
    ),
  ];
};

export const secondAssessmentFourToSevenMessages = {
  exhaustion: [
    createChatBotMessage("Sounds like you’re lacking in energy..", {
      delay: 1000,
    }),
    createChatBotMessage(
      "Energy levels are effected by many things from deadlines and pace of work but also by stress and anxiety..",
      {
        delay: 2000,
      }
    ),
    createChatBotMessage(
      "I think we have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 3000,
      }
    ),
    createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    ),
  ],
  detached: [
    createChatBotMessage(
      "When you are not invested in your work even the smallest of tasks can feel like a grind.",
      {
        delay: 1000,
      }
    ),
    createChatBotMessage(
      "Being engaged in your work is an important factor in work satisfaction and well-being.",
      {
        delay: 2000,
      }
    ),
    createChatBotMessage(
      "I think we have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 3000,
      }
    ),
    createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    ),
  ],
  emotional: [
    createChatBotMessage(
      "Sounds like you’re feeling a little tense and agitated.",
      {
        delay: 1000,
      }
    ),
    createChatBotMessage(
      "Continually feeling this way can be a sign of mental exhaustion, but its not about suppressing feelings, it's important to acknowledge them...",
      {
        delay: 2000,
      }
    ),
    createChatBotMessage(
      "I think we have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 3000,
      }
    ),
    createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    ),
  ],
  distracted: [
    createChatBotMessage(
      "When you are struggling to focus, think clearly or remember things, it's hard to get anything done.",
      {
        delay: 1000,
      }
    ),
    createChatBotMessage(
      "Poor focus can have a number of causes but there are plenty of things you can do to improve it.",
      {
        delay: 2000,
      }
    ),
    createChatBotMessage(
      "I think I have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 3000,
      }
    ),
    createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    ),
  ],
};

export const secondAssessmentEightToTenMessages = (profile: ProfileString) => {
  return [
    createChatBotMessage("Sounds like you’re doing really well", {
      delay: 1000,
    }),
    createChatBotMessage(
      `It now doesn’t seem that you need any help with feeling ${profile}, but I encourage you to check back any time to see how you're doing.`,
      {
        delay: 2000,
      }
    ),
    createChatBotMessage(
      "Even though you are doing well you may be interested in these articles.",
      {
        delay: 4000,
        widget: "LinkButton",
        payload: {
          profile: profile,
          content: profile + " article",
          href: "/articles",
          target: "_blank",
        },
      }
    ),
  ];
};

export const secondAssessmentCycleMessages = {
  botMessageA: () =>
    createChatBotMessage(
      "Which of the other feelings that I mentioned earlier would you now like to discuss?",
      {
        delay: 3000,
        widget: "CycleThroughProfilesToDiscuss",
      }
    ),
  botMessageB: (profileStringArray: ProfileStringArray) =>
    createChatBotMessage(
      `Ok, let's talk about feeling ${profileStringArray[0]} at work`,
      {
        delay: 3000,
        widget: "ProceedToSolitaryProfile",
        payload: { solitaryProfileString: profileStringArray[0] },
      }
    ),
  botMessageC1: () =>
    createChatBotMessage(
      "Thanks for taking the time to answer these questions. I hope you have found this to be helpful.",
      { delay: 3000 }
    ),
  botMessageC2: () =>
    createChatBotMessage(
      "You can check back any time to do this exercise again.",
      {
        delay: 4000,
        widget: "UpdateDbAndReturnToDashButton",
      }
    ),
};

// export function updateMessages(
//   prevState,
//   userMessage,
//   secondAssessmentFourToSevenMessages,
//   secondAssessmentCycleMessages,
//   lastProfile,
//   noMoreProfiles,
//   profileStringArray
// ) {
//   let newMessages = [
//     ...prevState.messages,
//     userMessage,
//     botMessage,
//     botMessage2,
//   ];

//   const index = newMessages.lastIndexOf(botMessage2) + 1;

//   if (lastProfile) {
//     newMessages.splice(index, 0, botMessageB);
//   } else if (noMoreProfiles) {
//     newMessages.splice(index, 0, botMessageC1);
//     newMessages.splice(index + 1, 0, botMessageC2);
//   } else {
//     newMessages.splice(index, 0, botMessageA);
//   }

//   return {
//     ...prevState,
//     messages: newMessages,
//     profileArray: profileStringArray,
//   };
// }
