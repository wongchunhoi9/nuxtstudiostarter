<script setup>
const slug = useRoute().params.slug

// Fetch the current blog post
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

// Fetch surrounding blog posts (previous and next)
const { data: surroundings } = await useAsyncData(`blog-surroundings-${slug}`, () => {
  return queryCollectionItemSurroundings('blog', `/blog/${slug}`)
})
</script>

<template>
  <!-- Render the blog post -->
  <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
  <ContentRenderer :value="post" />

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