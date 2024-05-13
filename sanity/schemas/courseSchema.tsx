import { defineField, defineType } from "sanity";
import {
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export const courseType = defineType({
  name: "course",
  title: "Course",
  icon: AcademicCapIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule.required().error(`Please include a title for the course.`),
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.required().error(`Please include a header image for the course.`),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      description:
        "The content for the course landing page. Include: 1) What will be covered. 2)The purpose/aims of the course. 3) Prerequisites. (Link to any other course/article/exercise that the user should have completed first.) 4) Outline of the course structure 5) Any other details that you feel would be helpful to the user.",
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
        rule
          .required()
          .error(`Please include content for the course landing page.`),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "array",
      description:
        "A brief summary of the course. This will be displayed on the course card on the home page.",
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
        rule.required().error(`Please include a slug for the course.`),
    }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "article" },
        },
      ],
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .error(`Courses must contain a minimum of two articles.`),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "summary",
      media: "headerImage",
    },
  },
});
