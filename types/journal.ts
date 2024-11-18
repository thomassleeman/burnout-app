// journal.ts

export interface PreviousEntry {
  date: string; // in 'yyyy-MM-dd' format
  encryptedUserInput: any;
  createdAt: any;
}

export interface Day {
  date: Date;
  dateString: string;
  dayNumber: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  isFuture: boolean;
  hasJournalEntry: boolean;
}

export interface JournalCalendarProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  journalData: { [key: string]: any } | null;
}

export interface DecryptedInputs {
  [key: string]: any;
}

export interface PreviousInputData {
  decryptedUserInput?: DecryptedInputs;
  createdAt?: string;
}

export interface UserInputs {
  [key: string]: string;
}

export interface UserInputsWithIds {
  [key: string]: string | undefined;
}

export interface JournalTextAreaFormProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  journalData: { [key: string]: any } | null;
  setJournalData: React.Dispatch<
    React.SetStateAction<{ [key: string]: any } | null>
  >;
  fetchUserDataLoading: boolean;
}

export interface ExistingEntryProps {
  previousInputData: PreviousInputData;
  setUserInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
  setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  prompts: { id: string; prompt: string }[];
}
