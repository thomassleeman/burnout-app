import React from "react";
import { createClientMessage } from "react-chatbot-kit";
import {
  goAhead,
  noGoAhead,
  tellMeAboutConfidentiality,
  initialAssessmentMessages,
  secondAssessmentFourToSevenMessages,
  secondAssessmentCycleMessages,
  updateMessages,
} from "./messages";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  ////////////////////////////////////////////////////////////////////////
  const handleGoAhead = () => {
    const messages = goAhead;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...messages],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleNoGoAhead = () => {
    const messages = noGoAhead;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...messages],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleTellMeAboutConfidentiality = () => {
    const messages = tellMeAboutConfidentiality;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...messages],
    }));
  };

  ////////////////////////////////////////////////////////////////////////
  ///////////////////////INITIAL ASSESSMENT CYCLE/////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionOne = () => {
    const userMessage = createClientMessage("Got it, let's start.");
    const botMessage = initialAssessmentMessages.exhaustionOne.intro;
    const botMessage2 = initialAssessmentMessages.exhaustionOne.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 1,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionTwo = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = initialAssessmentMessages.exhaustionTwo.intro;
    const botMessage2 = initialAssessmentMessages.exhaustionTwo.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 2,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionThree = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = initialAssessmentMessages.detachmentOne.intro;
    const botMessage2 = initialAssessmentMessages.detachmentOne.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 3,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionFour = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = initialAssessmentMessages.detachmentTwo.intro;
    const botMessage2 = initialAssessmentMessages.detachmentTwo.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 4,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionFive = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = initialAssessmentMessages.emotionalImparementOne.intro;
    const botMessage2 = initialAssessmentMessages.emotionalImparementOne.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 5,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionSix = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = initialAssessmentMessages.emotionalImparementTwo.intro;
    const botMessage2 = initialAssessmentMessages.emotionalImparementTwo.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 6,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionSeven = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = initialAssessmentMessages.cognativeImparementOne.intro;
    const botMessage2 = initialAssessmentMessages.cognativeImparementOne.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 7,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleQuestionEight = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = initialAssessmentMessages.cognativeImparementTwo.intro;
    const botMessage2 = initialAssessmentMessages.cognativeImparementTwo.prompt;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      lastUpdated: 8,
    }));
  };
  ////////////////////////////////////////////////////////////////////////
  const handleEndOfInitialAssessment = (userResponseToLastQuestion) => {
    const userMessage = createClientMessage(userResponseToLastQuestion);
    const botMessage = createChatBotMessage(
      "Thanks for taking the time to answer those questions..."
    );
    const botMessage2 = createChatBotMessage(
      "Let me take a moment to review your answers...",
      {
        delay: 2000,
        widget: "InitialAssessmentHandler",
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage, botMessage2],
      // lastUpdated: 9,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleEngaged = () => {
    const botMessage = createChatBotMessage(
      "Wow! Sounds like you are doing really well."
    );
    const botMessage2 = createChatBotMessage(
      "I’m not seeing any areas that you are struggling in, but I encourage you to check back in regularly.",
      {
        delay: 1000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "You know, you can do the assessment as many times as you want and track your progress.",
      {
        delay: 2000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "Its important because sometimes its hard to know how stressed we are unless we pause and take stock.",
      {
        delay: 3000,
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleNotEngaged = (profileString) => {
    const botMessage = createChatBotMessage(
      `You seem to be feeling ${profileString}.`,
      {
        delay: 1000,
      }
    );
    const botMessage2 = createChatBotMessage(
      "It's understandable that you feel that way. Pressures at work tend to bring about these kinds of effects.",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "I would like to ask you some more questions before I make any suggestions. Is that okay?",
      {
        delay: 3000,
        widget: "ResponseOptions",
        payload: {
          stream: "yesOrNo",
        },
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage, botMessage2, botMessage3],
      profileString: profileString,
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleNotEngagedNoGoAhead = () => {
    const userMessage = createClientMessage("No");
    const botMessage = createChatBotMessage(
      "No problem. It's important to check in with yourself regularly just to see how you’re doing. Come back any time if you want to check in and we will take it from there.",
      {
        delay: 0,
        widget: "LinkButton",
        payload: { content: "Go to Dashboard", href: "/dashboard" },
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleBeginCyclingThroughProfilesToDiscuss = (profileStringArray) => {
    const numberOfProfiles = profileStringArray.length;
    const userMessage = createClientMessage("Yes");

    const botMessage1 = createChatBotMessage(
      `Which of the ${numberOfProfiles} feelings below would you like to discuss?`,
      {
        delay: 1000,
        widget: "CycleThroughProfilesToDiscuss",
      }
    );

    const botMessage2 = createChatBotMessage(
      `Ok, let's talk about feeling ${profileStringArray[0]} at work`,
      {
        delay: 1000,
        widget: "responseOption",
        payload: { stream: profileStringArray[0] },
      }
    );

    setState((prevState) => {
      let newMessages = [...prevState.messages, userMessage];

      const index = newMessages.lastIndexOf(userMessage) + 1;

      if (numberOfProfiles > 1) {
        newMessages.splice(index, 0, botMessage1);
      } else {
        newMessages.splice(index, 0, botMessage2);
      }

      return {
        ...prevState,
        messages: newMessages,
        profileArray: profileStringArray,
      };
    });
  };
  ////////////////////////////////////////////////////////////////////////

  const handleCycleThroughProfilesToDiscuss = (profileStringArray) => {
    const numberOfProfiles = profileStringArray.length;
    const userMessage = createClientMessage("Yes");

    const botMessageA = createChatBotMessage(
      `Which of the ${numberOfProfiles} feelings below would you like to discuss?`,
      {
        delay: 1000,
        widget: "CycleThroughProfilesToDiscuss",
      }
    );

    const botMessageB = createChatBotMessage(
      `Ok, let's talk about feeling ${profileStringArray[0]} at work`,
      {
        delay: 1000,
        widget: "ProceedToSolitaryProfile",
        payload: { solitaryProfileString: profileString },
      }
    );

    setState((prevState) => ({
      ...prevState,
      profileArray: profileStringArray,
      messages: [...prevState.messages, userMessage, botMessage],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleChooseProfileToDiscuss = () => {
    const userMessage = createClientMessage("Yes");
    const botMessage = createChatBotMessage(
      "Which of the feelings that I mentioned above would you like to discuss first?",
      {
        delay: 1000,
        widget: "ResponseOptions",
        payload: {
          stream: "chooseProfileToDiscuss",
        },
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  // const handleChooseSubsequentProfileToDiscuss = () => {
  //   const userMessage = createClientMessage("Yes");
  //   const botMessage = createChatBotMessage(
  //     "Which of the other feelings that I mentioned earlier would you now like to discuss?",
  //     {
  //       delay: 1000,
  //       widget: "ResponseOptions",
  //       payload: {
  //         stream: "chooseProfileToDiscuss",
  //       },
  //     }
  //   );

  //   setState((prevState) => ({
  //     ...prevState,
  //     messages: [...prevState.messages, userMessage, botMessage],
  //   }));
  // };
  ////////////////////////////////////////////////////////////////////////

  // const handleSolitaryProfile = (profileString) => {
  //   const userMessage = createClientMessage("Yes");
  //   const botMessage = createChatBotMessage(
  //     `Ok, let's talk about feeling ${profileString} at work`,
  //     {
  //       delay: 1000,
  //       widget: "ProceedToSolitaryProfile",
  //       payload: { solitaryProfileString: profileString },
  //     }
  //   );

  //   setState((prevState) => ({
  //     ...prevState,
  //     messages: [...prevState.messages, userMessage, botMessage],
  //   }));
  // };
  // ////////////////////////////////////////////////////////////////////////

  const handleSolitaryProfile = (profileStringArray) => {
    const userMessage = createClientMessage("Yes");
    const botMessage = createChatBotMessage(
      `Ok, let's talk about feeling ${profileString} at work`,
      {
        delay: 1000,
        widget: "ProceedToSolitaryProfile",
        payload: { solitaryProfileString: profileString },
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  //Helper function for this section.
  const removeItemFromArray = (array, valueToRemove) => {
    const index = array.indexOf(valueToRemove);
    let newArray = [...array];
    if (index > -1) {
      newArray = array.toSpliced(index, 1);
    }
    return newArray;
  };

  const handleExhausted = (solitary) => {
    const userMessage = createClientMessage("exhausted");
    const botMessage = createChatBotMessage("On a scale of 1 - 10,", {
      delay: 1000,
    });
    const botMessage2 = createChatBotMessage(
      "1 being the most depleted you have ever felt...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 10 being the most energised you have ever felt,",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "where would you put your energy most days over the last 2 weeks?",
      {
        delay: 4000,
        widget: "ResponseOptions",
        payload: {
          stream: "exhausted",
        },
      }
    );

    setState((prevState) => {
      let newMessages = [
        ...prevState.messages,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ];

      if (!solitary) {
        newMessages.splice(newMessages.lastIndexOf(botMessage), 0, userMessage);
      }

      const newProfileArray = removeItemFromArray(
        prevState.profileArray,
        "exhausted"
      );

      return {
        ...prevState,
        messages: newMessages,
        profileArray: newProfileArray,
      };
    });
  };
  ////////////////////////////////////////////////////////////////////////
  //Exerimenting with detached.

  const handleDetached = (solitary) => {
    const userMessage = createClientMessage("detached");
    const botMessage = createChatBotMessage("On a scale of 1 - 10,", {
      delay: 1000,
    });
    const botMessage2 = createChatBotMessage(
      " 1 being the most most indifferent you have ever felt...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 10 being the most invested and engaged you have ever felt,",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "where would you put your attitude towards your work over the last 2 weeks?",
      {
        delay: 4000,
        widget: "ResponseOptions",
        payload: {
          stream: "detached",
        },
      }
    );

    setState((prevState) => {
      let newMessages = [
        ...prevState.messages,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ];

      if (!solitary) {
        newMessages.splice(newMessages.lastIndexOf(botMessage), 0, userMessage);
      }

      const newProfileArray = removeItemFromArray(
        prevState.profileArray,
        "detached"
      );

      return {
        ...prevState,
        messages: newMessages,
        profileArray: newProfileArray,
      };
    });
  };
  ////////////////////////////////////////////////////////////////////////
  const handleEmotional = (solitary) => {
    const userMessage = createClientMessage("emotional");
    const botMessage = createChatBotMessage("On a scale of 1 - 10,", {
      delay: 1000,
    });
    const botMessage2 = createChatBotMessage(
      " 1 being the most agitated and tense you have ever felt...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 10 being the most calm and stable you have ever felt,",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "where would you put your emotional resilience over the last 2 weeks?",
      {
        delay: 4000,
        widget: "ResponseOptions",
        payload: {
          stream: "emotional",
        },
      }
    );

    setState((prevState) => {
      let newMessages = [
        ...prevState.messages,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ];

      if (!solitary) {
        newMessages.splice(newMessages.lastIndexOf(botMessage), 0, userMessage);
      }

      const newProfileArray = removeItemFromArray(
        prevState.profileArray,
        "emotional"
      );

      return {
        ...prevState,
        messages: newMessages,
        profileArray: newProfileArray,
      };
    });
  };
  ////////////////////////////////////////////////////////////////////////
  const handleDistracted = (solitary) => {
    const userMessage = createClientMessage("distracted");
    const botMessage = createChatBotMessage("On a scale of 1 - 10,", {
      delay: 1000,
    });
    const botMessage2 = createChatBotMessage(
      "1 being the most most scattered and distracted you have ever been...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 10 being the most focused and engaged you have ever been,",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "where would you put your concentration at work over the last 2 weeks?",
      {
        delay: 4000,
        widget: "ResponseOptions",
        payload: {
          stream: "distracted",
        },
      }
    );

    setState((prevState) => {
      let newMessages = [
        ...prevState.messages,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ];

      if (!solitary) {
        newMessages.splice(newMessages.lastIndexOf(botMessage), 0, userMessage);
      }

      const newProfileArray = removeItemFromArray(
        prevState.profileArray,
        "distracted"
      );

      return {
        ...prevState,
        messages: newMessages,
        profileArray: newProfileArray,
      };
    });
  };
  ////////////////////////////////////////////////////////////////////////

  const updateMessages = (
    prevState,
    userMessage,
    botMessages,
    secondAssessmentCycleMessages,
    profileStringArray
  ) => {
    let newMessages = [...prevState.messages, userMessage, ...botMessages];

    const index = newMessages.length + 1;

    const lastProfile = profileStringArray.length === 1;
    const noMoreProfiles = profileStringArray.length === 0;

    if (lastProfile) {
      newMessages.splice(
        index,
        0,
        secondAssessmentCycleMessages.botMessageB(profileStringArray)
      );
    } else if (noMoreProfiles) {
      newMessages.splice(
        index,
        0,
        secondAssessmentCycleMessages.botMessageC1()
      );
      newMessages.splice(
        index + 1,
        0,
        secondAssessmentCycleMessages.botMessageC2()
      );
    } else {
      newMessages.splice(index, 0, secondAssessmentCycleMessages.botMessageA());
    }

    console.log(
      "updateMessages log:",
      "botMessages: ",
      botMessages,
      "newMessages: ",
      newMessages
    );

    return {
      ...prevState,
      messages: newMessages,
      profileArray: profileStringArray,
    };
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  const handleSecondAssessmentOneToThree = (
    profile,
    userRatingString,
    profileStringArray
  ) => {
    const lastProfile = profileStringArray.length === 1;
    const noMoreProfiles = profileStringArray.length === 0;
    const userMessage = createClientMessage(userRatingString);
    const botMessage = createChatBotMessage(
      "Sounds like you are really struggling. I imagine it's been difficult for you."
    );
    const botMessage2 = createChatBotMessage(
      "I think we have some quick advice that might help you. Take a look below.",
      {
        delay: 1000,
        widget: "LinkButton",
        payload: {
          profile: profile,
          content: profile + " article",
          href: "/articles",
          target: "_blank",
        },
      }
    );
    const botMessageA = createChatBotMessage(
      "Which of the other feelings that I mentioned earlier would you now like to discuss?",
      {
        delay: 3000,
        widget: "CycleThroughProfilesToDiscuss",
      }
    );

    const botMessageB = createChatBotMessage(
      `Ok, let's talk about feeling ${profileStringArray[0]} at work`,
      {
        delay: 3000,
        widget: "ProceedToSolitaryProfile",
        payload: { solitaryProfileString: profileStringArray[0] },
      }
    );

    const botMessageC1 = createChatBotMessage(
      "Thanks for taking the time to answer these questions. I hope you have found this to be helpful.",
      { delay: 3000 }
    );

    const botMessageC2 = createChatBotMessage(
      "You can check back any time to do this exercise again.",
      {
        delay: 4000,
        widget: "LinkButton",
        payload: { content: "Return to Dashboard", href: "/dashboard" },
      }
    );

    setState((prevState) => {
      let newMessages = [
        ...prevState.messages,
        userMessage,
        botMessage,
        botMessage2,
      ];

      const index = newMessages.lastIndexOf(botMessage2) + 1;

      if (lastProfile) {
        newMessages.splice(index, 0, botMessageB);
      } else if (noMoreProfiles) {
        newMessages.splice(index, 0, botMessageC1);
        newMessages.splice(index + 1, 0, botMessageC2);
      } else {
        newMessages.splice(index, 0, botMessageA);
      }

      return {
        ...prevState,
        messages: newMessages,
        profileArray: profileStringArray,
      };
    });
  };
  ////////////////////////////////////////////////////////////////////////

  const handleSecondAssessmentFourToSeven = (
    profile,
    userRatingString,
    profileStringArray
  ) => {
    const userMessage = createClientMessage(userRatingString);

    let botMessages;
    switch (profile) {
      case "exhausted":
        botMessages = secondAssessmentFourToSevenMessages.exhaustion;
        break;
      case "detached":
        botMessages = secondAssessmentFourToSevenMessages.detached;
        break;
      case "emotional":
        botMessages = secondAssessmentFourToSevenMessages.emotional;
        break;
      case "distracted":
        botMessages = secondAssessmentFourToSevenMessages.distracted;
        break;
    }

    setState((prevState) =>
      updateMessages(
        prevState,
        userMessage,
        botMessages,
        secondAssessmentCycleMessages,
        profileStringArray
      )
    );
  };
  ////////////////////////////////////////////////////////////////////////
  const handleSecondAssessmentFourToSevenExhausted = (userRatingString) => {
    const userMessage = createClientMessage(userRatingString);
    const botMessage = createChatBotMessage(
      "Sounds like you’re lacking in energy..",
      {
        delay: 1000,
      }
    );
    const botMessage2 = createChatBotMessage(
      "Energy levels are effected by many things from deadlines and pace of work but also by stress and anxiety..",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "I think we have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        userMessage,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };
  ////////////////////////////////////////////////////////////////////////
  const handleSecondAssessmentFourToSevenDetached = (userRatingString) => {
    const userMessage = createClientMessage(userRatingString);
    const botMessage = createChatBotMessage(
      "When you are not invested in your work even the smallest of tasks can feel like a grind.",
      {
        delay: 1000,
      }
    );
    const botMessage2 = createChatBotMessage(
      "Being engaged in your work is an important factor in work satisfaction and well-being.",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "I think we have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        userMessage,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };
  ////////////////////////////////////////////////////////////////////////
  const handleSecondAssessmentFourToSevenEmotional = (userRatingString) => {
    const userMessage = createClientMessage(userRatingString);
    const botMessage = createChatBotMessage(
      "Sounds like you’re feeling a little tense and agitated.",
      {
        delay: 1000,
      }
    );
    const botMessage2 = createChatBotMessage(
      "Continually feeling this way can be a sign of mental exhaustion, but its not about suppressing feelings, it's important to acknowledge them...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "I think we have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 4000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        userMessage,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };
  ////////////////////////////////////////////////////////////////////////
  const handleSecondAssessmentFourToSevenDistracted = (userRatingString) => {
    const userMessage = createClientMessage(userRatingString);
    const botMessage = createChatBotMessage(
      "When you are struggling to focus, think clearly or remember things, it's hard to get anything done.",
      {
        delay: 1000,
      }
    );
    const botMessage2 = createChatBotMessage(
      "Poor focus can have a number of causes but there are plenty of things you can do to improve it.",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "I think I have some advice that might be helpful for you so I’ve added some relevant articles into your recommended reading list...",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
      "Go through them in your own time and come back to me any time when you are ready to check back in.",
      {
        delay: 4000,
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        userMessage,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleSecondAssessmentEightToTen = (profile, userRatingString) => {
    const userMessage = createClientMessage(userRatingString);
    const botMessage = createChatBotMessage(
      "Sounds like you’re doing really well",
      {
        delay: 1000,
      }
    );
    const botMessage2 = createChatBotMessage(
      "It doesn’t seem now that you need any help in this area but I encourage you to check back any time and we will see how you're doing.",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "But I encourage you to check back any time and we will see how your doing",
      {
        delay: 3000,
      }
    );
    const botMessage4 = createChatBotMessage(
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
    );

    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        userMessage,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleGoAhead,
            handleNoGoAhead,
            handleTellMeAboutConfidentiality,
            handleQuestionOne,
            handleQuestionTwo,
            handleQuestionThree,
            handleQuestionFour,
            handleQuestionFive,
            handleQuestionSix,
            handleQuestionSeven,
            handleQuestionEight,
            handleEndOfInitialAssessment,
            handleEngaged,
            handleNotEngagedNoGoAhead,
            handleNotEngaged,
            handleChooseProfileToDiscuss,
            handleSolitaryProfile,
            handleExhausted,
            handleDetached,
            handleEmotional,
            handleDistracted,
            handleSecondAssessmentOneToThree,
            handleSecondAssessmentFourToSeven,
            handleSecondAssessmentFourToSevenExhausted,
            handleSecondAssessmentFourToSevenDetached,
            handleSecondAssessmentFourToSevenEmotional,
            handleSecondAssessmentFourToSevenDistracted,
            handleSecondAssessmentEightToTen,
            handleBeginCyclingThroughProfilesToDiscuss,
            handleCycleThroughProfilesToDiscuss,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
