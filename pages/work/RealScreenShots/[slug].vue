<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`realscreenshots-${slug}`, () => {
  return queryCollection('RealScreenShots').path(`/work/realscreenshots/${slug}`).first()
})

console.log('post', post)

</script>



<template>
  <div class="container mx-auto md:px-4">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>
</template>