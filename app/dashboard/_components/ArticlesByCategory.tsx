import ContentCarousel from "@/app/articles/_components/ContentCarousel";

import { getArticlesByCategory } from "@articles/getArticlesData";

export default async function ArticlesByCategory() {
  const articlesByCategory = await getArticlesByCategory();

  const capitaliseFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {/* {Object.keys(ArticlesByCategory).map((category) => { */}
      {articlesByCategory.map((category) => {
        const categoryName = category[0].category;
        return (
          <ContentCarousel
            key={categoryName}
            carouselTitle={capitaliseFirstLetter(categoryName)}
            carouselTagline=""
            articles={category}
          />
        );
      })}
    </>
  );
}
