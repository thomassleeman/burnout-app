// @/types/journal.ts
// Updated interfaces to match the Sanity data structure

export interface JournalPrompt {
  _key: string;
  prompt: any[]; // Array of portable text blocks
}

export interface PromptCategory {
  _key: string;
  name: string;
  prompts: JournalPrompt[];
}

export interface journalOutlineFromSanity {
  _id?: string;
  name: string;
  slug: string;
  description?: any[];
  headerImage?: any;
  promptCategories: PromptCategory[];
  [key: string]: any; // Allow for additional fields from Sanity
}

export interface EncryptedData {
  iv: string;
  encryptedData: string;
}

export interface EncryptedUserInputs {
  [key: string]: EncryptedData;
}

export interface JournalEntry {
  encryptedUserInput: EncryptedUserInputs;
  createdAt: Timestamp;
}

export interface JournalDates {
  [date: string]: JournalEntry;
}

export interface JournalSlug {
  [slug: string]: JournalDates;
}

export interface JournalData {
  journaling: JournalSlug;
  [key: string]: any;
}

export interface DecryptedInputs {
  [key: string]: string;
}

export interface PreviousInputData {
  decryptedUserInput?: DecryptedInputs;
  createdAt?: string;
}

export interface UserInputs {
  [key: string]: string;
}

export interface UserInputsWithIds {
  [id: string]: string;
}

export interface JournalTextAreaFormProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  journalData: JournalData | null;
  setJournalData: (data: JournalData) => void;
  fetchUserDataLoading: boolean;
  journalOutlineFromSanity: journalOutlineFromSanity;
}

export interface ExistingEntryProps {
  previousInputData: PreviousInputData;
  setUserInputs: (inputs: UserInputs) => void;
  setPreviousInputData: (data: PreviousInputData) => void;
  setSubmitted: (submitted: boolean) => void;
  journalOutlineFromSanity: journalOutlineFromSanity;
}

// Add these types to your @/types/journal.ts file

export interface Day {
  date: Date;
  dateString: string;
  dayNumber: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isFuture: boolean;
  hasJournalEntry: boolean;
}

export interface PreviousEntry {
  date: string;
  encryptedUserInput: any;
  createdAt: any;
}

export interface JournalCalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  journalData: JournalData | null;
  journalSlug: string; // Added to filter entries by journal
}

// // journal.ts
// import { PortableText } from "@portabletext/react";

// export interface PreviousEntry {
//   date: string; // in 'yyyy-MM-dd' format
//   encryptedUserInput: any;
//   createdAt: any;
// }

// export interface Day {
//   date: Date;
//   dateString: string;
//   dayNumber: string;
//   isCurrentMonth: boolean;
//   isToday: boolean;
//   isSelected?: boolean;
//   isFuture: boolean;
//   hasJournalEntry: boolean;
// }

// export interface JournalCalendarProps {
//   selectedDate: Date;
//   setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
//   journalData: { [key: string]: any } | null;
// }

// export interface DecryptedInputs {
//   [key: string]: any;
// }

// export interface PreviousInputData {
//   decryptedUserInput?: DecryptedInputs;
//   createdAt?: string;
// }

// export interface UserInputs {
//   [key: string]: string;
// }

// export interface UserInputsWithIds {
//   [key: string]: string | undefined;
// }

// export interface JournalTextAreaFormProps {
//   selectedDate: Date;
//   setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
//   journalData: { [key: string]: any } | null;
//   setJournalData: React.Dispatch<
//     React.SetStateAction<{ [key: string]: any } | null>
//   >;
//   fetchUserDataLoading: boolean;
//   journalName: string;
// }

// export interface ExistingEntryProps {
//   previousInputData: PreviousInputData;
//   setUserInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
//   setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
//   setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
//   prompts: { id: string; prompt: string }[];
// }

// export interface journalOutlineFromSanity {
//   name: string;
//   description: PortableText[];
//   promptCategories: {
//     name: string;
//     prompts: {
//       _key: string;
//       prompt: PortableText[];
//     }[];
//   }[];
//   examples: {
//     categoryName: string;
//     example: PortableText[];
//   }[];
// }
