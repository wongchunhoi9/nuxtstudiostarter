import { defineContentConfig, defineCollection,z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    about: defineCollection({
      type: 'page',
      source: 'about/**',
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        img: z.string(),
      })
    }),
    blog: defineCollection({
      type: 'page',
      // source: 'blog/**',
      source: {
        include: "blog/**",
        // exclude: ["about/**",'**/.*'],
        exclude: ["blog/.*"],
        // prefix: '/',
      },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        img: z.string(),
      })
    }),
    work: defineCollection({
      type: 'page',
      // source: 'work/*.md',
      source: {
        include: "work/**",
        // exclude: ["about/**",'**/.*'],
        exclude: ["work/.*","work/.draft/**","work/realscreenshots/**","work/lostandfoundanythingstore/**"],
        // prefix: '/',
      },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        category: z.array(z.string()),
        img: z.string(),
        medium: z.string(),
        year: z.string(),
        description: z.string(),
        
      })
    }),
    RealScreenShots: defineCollection({
      type: 'page',
      // source: 'work/*.md',
      source: {
        include: "work/realscreenshots/**",
        // exclude: ["about/**",'**/.*'],
        // exclude: ["work/.*","work/.draft/**","work/RealScreenShots/**"],
        // prefix: '/',
      },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        category: z.array(z.string()),
        img: z.string(),
        location: z.string(),
        time: z.string(),
        singleCollection: z.boolean(),
        
      })
    }),
    LostAndFoundAnythingStore: defineCollection({
      type: 'page',
      // source: 'work/*.md',
      source: {
        include: "work/lostandfoundanythingstore/**",
        // exclude: ["about/**",'**/.*'],
        // exclude: ["work/.*","work/.draft/**","work/RealScreenShots/**"],
        // prefix: '/',
      },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        category: z.array(z.string()),
        img: z.string(),
        location: z.string(),
        time: z.string(),
        description: z.string(),
        FoundItemName: z.string(),
        customeID: z.string(),
        whoFound: z.string(),
        foundDate: z.string(),
        foundLocation: z.string(),
        media:z.array(z.string()),
        active: z.boolean(),
        modelEmbeddedLink: z.string(),
        size: z.string(),
        modelThumbnail: z.string(),
        itemStoryEnglish: z.string(),
        itemStoryChinese: z.string(),
        spec1: z.string(),
        spec2: z.string(),
        
      })
    }),
    soundDesign: defineCollection({
      type: 'page',
      // source: 'work/*.md',
      source: {
        include: "sounddesign/**",
        // exclude: ["about/**",'**/.*'],
        exclude: ["sound/.*"],
        // prefix: '/',
      },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        category: z.array(z.string()),
        img: z.string(),
        medium: z.string(),
        year: z.string(),
        description: z.string(),
        credits: z.string(),
        
      })
    }),
    allContent: defineCollection({
      type:'page',
      source: {
        include: "**/*",
        // exclude: ["about/**",'**/.*'],
        exclude: ["about/**",'**/.*','work/.*','work/.draft/**','work/realscreenshots/**','work/lostandfoundanythingstore/**'],
        // prefix: '/',
      },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        image: z.string(),
        img:z.string(),
        category: z.array(z.string()),
        medium: z.string(),
      }),
    }),
  }
})
