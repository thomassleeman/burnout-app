// atoms/userIsAdminAtom.js
import { atom } from "jotai";

export const isAdminAtom = atom(false);

export const showSearchResultsAtom = atom(false);

export const anyErrorAtom = atom({ message: "" });
// export const errorAlertAtom = atom("");
