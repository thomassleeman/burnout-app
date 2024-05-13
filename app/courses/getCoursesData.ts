"use server";
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

/* ----------------------------------------------------------------------------------------- */
/* COURSE PAGE QUERIES */
/* ----------------------------------------------------------------------------------------- */

export async function getCourseData(slug: string) {
  const query = `*[_type == "course" && slug.current == "${slug}"][0]{
      title,
      "slug": slug.current,
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
      "articles": articles[]->{
  "title": title,
  "headerImage": headerImage,
  "slug": slug.current,
}
  }`;
  const article = await client.fetch(query);

  return article;
}

/* ----------------------------------------------------------------------------------------- */

export async function getCoursesData() {
  const query = `*[_type == "course"][0...10]{
      title,
      "slug": slug.current,
      headerImage,
      summary[]{
        ...,
      },
  }`;
  const articles = await client.fetch(query);

  return articles;
}

/* ----------------------------------------------------------------------------------------- */
