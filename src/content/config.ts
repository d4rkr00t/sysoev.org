import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      desc: z.string(),
      image: z.string(),
      date: z.date().transform((d) => new Date(d)),
      updated: z
        .date()
        .optional()
        .transform((d) => {
          if (!d) return null;
          return new Date(d);
        }),
      tags: z.array(
        z.enum([
          "leetcode",
          "array",
          "binary search",
          "chrome",
          "vscode",
          "theme",
          "Y2019",
          "Y2020",
          "Y2021",
          "Y2022",
          "Y2023",
        ])
      ),
    })
    .strict(),
});

export const collections = {
  blog: blogCollection,
};
