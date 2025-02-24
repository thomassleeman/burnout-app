// @/sanity/schemas/journal/getJournalData.ts
import { client } from "@/sanity/client";
import { journalOutlineFromSanity } from "@/types/journal";

export async function getJournalData(
  slug: string
): Promise<journalOutlineFromSanity | null> {
  if (!slug) {
    console.error("getJournalData called with empty slug");
    return null;
  }

  try {
    const query = `*[_type == "journal" && slug.current == "${slug}"][0]{
      _id,
      name,
      headerImage,
      description[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        }
      },
      exampleEntries[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        }
      },
      slug,
      promptCategories[]{
        _key,
        name,
        prompts[]{
          _key,
          prompt[]{
            ...,
            markDefs[]{
              ...,
              _type == "internalLink" => {
                "slug": @.reference->slug
              }
            }
          }
        }
      }
    }`;

    const journal = await client.fetch(query);

    if (!journal) {
      console.error(`getJournalData - No journal found with slug: "${slug}"`);
      return null;
    }

    // Validate critical fields
    if (!journal.slug || !journal.slug.current) {
      console.error(
        `getJournalData - Journal missing slug: "${JSON.stringify(journal)}"`
      );
    }

    if (!journal.promptCategories || journal.promptCategories.length === 0) {
      console.warn(
        `getJournalData - Journal has no prompt categories: "${slug}"`
      );
    }

    console.log(
      `getJournalData - Successfully fetched journal: "${journal.name}" (${journal.slug?.current})`
    );

    return journal;
  } catch (error) {
    console.error(
      `getJournalData - Error fetching journal with slug "${slug}":`,
      error
    );
    return null;
  }
}

export async function getJournalsData() {
  const query = `*[_type == "journal"][0...10]{
      name,
      "slug": slug.current,
      headerImage,
      
  }`;
  const journals = await client.fetch(query);

  console.log("journals: ", journals);

  return journals;
}
