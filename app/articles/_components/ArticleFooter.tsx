import RelatedArticles from "./RelatedArticles";
import { getRelatedArticles } from "../getArticlesData";

interface ArticleFooterProps {
  category: {
    name: string;
  };
  currentArticle: string;
}

export default async function ArticleFooter({
  category,
  currentArticle,
}: ArticleFooterProps) {
  const recommendedArticles = await getRelatedArticles(
    category,
    currentArticle
  );

  return (
    <div
      className={`${
        recommendedArticles.length === 0 ? "hidden" : ""
      } mt-8 bg-amber-100/25 py-16 lg:mt-16 lg:rounded-2xl`}
    >
      <RelatedArticles articles={recommendedArticles} />
    </div>
  );
}
