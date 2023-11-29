"use client";
import { useEffect, useRef } from "react";

import { Actions, Payload } from "@/types/chatbot";

export default function ProceedToSolitaryProfile({
  payload,
  actions,
}: {
  payload: Payload;
  actions: Actions;
}) {
  const { solitaryProfileString } = payload;
  const actionCalledRef = useRef(false);

  useEffect(() => {
    // Check if the action has already been called
    if (actionCalledRef.current) {
      return;
    }

    const actionName = `handle${
      solitaryProfileString.charAt(0).toUpperCase() +
      solitaryProfileString.slice(1)
    }`;

    const action = actions[actionName];
    const solitary = true;

    if (action) {
      action(solitary);
      // Mark the action as called
      actionCalledRef.current = true;
    }
  }, [solitaryProfileString, actions]);

  return null;
}

/* Note about this component: 
Due to the way the react-chatbot-kit package is set up, calling actions results in a state update. Since actions is a dependency of useEffect 
here, any change to actions triggers the effect again, causing an infinite loop. I have used useRef to track whether actions has been called. 
If it has the useEffect returns without calling it again.*/
