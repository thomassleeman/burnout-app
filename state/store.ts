import { atom } from "jotai";

export const isAdminAtom = atom(false);

export const showSearchResultsAtom = atom(false);

export const anyErrorAtom = atom({ message: "" });

export const usernameAtom = atom("");
export const userIDAtom = atom("");

export const playThisAtom = atom<PlayThisType>({
  audio: "",
  image: "",
  title: "",
  author: "",
});
