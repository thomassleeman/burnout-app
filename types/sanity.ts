export type SanityImage = {
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
};

//internal and external link components
export type IntLinkValueProp = {
  _type: string;
  slug?: {
    current?: string;
  };
};

export type ExtLinkValueProp = {
  _type: string;
  url: string;
  newTab: boolean;
};

export type Audio = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

export type PortableTextBlock = {
  _type: string;
  children: { _type: string; text: string }[];
};

export type Article = {
  id: string;
  title: string;
  audio?: Audio;
  content: PortableTextBlock[];
  slug: string;
  date: string;
  headerImage?: SanityImage;
  author: string;
  readingTime?: number;
  classification: string;
  summary?: string;
};

export type Exercise = {
  title: string;
  content: PortableTextBlock[];
  slug: string;
  headerImage?: SanityImage;
  summary: PortableTextBlock[];
  classification: string;
};

export type CourseResource = {
  title: string;
  headerImage?: SanityImage;
  slug: string;
  type: "article" | "selfReflectionExercise";
};

export type Course = {
  title: string;
  content: PortableTextBlock[];
  slug: string;
  headerImage?: SanityImage;
  summary: PortableTextBlock[];
  resources: CourseResource[];
};
