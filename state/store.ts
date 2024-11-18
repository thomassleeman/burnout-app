// store.ts
import { atom } from "jotai";
import { UserData } from "@/types/storeTypes"; // Ensure you have UserData type defined

// Existing atoms
export const isAdminAtom = atom(false);
export const showSearchResultsAtom = atom(false);
export const anyErrorAtom = atom({ message: "" });
export const usernameAtom = atom("");
export const userIDAtom = atom("");

// Your PlayThisType should be defined elsewhere
export const playThisAtom = atom<PlayThisType>({
  audio: "",
  image: "",
  title: "",
  author: "",
});

// User data atom
export const userAtom = atom<UserData | null>(null);
