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

export type Article = {
  id: string;
  title: string;
  audio?: Audio;
  content: string;
  slug: string;
  date: string;
  headerImage?: SanityImage;
  author: string;
  readingTime?: number;
  category: string;
  summary?: string;
};
