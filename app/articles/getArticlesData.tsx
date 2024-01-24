import { DocumentSnapshot } from "firebase/firestore";

const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

import { adminInit } from "@/firebase/auth/adminConfig";

adminInit();

const db = getFirestore();

/* Sorted Articles, also requires a limit so as not to retreive everything */
export async function getSortedArticlesData(orderedBy: string, order: string) {
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
  order: string,
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
    };
    allArticlesData.push(article);
  });

  return allArticlesData;
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
    headerImage: doc.data().headerImage,
    headerImageAlt: doc.data().headerImageAlt,
    readingTime: readingTime(mdxContent), // Use the fetched MDX content for reading time calculation
    author: doc.data().author,
  };

  // const article: Article = {
  //   id: doc.id,
  //   title: doc.data().title,
  //   date: doc.data().date.toDate(), // Firestore Timestamp needs to be converted to JavaScript Date object
  //   slug: doc.data().slug,
  //   content: doc.data().content,
  //   headerImage: doc.data().headerImage,
  //   headerImageAlt: doc.data().headerImageAlt,
  //   readingTime: readingTime(doc.data().content),
  //   author: doc.data().author,
  // };

  return article;
}
