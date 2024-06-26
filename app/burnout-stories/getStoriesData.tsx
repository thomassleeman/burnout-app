// //Firestore
// import { getFirestore, DocumentSnapshot } from "firebase-admin/firestore";
// //Firebase config
// import { adminInit } from "@/firebase/auth/adminConfig";
// //server actions
// import userIdAction from "@actions/userIdAction";

//sanity
import { client } from "@/sanity/client";

// adminInit();
// const db = getFirestore();

// const contentCarouselProjection = `title,
// "id":_id,
//   "classification": classification->name,
//   date,
//   headerImage,
//   "slug": slug.current,
//   "summary": summary[0].children[0].text,
//   "author": author->name,
//   audio`;

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* BURNOUT STORY PAGE QUERIES */
/* ----------------------------------------------------------------------------------------- */

export async function getBurnoutStoryData(slug: string) {
  const query = `*[_type == "burnoutStory" && slug.current == "${slug}"][0]{
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
  }`;
  const article = await client.fetch(query);

  return article;
}

export async function getBurnoutStoriesData() {
  const query = `*[_type == "burnoutStory"][0...10]{
      title,
      "slug": slug.current,
      headerImage,
      "summary": blurb[]{
        ...,
      },
  }`;
  const articles = await client.fetch(query);

  return articles;
}
