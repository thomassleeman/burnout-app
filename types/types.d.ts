type Article = {
  id: string;
  title: string;
  content: string;
  slug: string;
  date?: string;
  headerImage?: string;
  headerImageAlt?: string;
  author?: string;
  readingTime?: number;
  category?: string;
  summary?: string;
};

type NoArticles = { title: string };

type ArticleOrNoArticle = Article[] | NoArticles[];
