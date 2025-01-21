//sanity
import { client } from "@/sanity/client";

export async function getWritingExerciseData(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = `*[_type == "writingExercise" && slug.current == "${slug}"][0]{
  ...,
  classification->,
  headerImage,
  introduction[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        ...,
        reference->{
          _type,
          _id,
          title,
        }
      }
    }
  },
  journalingSections[]{
    ...,
    sectionTitle,
    "slug": slug.current,
    promptGroups[]{
      ...,
      heading,
      prompts[]{
        ...,
        content[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              reference->{
                _type,
                _id,
                title,
              }
            }
          }
        }
      }
    }
  }
}`;

  // Encode the query for URL usage
  const encodedQuery = encodeURIComponent(query);

  // Construct the full URL
  const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${encodedQuery}`;

  // Fetch the data
  const res = await fetch(url, {
    // Include this if your dataset is private
    // headers: {
    //   Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}`,
    // },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const { result } = await res.json();
  console.log("Data fetched for slug:", slug);
  return result;
}

/* ----------------------------------------------------------------------------------------- */

export async function getWritingExercisesData() {
  const query = `*[_type == "writingExercise"][0...10]{
      title,
      "slug": slug.current,
      headerImage,
      
  }`;
  const articles = await client.fetch(query);

  return articles;
}
