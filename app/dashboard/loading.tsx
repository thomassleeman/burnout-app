import { HeroContainerSkeleton } from "./_components/HeroContainer";
import { ContentCarouselSkeleton } from "../articles/_components/ContentCarousel";

export default function Loading() {
  return (
    <>
      <HeroContainerSkeleton />
      <div className="px-2">
        <ContentCarouselSkeleton />
      </div>
    </>
  );
}
