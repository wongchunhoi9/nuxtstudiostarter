<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`realscreenshots-${slug}`, () => {
  return queryCollection('RealScreenShots').path(`/work/realscreenshots/${slug}`).first()
})

// console.log('post', post)

// Fetch surrounding blog posts (previous and next)
const { data: surroundings } = await useAsyncData(`realscreenshots-surroundings-${slug}`, () => {
  return queryCollectionItemSurroundings('RealScreenShots', `/work/realscreenshots/${slug}`,{
    before: 1,
    after: 1,
    fields: ['img']
  })
})

// console.log('surroundings', surroundings)
// Add computed properties for better readability
// const previousPost = computed(() => surroundings.value?.[0])
// const nextPost = computed(() => surroundings.value?.[1])
</script>

<template>
  <div class="container mx-auto md:px-4 max-w-4xl px-2">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />

    <!-- Back Link -->
    <div class="mt-8">
      <NuxtLink 
        to="/work/realscreenshots#photocollection"
        class="text-black text-xl font-bold hover:underline"
      >
       ←  back
      </NuxtLink>
    </div>

    <!-- Surrounding Posts with Image Previews -->
    <div class="mt-8 flex justify-between items-center gap-4 md:gap-80 relative min-h-[100px]">
      <!-- Previous Post -->
      <NuxtLink 
        v-if="surroundings[0]"
        :to="surroundings[0].path" 
        class="group flex-1 relative overflow-hidden aspect-video"
      >
        <!-- Arrow Overlay -->
        <div class="absolute inset-0 flex items-center justify-start z-10 px-4 transition-opacity group-hover:opacity-100 opacity-75">
          <div class="bg-black/50 p-3 rounded-full">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
        <!-- Image and Title -->
        <div class="relative h-full">
          <NuxtImg
            :src="`${surroundings[0].img}`"
            :alt="surroundings[0].title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            :modifiers="{ rotate: null }"
            quality="10"
            :placeholder="15"

          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent flex items-end p-4">
            <span class="text-white text-sm">{{ surroundings[0].title }}</span>
          </div>
        </div>
      </NuxtLink>

      <!-- Next Post -->
      <NuxtLink 
        v-if="surroundings[1]" 
        :to="surroundings[1].path" 
        class="group flex-1 relative overflow-hidden aspect-video"
      >
        <!-- Arrow Overlay -->
        <div class="absolute inset-0 flex items-center justify-end z-10 px-4 transition-opacity group-hover:opacity-100 opacity-75">
          <div class="bg-black/50 p-3 rounded-full">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <!-- Image and Title -->
        <div class="relative h-full">
          <NuxtImg
            :src="`${surroundings[1].img}`"
            :alt="surroundings[1].title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            quality="10"
            :placeholder="15"
            :modifiers="{ rotate: null }"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent flex items-end p-4">
            <span class="text-white text-sm">{{ surroundings[1].title }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.aspect-video {
  aspect-ratio: 16/9;
}
</style>