import ContentCarousel from "@/app/articles/_components/ContentCarousel";
import HeroContainer from "./_components/HeroContainer";
import { getSortedLimitedArticlesData } from "@articles/getArticlesData";

export default async function Dashboard() {
  const articles = await getSortedLimitedArticlesData("date", "desc", 10);

  return (
    <>
      <HeroContainer />
      <div className="px-2">
        <ContentCarousel
          carouselTitle="Latest Articles"
          carouselTagline="Read the latest articles from our library"
          articles={articles}
        />
      </div>
    </>
  );
}
