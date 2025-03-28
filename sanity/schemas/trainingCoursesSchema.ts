// schemas/virtualCourse.ts
import { defineField, defineType } from "sanity";

export const trainingCourseType = defineType({
  name: "trainingCourse",
  title: "Training Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "forWho",
      title: "Who is this course for?",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Course Duration",
      type: "text",
      description:
        'E.g., "4 weeks with 2 sessions per week, approximately 30 minutes each"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aims",
      title: "Course Aims",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outline",
      title: "Course Outline",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "businessTargeting",
      title: "Business Targeting",
      type: "array",
      of: [{ type: "string" }],
      description: "Types of businesses this course is designed for",
      options: {
        list: [
          { title: "Small Businesses", value: "small-business" },
          { title: "Enterprises", value: "enterprise" },
          { title: "Startups", value: "startup" },
          { title: "Healthcare", value: "healthcare" },
          { title: "Education", value: "education" },
          { title: "Technology", value: "technology" },
          { title: "All Businesses", value: "all" },
        ],
      },
    }),
    defineField({
      name: "pricing",
      title: "Pricing Information",
      type: "object",
      fields: [
        {
          name: "pricePerParticipant",
          title: "Price Per Participant",
          type: "number",
          description: "Price per individual participant",
        },
        {
          name: "groupDiscounts",
          title: "Group Discounts Available",
          type: "boolean",
        },
        {
          name: "pricingNotes",
          title: "Pricing Notes",
          type: "text",
          description:
            "Additional pricing information or custom package details",
        },
      ],
    }),
    defineField({
      name: "materials",
      title: "Course Materials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Material Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "fileType",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "PDF", value: "pdf" },
                  { title: "Video", value: "video" },
                  { title: "Audio", value: "audio" },
                  { title: "Worksheet", value: "worksheet" },
                  { title: "Other", value: "other" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              title: "Quote",
              type: "text",
            },
            {
              name: "author",
              title: "Author",
              type: "string",
            },
            {
              name: "company",
              title: "Company",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "headerImage",
    },
  },
});
