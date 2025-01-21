interface ProviderData {
  uid: string;
  phoneNumber: string | null;
  displayName: string;
  providerId: string;
  photoURL: string;
  email: string;
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

interface BurnoutAssessmentCategory {
  [categoryKey: string]: number;
}

interface BurnoutAssessment {
  [assessmentKey: string]:
    | BurnoutAssessmentCategory
    | {
        createdAt: Timestamp;
      };
}

interface Exercise {
  [exerciseSlug: string]: {
    createdAt?: Timestamp;
    completedPrompts: number;
    completionPercentage: number;
    encryptedUserInput: {
      [inputKey: string]: {
        encryptedData: string;
        iv: string;
      };
    };
  };
}

interface CourseModule {
  createdAt?: Timestamp;
  encryptedUserInput?: {
    [inputId: string]: {
      encryptedData: string;
      iv: string;
    };
  };
}

interface Course {
  [courseSlug: string]: {
    courseName: string;
    resourcesCompleted: {
      [resourceName: string]: boolean;
    };
    [moduleSlug: string]: CourseModule | string;
  };
}

interface RecommendedArticles {
  recommended: string[];
}

interface StressRating {
  rating: number;
  createdAt: Timestamp;
}

interface JournalEntry {
  createdAt?: Timestamp;
  encryptedUserInput: {
    [inputKey: string]: {
      encryptedData: string;
      iv: string;
    };
  };
}

interface Organisation {
  childUsers?: string[];
  joined: Timestamp;
  logoUrl?: string;
  name: string;
  organisationId: string;
  role: string;
  subscriptionQuantity?: number;
}

export interface UserData {
  uid: string;
  email: string;
  providerData: ProviderData[];
  createdAt: Timestamp;
  assessments?: {
    burnoutAssessment?: BurnoutAssessment;
  };
  exercises?: Exercise;
  courses?: Course;
  articles?: RecommendedArticles;
  stressRating?: StressRating[];
  journal?: {
    [dateKey: string]: JournalEntry;
  };
  organisation?: Organisation;
}

// export interface UserData {
//   uid: string;
//   email: string;
//   providerData: {
//     uid: string;
//     phoneNumber: string | null;
//     displayName: string;
//     providerId: string;
//     photoURL: string;
//     email: string;
//   }[];
//   createdAt: {
//     seconds: number;
//     nanoseconds: number;
//   };
//   assessments?: {
//     burnoutAssessment?: {
//       [assessmentKey: string]:
//         | {
//             [categoryKey: string]: number;
//           }
//         | {
//             createdAt: {
//               seconds: number;
//               nanoseconds: number;
//             };
//           };
//     };
//   };
//   exercises?: {
//     [exerciseSlug: string]: {
//       resourcesCompleted: {
//         [resourceName: string]: boolean;
//       };
//     };
//   };
//   courses?: {
//     [courseSlug: string]: {
//       courseName: string;
//       resourcesCompleted: {
//         [resourceName: string]: boolean;
//       };
//       [moduleSlug: string]:
//         | {
//             createdAt?: {
//               seconds: number;
//               nanoseconds: number;
//             };
//             encryptedUserInput?: {
//               [inputId: string]: {
//                 encryptedData: string;
//                 iv: string;
//               };
//             };
//           }
//         | string;
//     };
//   };
//   articles?: {
//     recommended: string[];
//   };
//   stressRating?: {
//     rating: number;
//     createdAt: {
//       seconds: number;
//       nanoseconds: number;
//     };
//   }[];
//   journal?: {
//     [dateKey: string]: {
//       createdAt?: {
//         seconds: number;
//         nanoseconds: number;
//       };
//       encryptedUserInput: {
//         [inputKey: string]: {
//           encryptedData: string;
//           iv: string;
//         };
//       };
//     };
//   };
//   organisation?: {
//     childUsers?: string[];
//     joined: {
//       seconds: number;
//       nanoseconds: number;
//     };
//     logoUrl?: string;
//     name: string;
//     organisationId: string;
//     role: string;
//     subscriptionQuantity?: number;
//   };
// }
