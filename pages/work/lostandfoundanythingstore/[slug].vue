<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`lostandfoundanythingstore-${slug}`, () => {
  return queryCollection('LostAndFoundAnythingStore').path(`/work/lostandfoundanythingstore/${slug}`).first()
})

// console.log('post', post)

// Fetch surrounding blog posts (previous and next)
const { data: surroundings } = await useAsyncData(`lostandfoundanythingstore-surroundings-${slug}`, () => {
  return queryCollectionItemSurroundings('LostAndFoundAnythingStore', `/work/lostandfoundanythingstore/${slug}`)
})

</script>



<template>
  <div class="container mx-auto md:px-4 max-w-4xl">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>
  <div class="mt-8">
    <NuxtLink 
      to="/work/lostandfoundanythingstore"
      class="text-blue-500 hover:underline"
      > back
    </NuxtLink>
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