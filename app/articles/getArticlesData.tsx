//Firestore
import { getFirestore, DocumentSnapshot } from "firebase-admin/firestore";
//Firebase config
import { adminInit } from "@/firebase/auth/adminConfig";
//server actions
import userIdAction from "@actions/userIdAction";

adminInit();

const db = getFirestore();

/* ----------------------------------------------------------------------------------------- */

/* This function will retreive everything! */
export async function getSortedArticlesData(
  orderedBy: string,
  order: "asc" | "desc"
) {
  const articlesCollection = db.collection("articles");
  const snapshot = await articlesCollection.orderBy(orderedBy, order).get();

  const allArticlesData: Article[] = [];
  snapshot.forEach((doc: DocumentSnapshot) => {
    const data = doc.data();
    if (!data) return;

    // Find the header image URL from the images array
    const images = data ? data.images || [] : [];
    const headerImageObj = images.find(
      (image: { name: string; image: string }) => image.name === "head"
    );
    const headerImage = headerImageObj ? headerImageObj.image : "";

    const article: Article = {
      id: doc.id,
      title: data.title,
      date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
      slug: data.slug,
      content: data.content,
      headerImage: headerImage,
      headerImageAlt: data.title,
      author: data.author,
      category: data.category,
      summary: data.summary,
    };
    allArticlesData.push(article);
  });

  return allArticlesData;
}

/* ----------------------------------------------------------------------------------------- */

export async function getSortedLimitedArticlesData(
  orderedBy: string,
  order: "asc" | "desc",
  limit: number
) {
  const articlesCollection = db.collection("articles");
  const snapshot = await articlesCollection
    .orderBy(orderedBy, order)
    .limit(limit)
    .get();

  const allArticlesData: Article[] = [];
  snapshot.forEach((doc: DocumentSnapshot) => {
    const data = doc.data();
    if (!data) return;

    // Find the header image URL from the images array
    const images = data ? data.images || [] : [];
    const headerImageObj = images.find(
      (image: { name: string; image: string }) => image.name === "head"
    );
    const headerImage = headerImageObj ? headerImageObj.image : "";

    const article: Article = {
      id: doc.id,
      title: data.title,
      date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
      slug: data.slug,
      content: data.content,
      headerImage: headerImage,
      headerImageAlt: `Header image for the article ${data.title}`,
      author: data.author,
      category: data.category,
      summary: data.summary,
      audio: data.audio || "",
    };
    allArticlesData.push(article);
  });

  return allArticlesData;
}

/* ----------------------------------------------------------------------------------------- */

export async function getRecommendedArticlesData() {
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

  try {
    const articlesRef = db.collection("articles");
    const returnedArticles = await articlesRef
      .where("slug", "in", recommendedArticles)
      .get();

    const articlesToReturn: Article[] = [];

    returnedArticles.forEach((doc) => {
      const data = doc.data();
      if (!data) return;

      const images = doc.data().images || [];
      const headerImageObj = images.find(
        (image: { name: string; image: string }) => image.name === "head"
      );
      const headerImage = headerImageObj ? headerImageObj.image : "";

      const article: Article = {
        id: doc.id,
        title: data.title,
        date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
        slug: data.slug,
        content: data.content,
        headerImage: headerImage,
        headerImageAlt: `Header image for the article ${data.title}`,
        author: data.author || "",
        category: data.category || "",
        summary: data.summary || "",
        audio: data.audio || "",
      };
      articlesToReturn.push(article);
    });
    return articlesToReturn;
  } catch (error) {
    console.error("Error getting recommended articles data:", error);
  }
}

/* ----------------------------------------------------------------------------------------- */

// export async function getArticlesByCategory(
//   orderedBy: string,
//   order: "asc" | "desc",
//   limit: number
// ) {
//   const articlesCollection = db.collection("articles");
//   const snapshot = await articlesCollection
//     .orderBy("category", "asc")
//     .limit(100)
//     .get();

//   const allArticlesData: Article[] = [];
//   snapshot.forEach((doc: DocumentSnapshot) => {
//     const data = doc.data();
//     if (!data) return;

//     // Find the header image URL from the images array
//     const images = data ? data.images || [] : [];
//     const headerImageObj = images.find(
//       (image: { name: string; image: string }) => image.name === "head"
//     );
//     const headerImage = headerImageObj ? headerImageObj.image : "";

//     const article: Article = {
//       id: doc.id,
//       title: data.title,
//       date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
//       slug: data.slug,
//       content: data.content,
//       headerImage: headerImage,
//       headerImageAlt: `Header image for the article ${data.title}`,
//       author: data.author,
//       category: data.category,
//       summary: data.summary,
//       audio: data.audio || "",
//     };
//     allArticlesData.push(article);
//   });

//   return allArticlesData;
// }

export async function getArticlesByCategory() {
  const articlesCollection = db.collection("articles");
  const snapshot = await articlesCollection
    .orderBy("category", "asc")
    .limit(50)
    .get();

  const allArticlesData: Article[] = [];
  const categories: { [key: string]: Article[] } = {};

  snapshot.forEach((doc: DocumentSnapshot) => {
    const data = doc.data();
    if (!data) return;

    // Find the header image URL from the images array
    const images = data ? data.images || [] : [];
    const headerImageObj = images.find(
      (image: { name: string; image: string }) => image.name === "head"
    );
    const headerImage = headerImageObj ? headerImageObj.image : "";

    const article: Article = {
      id: doc.id,
      title: data.title,
      date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
      slug: data.slug,
      content: data.content,
      headerImage: headerImage,
      headerImageAlt: `Header image for the article ${data.title}`,
      author: data.author,
      category: data.category,
      summary: data.summary,
      audio: data.audio || "",
    };

    allArticlesData.push(article);

    // Add the article to the appropriate category
    if (article.category) {
      if (categories[article.category]) {
        categories[article.category].push(article);
      } else {
        categories[article.category] = [article];
      }
    }
  });

  return categories;
}

/* ----------------------------------------------------------------------------------------- */

export async function getRecommendedByBurnoutHubArticles(
  category: string,
  currentArticle: string
) {
  const articlesCollection = db.collection("articles");
  const snapshot = await articlesCollection
    .where("category", "==", category)
    .where("slug", "!=", currentArticle)
    .limit(4)
    .get();

  const allArticlesData: Article[] = [];

  snapshot.forEach((doc: DocumentSnapshot) => {
    const data = doc.data();
    if (!data) return;

    // Find the header image URL from the images array
    const images = data ? data.images || [] : [];
    const headerImageObj = images.find(
      (image: { name: string; image: string }) => image.name === "head"
    );
    const headerImage = headerImageObj ? headerImageObj.image : "";

    const article: Article = {
      id: doc.id,
      title: data.title,
      date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
      slug: data.slug,
      content: data.content,
      headerImage: headerImage,
      headerImageAlt: `Header image for the article ${data.title}`,
      author: data.author,
      category: data.category,
      summary: data.summary,
      audio: data.audio || "",
    };

    allArticlesData.push(article);
  });

  return allArticlesData;
}

/* ----------------------------------------------------------------------------------------- */

/* Single Article data */
export async function getArticleData(slug: string) {
  const querySnapshot = await db
    .collection("articles")
    .where("slug", "==", slug)
    .get();

  if (querySnapshot.docs.length === 0) {
    console.log("No such document!");
    return null;
  }

  const doc = querySnapshot.docs[0];

  if (!doc.data) {
    console.log("No data in document!");
    return null;
  }

  const readingTime = (text: string) => {
    let res = [];
    let str = text.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    str.map((s: string) => {
      let trimStr = s.trim();
      if (trimStr.length > 0) {
        res.push(trimStr);
      }
    });
    const count = Math.round(res.length) / 200;
    if (count < 1) {
      return 1;
    }
    return count;
  };

  // Fetch the content of the MDX file
  const response = await fetch(doc.data().content);
  const mdxContent = await response.text();

  // Find the header image URL from the images array
  const images = doc.data().images || [];
  const headerImageObj = images.find(
    (image: { name: string; image: string }) => image.name === "head"
  );
  const headerImage = headerImageObj ? headerImageObj.image : "";

  const article: Article = {
    id: doc.id,
    title: doc.data().title,
    date: doc.data().date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
    slug: doc.data().slug,
    content: mdxContent, // Use the fetched MDX content
    category: doc.data().category,
    audio: doc.data().audio,
    headerImage: headerImage, // Use the found header image URL
    headerImageAlt: doc.data().headerImageAlt,
    readingTime: readingTime(mdxContent), // Use the fetched MDX content for reading time calculation
    author: doc.data().author,
  };

  return article;
}
