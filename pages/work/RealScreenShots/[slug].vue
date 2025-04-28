<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`realscreenshots-${slug}`, () => {
  return queryCollection('RealScreenShots').path(`/work/realscreenshots/${slug}`).first()
})

console.log('post', post)

// Fetch surrounding blog posts (previous and next)
const { data: surroundings } = await useAsyncData(`realscreenshots-surroundings-${slug}`, () => {
  return queryCollectionItemSurroundings('RealScreenShots', `/work/realscreenshots/${slug}`)
})

</script>



<template>
  <div class="container mx-auto md:px-4 max-w-4xl">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>

    <!-- Surrounding Blog Posts -->
    <div class="mt-8 flex justify-between">
    <!-- Previous Post -->
    <NuxtLink v-if="surroundings?.[0]" :to="surroundings[0].path" class="text-blue-500 hover:underline">
      ← {{ surroundings[0].title }}
    </NuxtLink>
  

    <!-- Next Post -->
    <NuxtLink v-if="surroundings?.[1]" :to="surroundings[1].path" class="text-blue-500 hover:underline">
      {{ surroundings[1].title }} →
    </NuxtLink>
  </div>
</template>