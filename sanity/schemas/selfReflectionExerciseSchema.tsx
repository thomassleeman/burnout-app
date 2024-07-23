import { defineField, defineType } from "sanity";

import {
  LightBulbIcon,
  ArrowTopRightOnSquareIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export const selfReflectionExerciseType = defineType({
  name: "selfReflectionExercise",
  title: "Self Reflection Exercise",
  icon: LightBulbIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .error(`Please include a title for this self reflection exercise.`),
    }),
    defineField({
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [
        {
          type: "block",
          options: {
            spellCheck: true,
          },

          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                icon: () => <LinkIcon className="h-5 w-5" />,
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [{ type: "article" }],
                  },
                ],
              },
              {
                name: "externalLink",
                type: "object",
                title: "External link",
                icon: () => <ArrowTopRightOnSquareIcon className="h-5 w-5" />,

                fields: [
                  {
                    name: "url",
                    type: "url",
                    title: "URL",
                  },
                  {
                    name: "newTab",
                    type: "boolean",
                    title: "Open in new tab",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          fields: [
            {
              type: "string",
              name: "alt",
              title: "Alt text",
              description:
                "A description of the image for visually impaired users and search engines.",
            },
            {
              name: "caption",
              type: "string",
              title: "Image Caption",
              description: "A caption to appear under the image.",
            },
          ],
        },
      ],
      validation: (rule) =>
        rule.required().error(`Please include content for the article.`),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      description:
        "Use 'Generate' unless you have a specific reason for creating your own slug.",
      validation: (rule) =>
        rule.required().error(`Please include a slug for the article.`),
    }),
    defineField({
      name: "classification",
      title: "Classification",
      type: "reference",
      to: [{ type: "category" }, { type: "course" }],
      validation: (rule) =>
        rule
          .required()
          .error(
            `Please include a classification (either a category or a course) for the exercise. Most self reflection exercises should be associated with a course.`
          ),
    }),
  ],
  // After the "fields" array
  preview: {
    select: {
      title: "title",
      subtitle: "classification.title",
    },
  },
});
