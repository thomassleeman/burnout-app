import { defineField, defineType } from "sanity";

import {
  LightBulbIcon,
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  InformationCircleIcon,
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
      name: "introduction",
      title: "Introduction",
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
        {
          name: "infoBox",
          type: "object",
          title: "Info Box",
          icon: () => <InformationCircleIcon className="h-5 w-5" />,

          fields: [
            {
              name: "infoBoxType",
              type: "string",
              title: "Info box type",
              options: {
                list: [
                  {
                    title: "Tip",
                    value: "tip",
                  },
                  { title: "Take it further", value: "takeItFurther" },
                ],
                layout: "dropdown",
              },
            },
            {
              name: "content",
              title: "Content",
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
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "array",
      description:
        "A brief summary of the exercise. This will be displayed on the course card on the home page.",
      of: [{ type: "block" }],
      validation: (rule) =>
        rule
          .required()
          .min(20)
          .max(200)
          .warning(
            `Please include a summary between 20-200 characters in length for the course.`
          ),
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
            `Please include a classification (either a category or a course) for the exercise. Most self reflection exercises will be associated with a course.`
          ),
    }),
    defineField({
      name: "prompts",
      title: "Writing Exercise Prompts",
      description:
        "Define the prompts that you want the user to respond to. Each block represents a question or prompt for the user and will be accompanied by a single input box for the user to write and save their response.",
      type: "array",
      of: [
        {
          type: "object",
          title: "Prompt",
          name: "prompt",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Title",
              validation: (rule) =>
                rule
                  .required()
                  .error(`Please include a title for this prompt.`),
            },
            {
              name: "instructions",
              title: "Instructions",
              validation: (rule) =>
                rule
                  .required()
                  .error(`Please include instructions for this prompt.`),
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
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "classification.title",
    },
  },
});
