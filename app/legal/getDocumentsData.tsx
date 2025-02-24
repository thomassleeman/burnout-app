//Firebase config
import { adminInit } from "@/firebase/auth/adminConfig";

//sanity
import { client } from "@/sanity/client";

adminInit();

/* ----------------------------------------------------------------------------------------- */
/* ARTICLE PAGE QUERIES */
/* ----------------------------------------------------------------------------------------- */

export async function getDocumentData(slug: string) {
  const query = `*[_type == "legalDoc" && slug.current == "${slug}"][0]{
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
      date,
  }`;
  const article = await client.fetch(query);
  return article;
}

/* ----------------------------------------------------------------------------------------- */
