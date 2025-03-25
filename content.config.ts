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
        date: z.date()
      })
    })
  }
})
