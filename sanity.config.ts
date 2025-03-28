import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas/schemas";

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  schema,
  parts: [
    {
      implements: "part:@sanity/base/theme/variables-style",
      path: "./tailwind.css",
    },
    // ... other parts
  ],
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Pasu.io section
            S.listItem()
              .title("Pasu.io")
              .child(
                S.list()
                  .title("Pasu.io Content")
                  .items([
                    S.listItem()
                      .title("Articles")
                      .child(S.documentTypeList("article")),
                    S.listItem()
                      .title("Authors")
                      .child(S.documentTypeList("author")),
                    S.listItem()
                      .title("Categories")
                      .child(S.documentTypeList("category")),
                    S.listItem()
                      .title("Courses")
                      .child(S.documentTypeList("course")),
                    S.listItem()
                      .title("Burnout Stories")
                      .child(S.documentTypeList("burnoutStory")),
                    S.listItem()
                      .title("Self-Reflection Exercises")
                      .child(S.documentTypeList("selfReflectionExercise")),
                    S.listItem()
                      .title("Writing Exercises")
                      .child(S.documentTypeList("writingExercise")),
                    S.listItem()
                      .title("Legal Documents")
                      .child(S.documentTypeList("legalDoc")),
                    S.listItem()
                      .title("Journals")
                      .child(S.documentTypeList("journal")),
                  ])
              ),

            // PasuHealth.com section
            S.listItem()
              .title("PasuHealth.com")
              .child(
                S.list()
                  .title("PasuHealth.com Content")
                  .items([
                    S.listItem()
                      .title("Training Courses")
                      .child(S.documentTypeList("trainingCourse")),
                  ])
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

// import { visionTool } from "@sanity/vision";
// import { defineConfig } from "sanity";
// import { structureTool } from "sanity/structure";

// // Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
// import { apiVersion, dataset, projectId } from "./sanity/env";
// import { schema } from "./sanity/schemas/schemas";

// export default defineConfig({
//   basePath: "/admin",
//   projectId,
//   dataset,
//   // Add and edit the content schema in the './sanity/schema' folder
//   schema,
//   parts: [
//     {
//       implements: "part:@sanity/base/theme/variables-style",
//       path: "./tailwind.css",
//     },
//     // ... other parts
//   ],
//   plugins: [
//     structureTool(),
//     // Vision is a tool that lets you query your content with GROQ in the studio
//     // https://www.sanity.io/docs/the-vision-plugin
//     visionTool({ defaultApiVersion: apiVersion }),
//   ],
// });
