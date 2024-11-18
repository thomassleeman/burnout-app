export async function getSelfReflectionData(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

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
