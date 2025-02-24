import { defineField, defineType } from "sanity";

import {
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import ReadingTimeInput from "./components/ReadingTimeInput";

export const legalDocType = defineType({
  name: "legalDoc",
  title: "Legal Document",
  icon: ClipboardDocumentCheckIcon,
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "metaData", title: "Meta Data" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule.required().error(`Please include a title for the document.`),
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "content",
    }),
    defineField({
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
                    title: "Seeing it in action",
                    value: "seeingItInAction",
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
      group: "content",
      validation: (rule) =>
        rule.required().error(`Please include content for the document.`),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      group: "metaData",

      validation: (rule) =>
        rule.required().error(`Please include a date for the document.`),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      group: "metaData",
      description:
        "Use 'Generate' unless you have a specific reason for creating your own slug.",
      validation: (rule) =>
        rule.required().error(`Please include a slug for the document.`),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "headerImage",
      date: "date",
    },
  },
});
