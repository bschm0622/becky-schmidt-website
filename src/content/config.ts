// Import the defineCollection function from Astro
import { defineCollection, z } from 'astro:content';

// Define the blog collection schema
export const collections = {
  'blog': defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      excerpt: z.string(),
      // Optional fields
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      image: z.string().optional(),
    }),
  }),
}; 