import { atom } from "jotai";

// Existing atoms
export const isAdminAtom = atom(false);
export const showSearchResultsAtom = atom(false);
export const usernameAtom = atom("");
export const userIDAtom = atom("");

export type ErrorMessage = {
  id: string;
  message: string;
};

export const anyErrorAtom = atom<ErrorMessage[]>([]);

// export const anyErrorAtom = atom({ message: "" });

export const playThisAtom = atom<PlayThisType>({
  audio: "",
  image: "",
  title: "",
  author: "",
});

export const userAtom = atom<UserData | null>(null);
