import ContentSelectorControl from "./ContentSelectorControl";

import { getArticlesForGivenCategories } from "@articles/getArticlesData";

export const revalidate = 3600; // revalidate the data cache at most every hour
const categories = [
  "Burnout Signs: Distracted",
  "Burnout Signs: Emotional",
  "Burnout Signs: Exhaustion",
  "Burnout Signs: Detachment",
];
const articles = await getArticlesForGivenCategories(categories);

function groupByCategory(items: any[], categories: string[]) {
  // Initialize an object with keys as the given categories and values as empty arrays
  const groupedByCategory = categories.reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {});

  // Iterate through the items and group them by category if the category matches one of the given categories
  items.forEach((item) => {
    const category = item.category;
    if (groupedByCategory.hasOwnProperty(category)) {
      groupedByCategory[category].push(item);
    }
  });

  return groupedByCategory;
}

export default async function ContentSelector() {
  const groupedArticles = groupByCategory(articles, categories);

  console.log("groupedArticles: ", groupedArticles);
  return <ContentSelectorControl articlesByCategory={groupedArticles} />;
}
