// atoms/userIsAdminAtom.js
import { atom } from "jotai";

export const isAdminAtom = atom(false);

export const showSearchResultsAtom = atom(false);

export const anyErrorAtom = atom({ message: "" });

export const usernameAtom = atom("");
export const userIDAtom = atom("");

export const initialChatResultsAtom = atom({
  exhaustion: 0,
  inefficacy: 0,
  disengaged: 0,
  engaged: false,
  burntout: false,
});

// term: "Social disappointment and partner presence affect long-tailed macaque refusal behaviour in an ‘inequity aversion’ experiment",
