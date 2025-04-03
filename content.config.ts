import { defineContentConfig, defineCollection,z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    about: defineCollection({
      type: 'page',
      source: 'about/**',
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        image: z.string(),
      })
    }),
    allContent: defineCollection({
      type:'page',
      source: {
        include: "**/*",
        exclude: ["about/**","news.md"],
        prefix: '/',
      },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        image: z.string(),
      }),
    }),
  }
})
