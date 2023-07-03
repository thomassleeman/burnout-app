'use client';
import ChatBot from 'react-simple-chatbot';
import { botStyles } from '@chatbot/lib/botStyles';
// import { Router, useRouter } from 'next/router';

const ChatInterface = ({ steps }) => {
  //   const router = useRouter();

  const handleEnd = (results) => {
    console.log(results);
    const allValues = results.renderedSteps;
    const justAssessmentValues = allValues.filter((value) =>
      value.id.endsWith('_R')
    );

    console.log(justAssessmentValues);
    let newRating = 0;
    for (let i = 0; i < justAssessmentValues.length; i++) {
      newRating = newRating + justAssessmentValues[i].value;
    }

    // console.log(newRating, Router);
    // if (router.pathname === '/') {
    //   router.push('/secondaryChatbot');
    // }
  };

  return (
    <ChatBot
      className="min-h-full min-w-full"
      steps={steps}
      {...botStyles}
      handleEnd={handleEnd}
    />
  );
};

export default ChatInterface;
