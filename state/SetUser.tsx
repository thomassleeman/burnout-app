"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "@/state/store";
import { auth } from "@/firebase/auth/appConfig";
import { initUserListener } from "./userListener";

function SetUser() {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    let unsubscribeUserListener: (() => void) | null = null;

    // Listen to the authentication state
    const unsubscribeAuth = auth.onIdTokenChanged(async (user) => {
      //   console.log("setUser User: ", user);
      if (user) {
        try {
          // Initialize the Firestore user listener
          if (unsubscribeUserListener) {
            unsubscribeUserListener(); // Clean up previous listener
          }
          unsubscribeUserListener = initUserListener(user.uid, setUser);
        } catch (err) {
          console.error("Error initializing user listener:", err);
          setUser(null);
        }
      } else {
        // User is signed out
        if (unsubscribeUserListener) {
          unsubscribeUserListener(); // Clean up listener
          unsubscribeUserListener = null;
        }
        setUser(null);
      }
    });

    // Cleanup the listeners on component unmount
    return () => {
      unsubscribeAuth();
      if (unsubscribeUserListener) {
        unsubscribeUserListener();
      }
    };
  }, [setUser]);

  return null;
}

export default SetUser;
