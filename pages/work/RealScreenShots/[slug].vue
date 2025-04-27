<script setup>
const slug = useRoute().params.slug
console.log('slug', slug)

// Fetch the current blog post
const { data: post } = await useAsyncData(`work-realscreenshots-${slug}`, () => {
  return queryCollection('RealScreenShots').path(`/work/RealScreenShots/RealScreenShot-20201201`).first()
})


console.log('post', post)

</script>

<template>
  <div class="container mx-auto md:px-4">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>
</template>

