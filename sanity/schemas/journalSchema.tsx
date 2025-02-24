import { defineField, defineType } from "sanity";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export const journalType = defineType({
  name: "journal",
  title: "Journal",
  icon: BookOpenIcon,
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "structure", title: "Journal Structure" },
  ],
  fields: [
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
        rule.required().error(`Please include a header image for the journal.`),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule.required().error("Please include a name for the journal."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      group: "content",
      validation: (rule) =>
        rule.required().error("Please include a slug for the journal."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
      validation: (rule) =>
        rule.required().error("Please include a description for the journal."),
    }),
    defineField({
      name: "exampleEntries",
      title: "Example entries",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
      validation: (rule) =>
        rule
          .required()
          .error(
            "Please include some examples of the journal in action for the user."
          ),
    }),
    defineField({
      name: "promptCategories",
      title: "Prompt Categories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Category Name",
              type: "string",
            },
            {
              name: "prompts",
              title: "Prompts",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "prompt",
                      title: "Prompt Text",
                      type: "array",
                      of: [{ type: "block" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      group: "structure",
      validation: (rule) =>
        rule.required().error("Please include at least one prompt category."),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
  },
});
