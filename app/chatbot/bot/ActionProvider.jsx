import React from "react";
import { createClientMessage } from "react-chatbot-kit";
import {
  goAhead,
  noGoAhead,
  tellMeAboutConfidentiality,
  initialAssessmentMessages,
  secondAssessmentOneToThreeMessages,
  secondAssessmentFourToSevenMessages,
  secondAssessmentEightToTenMessages,
  secondAssessmentCycleMessages,
} from "./messages";

import updateDatabase from "../widgets/functions/updateDatabase";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  state,
  children,
}) => {
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
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleEngaged = () => {
    console.log("handleEngaged");
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

  const handleNotEngaged = (profileString, burnoutProfiles) => {
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
      burnoutProfiles: burnoutProfiles,
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

  ////////////////////////////////////////////////////////////////////////
  ///////////////////////SECOND ASSESSMENT CYCLE/////////////////////////
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
      "10 being the most depleted you have ever felt...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 1 being the most energised you have ever felt,",
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

  const handleDetached = (solitary) => {
    const userMessage = createClientMessage("detached");
    const botMessage = createChatBotMessage("On a scale of 1 - 10,", {
      delay: 1000,
    });
    const botMessage2 = createChatBotMessage(
      "10 being the most most indifferent you have ever felt...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 1 being the most invested and engaged you have ever felt,",
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
      " 10 being the most agitated and tense you have ever felt...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 1 being the most calm and stable you have ever felt,",
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
      "10 being the most most scattered and distracted you have ever been...",
      {
        delay: 2000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "...and 1 being the most focused and engaged you have ever been,",
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

  ////////////////////////////////////////////////////////////////////////
  // helper function for this section
  const updateMessages = (
    prevState,
    state,
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

    return {
      ...prevState,
      messages: newMessages,
      profileArray: profileStringArray,
    };
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  const updateSecondaryAssessmentScores = (
    prevState,
    profile,
    userRatingString
  ) => {
    const originalProfileNames = {
      exhausted: "exhaustion",
      detached: "detachment",
      emotional: "emotionalImparement",
      distracted: "cognitiveImparement",
    };

    // Find the key in originalProfileNames that matches the profile argument
    const originalProfileName = originalProfileNames[profile];

    // Convert userRatingString to a number
    const userRatingNumber = Number(userRatingString);

    const updatedSecondaryAssessmentScores = {
      ...prevState.secondaryAssessmentScores,
      [originalProfileName]: userRatingNumber,
    };
    console.log("secondaryAssScores: ", updatedSecondaryAssessmentScores);

    return {
      ...prevState,
      secondaryAssessmentScores: updatedSecondaryAssessmentScores,
    };
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  const handleSecondAssessmentEightToTen = (
    profile,
    userRatingString,
    profileStringArray
  ) => {
    const userMessage = createClientMessage(userRatingString);
    const botMessages = secondAssessmentOneToThreeMessages(profile);

    setState((prevState) => {
      const prevStateMessagesUpdated = updateMessages(
        prevState,
        state,
        userMessage,
        botMessages,
        secondAssessmentCycleMessages,
        profileStringArray
      );

      const newState = updateSecondaryAssessmentScores(
        prevStateMessagesUpdated,
        profile,
        userRatingString
      );

      return newState;
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

    setState((prevState) => {
      const prevStateMessagesUpdated = updateMessages(
        prevState,
        state,
        userMessage,
        botMessages,
        secondAssessmentCycleMessages,
        profileStringArray
      );

      const newState = updateSecondaryAssessmentScores(
        prevStateMessagesUpdated,
        profile,
        userRatingString
      );

      return newState;
    });
  };
  ////////////////////////////////////////////////////////////////////////

  const handleSecondAssessmentOneToThree = (
    profile,
    userRatingString,
    profileStringArray
  ) => {
    const userMessage = createClientMessage(userRatingString);
    const botMessages = secondAssessmentEightToTenMessages(profile);

    setState((prevState) => {
      const prevStateMessagesUpdated = updateMessages(
        prevState,
        state,
        userMessage,
        botMessages,
        secondAssessmentCycleMessages,
        profileStringArray
      );

      const newState = updateSecondaryAssessmentScores(
        prevStateMessagesUpdated,
        profile,
        userRatingString
      );

      return newState;
    });
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
            handleExhausted,
            handleDetached,
            handleEmotional,
            handleDistracted,
            handleSecondAssessmentOneToThree,
            handleSecondAssessmentFourToSeven,
            handleSecondAssessmentEightToTen,
            handleBeginCyclingThroughProfilesToDiscuss,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
