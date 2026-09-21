import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const chapters = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./manuscript/chapters" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    era: z.string(),
    phase: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
    diagramId: z.string(),
    diagramTitle: z.string(),
  }),
});

export const collections = { chapters };
