//Firestore
import { getFirestore, DocumentSnapshot } from "firebase-admin/firestore";
//Firebase config
import { adminInit } from "@/firebase/auth/adminConfig";
//server actions
import userIdAction from "@actions/userIdAction";

//sanity
import { client } from "@/sanity/client";

adminInit();
const db = getFirestore();

const contentCarouselProjection = `title,
"id":_id,
  "classification": classification->name,
  date,
  headerImage,
  "slug": slug.current,
  "summary": summary[0].children[0].text,  
  "author": author->name,
  audio`;

/* ----------------------------------------------------------------------------------------- */
/* Get all articles */
/* ----------------------------------------------------------------------------------------- */

export async function getSortedArticlesData(
  orderedBy: string,
  order: "asc" | "desc"
) {
  const query = `*[_type == "article"]| order(${orderedBy} ${order}){${contentCarouselProjection}}`;

  const articles = await client.fetch(query);

  return articles;
}

/* ----------------------------------------------------------------------------------------- */
/* CONTENT CAROUSEL QUERIES */
/* ----------------------------------------------------------------------------------------- */

export async function getSortedLimitedArticlesData(
  orderedBy: string,
  order: "asc" | "desc",
  limit: number
) {
  const query = `*[_type == "article"]| order(${orderedBy} ${order})[0..${
    limit - 1
  }]{${contentCarouselProjection}}`;

  const articles = await client.fetch(query);

  return articles;
}

/* ----------------------------------------------------------------------------------------- */

export async function getRecommendedArticlesData() {
  // a) Get the user from firebase and check for recommended articles
  const userId = await userIdAction();
  if (!userId) {
    return;
  }

  const userRef = db.collection("users").doc(userId);

  const doc = await userRef.get();
  if (!doc.exists) {
    return;
  }

  const user = doc.data();
  if (!user) {
    return;
  }

  if (!user.articles) {
    return;
  }

  const recommendedArticles = user.articles.recommended;
  if (!recommendedArticles) {
    return;
  }

  //When putting an array directly into a template string JS converts the array to a string by concatenating all elements with commas. As a result we need to restore quotes and put the list back inside square brackets.
  const recommendedArticlesQuery = recommendedArticles
    .map((slug: string) => `"${slug}"`)
    .join(", ");

  // b) Get the recommended articles from sanity
  const query = `*[_type == "article" && slug.current in [${recommendedArticlesQuery}]]{${contentCarouselProjection}}`;

  const articles = await client.fetch(query);

  return articles;
}

/* ----------------------------------------------------------------------------------------- */
//this excludes course documents.
export async function getArticlesByCategory() {
  const query = `*[_type == "article" && classification._ref in *[_type == "category"]._id]{${contentCarouselProjection}}`;

  const articles = await client.fetch(query);

  // function groupByCategory(items: any[], groupName: string) {
  //   const grouped = items.reduce((result, item) => {
  //     const groupKey = item[groupName];
  //     if (!result[groupKey]) {
  //       result[groupKey] = [];
  //     }
  //     result[groupKey].push(item);
  //     return result;
  //   }, {});

  //   return Object.keys(grouped).map((key) => grouped[key]);
  // }

  function groupByCategory(items: any[], groupName: string) {
    const grouped = items.reduce((result, item) => {
      const groupKey = item[groupName];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});

    let groupedArticles = Object.keys(grouped).map((key) => grouped[key]);

    // Find the index of the array for "The Basics" classification
    const basicsIndex = groupedArticles.findIndex((group) =>
      group.some((article: Article) => article.classification === "The Basics")
    );

    // If found, move the "The Basics" group to the start
    if (basicsIndex > -1) {
      const [basicsGroup] = groupedArticles.splice(basicsIndex, 1);
      groupedArticles.unshift(basicsGroup);
    }

    return groupedArticles;
  }

  const groupedArticles = groupByCategory(articles, "classification");
  return groupedArticles;
}

/* ----------------------------------------------------------------------------------------- */
/* ARTICLE PAGE QUERIES */
/* ----------------------------------------------------------------------------------------- */

export async function getArticleData(slug: string) {
  const query = `*[_type == "article" && slug.current == "${slug}"][0]{
      title,
      headerImage,
      content[]{
        ...,
        markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
      },
       audio,
      author->,
      date,
      readingTime,
      category->{
          name
      }
  }`;
  const article = await client.fetch(query);

  return article;
}

/* ----------------------------------------------------------------------------------------- */

interface Category {
  name: string;
}

export async function getRelatedArticles(
  category: Category,
  currentArticle: string
) {
  const query = `*[_type == "article" && category->name == "${category.name}" && slug.current != "${currentArticle}"]| order(date desc)[0..3]{
            title,
           date,
           "slug": slug.current,
          "category":category->{name}.name,  
           headerImage,
           "author": author->{name}.name,
            "summary": summary[0].children[0].text,
            audio,
          }`;

  const articles = await client.fetch(query);

  return articles;
}

/* ----------------------------------------------------------------------------------------- */
