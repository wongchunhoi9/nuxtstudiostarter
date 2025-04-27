<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`sounddesign-${slug}`, () => {
  return queryCollection('soundDesign').path(`/sounddesign/${slug}`).first()
})

console.log('post', post)

</script>



<template>
  <div class="container mx-auto md:px-4">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>
</template>