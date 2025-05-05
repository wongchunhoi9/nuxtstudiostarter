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
  <div class="container max-w-6xl mx-auto md:px-4 px-4">
    <div class="flex flex-col md:flex-row">
      
      <!-- Table of Contents -->
     
   
         <TableOfContents :content="post" />


      <!-- Main Content -->
      <main class="md:w-4/5">
        <div class=" py-4">
          <h1 class="text-4xl font-extrabold my-7">{{ post.title }}</h1>
          <p class="text-end">{{ post.medium }}</p>
          <p class="text-end">{{ post.year }}</p>
        </div>
        <div class="max-w-none">
          <ContentRenderer :value="post" />
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>

</style>