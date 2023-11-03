import React from "react";
import { createClientMessage } from "react-chatbot-kit";
import { goAhead, initialAssessmentMessages } from "./messages";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  ////////////////////////////////////////////////////////////////////////
  const handleGoAhead = () => {
    const userMessage = createClientMessage("I'm ready, let's go ahead");
    const botMessages = goAhead;

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, ...botMessages],
    }));
  };
  ////////////////////////////////////////////////////////////////////////

  const handleNoGoAhead = () => {
    const userMessage = createClientMessage("I don't want to do this now");
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

  const handleTellMeAboutConfidentiality = () => {
    const userMessage = createClientMessage(
      "Tell me more about confidentiality"
    );
    const botMessage = createChatBotMessage(
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
    );

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, userMessage, botMessage],
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
      "Sounds like you may be struggling."
    );
    const botMessage2 = createChatBotMessage(
      `You seem to be feeling ${profileString}.`,
      {
        delay: 1000,
      }
    );
    const botMessage3 = createChatBotMessage(
      "I would like to ask you some more questions before I make any suggestions.",
      {
        delay: 2000,
      }
    );
    const botMessage4 = createChatBotMessage("Is that okay?", {
      delay: 3000,
      // widget: "ResponseOptions",
    });

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
            handleNotEngaged,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
