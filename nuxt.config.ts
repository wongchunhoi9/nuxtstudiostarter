// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],
  content:{
    build: { 
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          theme: 'github-light',
        }
      }
    }
  },
  image: {
    quality: 80 ,
    format: ['webp'],
    rotate: null,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50
          }
      },
      preview: {
        modifiers: {
          format: 'jpg',
          width: 1024,
          rotate: null,
          }
      }
    }
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})
