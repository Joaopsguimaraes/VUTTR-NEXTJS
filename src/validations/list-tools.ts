import { z } from "zod";

export const listToolsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    description: z.string(),
    tags: z.string().transform((value) => {
      return value
        .trim()
        .split(",")
        .map((tag) => tag.trim());
    }),
  })
);

export type ListToolsType = z.infer<typeof listToolsSchema>;
