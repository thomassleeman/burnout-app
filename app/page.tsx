import Hero from "@/components/design/landingPage/Hero";
// import ContentCarousel from "@/app/articles/_components/ContentCarousel";
import { getSortedLimitedArticlesData } from "@articles/getArticlesData";

// const latestArticles = await getSortedLimitedArticlesData("date", "desc", 5);

export default function Home() {
  return (
    <div className="">
      <Hero />
      {/* <ContentCarousel
        carouselTitle="Latest Articles"
        carouselTagline="Read the latest articles from our library."
        articles={latestArticles}
      /> */}
    </div>
  );
}
