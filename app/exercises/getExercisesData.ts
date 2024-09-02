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

export async function getSelfReflectionExerciseData(slug: string) {
  const query = `*[_type == "selfReflectionExercise" && slug.current == "${slug}"][0]{
      title,
      categorisation,
      introduction[]{
        ...,
        markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
      },
      prompts[]{
        ...,
 }

  }`;
  const exercise = await client.fetch(query);

  return exercise;
}
