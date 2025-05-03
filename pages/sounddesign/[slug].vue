<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`sounddesign-${slug}`, () => {
  return queryCollection('soundDesign').path(`/sounddesign/${slug}`).first()
})

console.log('post', post)

// Set SEO metadata dynamically using the frontmatter
// Set SEO metadata dynamically using the frontmatter
useSeoMeta({
  title: post.value?.title,
  ogTitle: post.value?.title,
  description: post.value?.description,
  ogDescription: post.value?.description,
  ogImage: post.value?.img,
  ogUrl: `https://wongchunhoi9.com/sounddesign/${slug}`
})

useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: post.value?.title || 'Sound Design - Wong Chun Hoi' },
    { property: 'og:description', content: post.value?.description },
    { property: 'og:image', content: post.value?.img },
    { property: 'og:url', content: `https://wongchunhoi9.com/sounddesign/${slug}` }
  ]
})

</script>



<template>
  <div class="container mx-auto md:px-4">
    <!-- Render the blog post as Prose & Vue components -->
    <ContentRenderer :value="post" />
  </div>
</template>