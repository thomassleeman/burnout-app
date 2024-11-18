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

type SVGProps = {
  classes?: string;
};
