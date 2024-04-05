import RelatedArticles from "./RelatedArticles";
import { getRecommendedByBurnoutHubArticles } from "../getArticlesData";

interface ArticleFooterProps {
  category: string; // replace with actual type if not string
  currentArticle: string; // replace with actual type if not string
}

export default async function ArticleFooter({
  category,
  currentArticle,
}: ArticleFooterProps) {
  const recommendedArticles = await getRecommendedByBurnoutHubArticles(
    category,
    currentArticle
  );

  return (
    <div className="mt-8 bg-amber-100/25 py-16 lg:mt-16 lg:rounded-2xl">
      <RelatedArticles articles={recommendedArticles} />
    </div>
  );
}
