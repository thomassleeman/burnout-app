import ContentCarousel from "@/app/articles/_components/ContentCarousel";
import HeroContainer from "./_components/HeroContainer";
import Footer from "../_components/ui/Footer";
import ArticlesByCategory from "./_components/ArticlesByCategory";

import {
  getSortedLimitedArticlesData,
  getRecommendedArticlesData,
} from "@articles/getArticlesData";

export default async function Dashboard() {
  const latestArticles = await getSortedLimitedArticlesData("date", "desc", 10);
  const recommendedArticles = await getRecommendedArticlesData();

  return (
    <>
      <HeroContainer />
      <div className=" flex flex-col space-y-10 px-2">
        <ContentCarousel
          carouselTitle="Recommended for You"
          carouselTagline="Based on your chatbot session."
          articles={recommendedArticles}
        />
        <ContentCarousel
          carouselTitle="Latest Articles"
          carouselTagline="Read the latest articles from our library."
          articles={latestArticles}
        />
        <ArticlesByCategory />
      </div>
      <Footer />
    </>
  );
}
