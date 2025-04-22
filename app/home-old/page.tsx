import ContentCarousel from "@articles/_components/ContentCarousel";
import HeroContainer from "./_components/callToActionSection/HeroContainer";
import Footer from "../_components/ui/Footer";
import ArticlesByCategory from "./_components/ArticlesByCategory";
import CheckInPrompt from "./_components/callToActionSection/CheckInPrompt";
import { getArticlesForGivenCategories } from "@articles/getArticlesData";
import StressLevelComponent from "../home/[uid]/_components/StressLevelComponent";

import ContentSelector from "./_components/contentSelector/ContentSelector";

import {
  getSortedLimitedArticlesData,
  getRecommendedArticlesData,
} from "@articles/getArticlesData";

export const revalidate = 3600; // revalidate the data cache at most every hour

export default async function home() {
  const latestArticles = await getSortedLimitedArticlesData("date", "desc", 5);
  const recommendedArticles = await getRecommendedArticlesData();
  const theBasics = await getArticlesForGivenCategories(["The Basics"]);

  return (
    <>
      <HeroContainer />
      {/* <StressLevelComponent /> */}
      {/* <CheckInPrompt /> */}
      <div className=" flex flex-col space-y-10 px-2">
        <ContentCarousel
          carouselTitle="Recommended for You"
          carouselTagline="Based on your chatbot session."
          articles={recommendedArticles}
        />
        <ContentCarousel
          carouselTitle="The Basics"
          carouselTagline="Start here to learn more about the growing issue of Burnout."
          articles={theBasics}
        />
        <ContentCarousel
          carouselTitle="Latest Articles"
          carouselTagline="Read the latest articles from our library."
          articles={latestArticles}
        />
        <ContentSelector />
        {/* <ArticlesByCategory /> */}
      </div>
    </>
  );
}
