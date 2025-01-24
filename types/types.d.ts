declare global {
  type Article = {
    id: string;
    title: string;
    audio?: string;
    content: string;
    slug: string;
    date?: string;
    headerImage?: SanityImage;
    author?: string;
    readingTime?: number;
    classification?: string;
    summary?: string;
  };

  type NoArticles = { title: string };

  type ArticleOrNoArticle = Article[] | NoArticles[];

  type PlayThisType = {
    audio: string;
    image: StaticImageData | string;
    title: string;
    author: string;
  };

  interface CustomSVGProps extends React.SVGProps<SVGSVGElement> {
    classes: string;
  }

  /* Organisations */
  interface Organisation {
    createdAt: Timestamp;
    joinToken?: {
      createdAt: Timestamp;
      expiresAt: Timestamp;
      token: string;
      valid: boolean;
    };
    logoUrl: string;
    members: {
      admin: string[];
      standard: string[];
    };
    name: string;
    ownerEmail: string;
    owerId: string;
    subscriptionQuantity: number;
    subscriptionStatus: string;
  }

  /* Users */

  interface ProviderData {
    uid: string;
    phoneNumber?: string | null;
    displayName: string;
    providerId: string;
    photoURL?: string;
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

  //For recording of completed course exercises.
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

  interface UserOrganisation {
    childUsers?: string[];
    joined: Timestamp;
    logoUrl?: string;
    name: string;
    organisationId: string;
    role: string;
    subscriptionQuantity?: number;
  }

  interface UserData {
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
    organisation?: UserOrganisation;
  }
}

export {};
