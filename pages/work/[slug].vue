<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`work-${slug}`, () => {
  return queryCollection('work').path(`/work/${slug}`).first()
})
</script>

<template>
  <div class="container max-w-6xl mx-auto md:px-4">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>
</template>