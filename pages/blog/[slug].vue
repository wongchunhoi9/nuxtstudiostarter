<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('content').path(`/blog/${slug}`).first()
})
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer :value="post" />
</template>