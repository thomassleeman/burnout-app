import ContentCarousel from "@/app/articles/_components/ContentCarousel";
import HeroContainer from "./_components/HeroContainer";
import { getSortedArticlesData } from "@articles/getArticlesData";

export default async function Dashboard() {
  const articles = await getSortedArticlesData("date", "desc");
  await new Promise((resolve) => setTimeout(resolve, 3000));
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
