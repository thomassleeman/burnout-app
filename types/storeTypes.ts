export interface UserData {
  uid: string;
  email: string;
  providerData: {
    uid: string;
    phoneNumber: string | null;
    displayName: string;
    providerId: string;
    photoURL: string;
    email: string;
  }[];
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  assessments?: {
    burnoutAssessment?: {
      [assessmentKey: string]:
        | {
            [categoryKey: string]: number;
          }
        | {
            createdAt: {
              seconds: number;
              nanoseconds: number;
            };
          };
    };
  };
  exercises?: {
    [exerciseSlug: string]: {
      resourcesCompleted: {
        [resourceName: string]: boolean;
      };
    };
  };
  courses?: {
    [courseSlug: string]: {
      courseName: string;
      resourcesCompleted: {
        [resourceName: string]: boolean;
      };
      [moduleSlug: string]:
        | {
            createdAt?: {
              seconds: number;
              nanoseconds: number;
            };
            encryptedUserInput?: {
              [inputId: string]: {
                encryptedData: string;
                iv: string;
              };
            };
          }
        | string;
    };
  };
  articles?: {
    recommended: string[];
  };
  stressRating?: {
    rating: number;
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
  }[];
  journal?: {
    [dateKey: string]: {
      createdAt?: {
        seconds: number;
        nanoseconds: number;
      };
      encryptedUserInput: {
        [inputKey: string]: {
          encryptedData: string;
          iv: string;
        };
      };
    };
  };
}
