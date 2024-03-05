//
import { getAuth } from "firebase-admin/auth";

import userIdAction from "@actions/userIdAction";

import {
  getFirestore,
  DocumentSnapshot,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";

import { adminInit } from "@/firebase/auth/adminConfig";

adminInit();

const db = getFirestore();

/* Sorted Articles, also requires a limit so as not to retreive everything */
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
    const article: Article = {
      id: doc.id,
      title: data.title,
      date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
      slug: data.slug,
      content: data.content,
      headerImage: data.headerImage,
      headerImageAlt: data.headerImageAlt,
      author: data.author,
      category: data.category,
      summary: data.summary,
    };
    allArticlesData.push(article);
  });

  return allArticlesData;
}

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
    const article: Article = {
      id: doc.id,
      title: data.title,
      date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
      slug: data.slug,
      content: data.content,
      headerImage: data.headerImage,
      headerImageAlt: data.headerImageAlt,
      author: data.author,
      category: data.category,
      summary: data.summary,
      audio: data.audio || "",
    };
    allArticlesData.push(article);
  });

  return allArticlesData;
}

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

  const recommendedArticles = user.articles.recommended;
  if (!recommendedArticles) {
    return;
  }
  console.log("Recommended articles:", recommendedArticles);

  try {
    const articlesRef = db.collection("articles");
    const returnedArticles = await articlesRef
      .where("slug", "in", recommendedArticles)
      .get();
    console.log("returnedArticles:", returnedArticles.docs.length);

    const articlesToReturn: Article[] = [];

    returnedArticles.forEach((doc) => {
      const data = doc.data();
      if (!data) return;
      const article: Article = {
        id: doc.id,
        title: data.title,
        date: data.date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
        slug: data.slug,
        content: data.content,
        headerImage: data.headerImage,
        headerImageAlt: data.headerImageAlt,
        author: data.author || "",
        category: data.category || "",
        summary: data.summary || "",
        audio: data.audio || "",
      };
      articlesToReturn.push(article);
    });
    console.log("articlesToReturn:", articlesToReturn);
    return articlesToReturn;
  } catch (error) {
    console.error("Error getting recommended articles data:", error);
  }
}

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

  const article: Article = {
    id: doc.id,
    title: doc.data().title,
    date: doc.data().date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
    slug: doc.data().slug,
    content: mdxContent, // Use the fetched MDX content
    audio: doc.data().audio,
    headerImage: doc.data().headerImage,
    headerImageAlt: doc.data().headerImageAlt,
    readingTime: readingTime(mdxContent), // Use the fetched MDX content for reading time calculation
    author: doc.data().author,
  };

  return article;
}
