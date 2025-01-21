import { defineField, defineType } from "sanity";

import {
  LightBulbIcon,
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const writingExerciseType = defineType({
  name: "writingExercise",
  title: "Writing Exercise",
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
          .error(`Please include a title for this writing exercise.`),
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      description:
        "Images will be cropped to a square shape, ensure you have set the image hotspot to determine the crop.",
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.required().error(`Please include a header image for the article.`),
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
            `Please include a classification (either a category or a course) for the exercise. Writing exercises are generally seperate to courses. If you are creating this exercise for a course, consider using a 'self-reflection exercise'.`
          ),
    }),
    // Updated prompts field with higher-level headings
    defineField({
      name: "journalingSections",
      title: "Journaling Sections",
      // name: "prompts",
      // title: "Prompts",
      description: "Group prompts under Sections and Prompt groups.",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          fields: [
            {
              name: "sectionTitle",
              title: "Section Title",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .error(`Please include a title for this section.`),
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: "sectionTitle",
              },
              description:
                "Use 'Generate' unless you have a specific reason for creating your own slug.",
              validation: (rule) =>
                rule.required().error(`Please include a slug for the article.`),
            },
            {
              name: "promptGroups",
              title: "Prompt Groups",
              description: "Group prompts together to help guide the user.",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "promptGroup",
                  title: "Prompt Group",
                  fields: [
                    {
                      name: "heading",
                      title: "Heading",
                      type: "string",
                      validation: (rule) =>
                        rule
                          .required()
                          .error(
                            `Please include a heading for this group of prompts.`
                          ),
                    },
                    {
                      name: "prompts",
                      title: "Prompt(s)",
                      type: "array",
                      description:
                        "Every prompt will get its own text box for the user to use respond.",

                      validation: (rule) =>
                        rule
                          .required()
                          .error(
                            `Please include at least one prompt for the user.`
                          )
                          .unique(),

                      of: [
                        {
                          type: "object",
                          name: "prompt",
                          title: "Prompt",
                          fields: [
                            {
                              name: "content",
                              title: "Prompt Content",
                              type: "array",
                              of: [
                                {
                                  type: "block",
                                  options: {
                                    spellCheck: true,
                                  },
                                  lists: [
                                    { title: "Bullet", value: "bullet" },
                                    { title: "Numbered", value: "number" },
                                  ],
                                  marks: {
                                    decorators: [
                                      { title: "Strong", value: "strong" },
                                      { title: "Emphasis", value: "em" },
                                      {
                                        title: "Underline",
                                        value: "underline",
                                      },
                                      {
                                        title: "Strike",
                                        value: "strike-through",
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        // {
                        //   name: "prompt",
                        //   title: "Prompt",
                        //   type: "string",
                        // },
                      ],
                    },
                  ],
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
