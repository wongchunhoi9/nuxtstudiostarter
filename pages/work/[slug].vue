<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`work-${slug}`, () => {
  return queryCollection('work').path(`/work/${slug}`).first()
})

// Set SEO metadata dynamically using the frontmatter
useSeoMeta({
  title: post.value?.title,
  description: post.value?.description
})

useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description },
    { property: 'og:image', content: post.value?.img },
    { property: 'og:url', content: `https://yourwebsite.com/work/${slug}` }
  ]
})


</script>

<template>
  <div class="container max-w-6xl mx-auto md:px-4">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>
</template>