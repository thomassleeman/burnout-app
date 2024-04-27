import { defineField, defineType } from "sanity";
import { FolderIcon } from "@heroicons/react/24/outline";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  icon: FolderIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) =>
        rule.required().error(`Please include a name for the category.`),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
