import ContentCarousel from "@/app/articles/_components/ContentCarousel";

import { getArticlesByCategory } from "@articles/getArticlesData";

export const revalidate = 3600; // revalidate the data cache at most every hour

export default async function ArticlesByCategory() {
  const articlesByCategory = await getArticlesByCategory();

  const capitaliseFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {articlesByCategory.map((category) => {
        const categoryName = category[0].category;
        const categoryImage = category[0].image;
        return (
          <ContentCarousel
            key={categoryName}
            carouselTitle={capitaliseFirstLetter(categoryName)}
            image={categoryImage}
            carouselTagline=""
            articles={category}
          />
        );
      })}
    </>
  );
}
