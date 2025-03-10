// import { createClient } from "@sanity/client";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-03-11",
  // Set to `true` for production environments
  useCdn: true,
});

export { client };
