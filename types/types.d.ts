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
  category?: string;
  summary?: string;
};

type NoArticles = { title: string };

type ArticleOrNoArticle = Article[] | NoArticles[];
