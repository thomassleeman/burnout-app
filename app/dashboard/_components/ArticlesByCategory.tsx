import ContentCarousel from "@/app/articles/_components/ContentCarousel";

import { getArticlesByCategory } from "@articles/getArticlesData";

export default async function ArticlesByCategory() {
  const ArticlesByCategory = await getArticlesByCategory();

  const capitaliseFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //   console.log("articlesbycategory: ", ArticlesByCategory);
  return (
    <>
      {Object.keys(ArticlesByCategory).map((category) => {
        return (
          <ContentCarousel
            key={category}
            carouselTitle={capitaliseFirstLetter(category)}
            carouselTagline=""
            articles={ArticlesByCategory[category]} // Access the value using the key
          />
        );
      })}
    </>
  );
}
