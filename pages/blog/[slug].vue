<script setup lang="ts">
const slug = useRoute().params.slug

// Fetch the current blog post
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

// Fetch surrounding blog posts (previous and next)
const { data: surroundings } = await useAsyncData(`blog-surroundings-${slug}`, () => {
  return queryCollectionItemSurroundings('blog', `/blog/${slug}`)
})

function formatDate(inputDate: string | number | Date) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
//   const formattedDate = day + ". " + months[month] + " " + year;
//   const formattedDate = day + "." + (month+1) + "." + year;
  const formattedDate = year + "." + (month+1) + "." + day;
  // const formattedDate = year;  
  return formattedDate;
}

// Set SEO metadata dynamically using the frontmatter
useSeoMeta({
  title: post.value?.title,
  ogTitle: post.value?.title,
  description: post.value?.description,
  ogDescription: post.value?.description,
  ogImage: post.value?.img,
  ogUrl: `https://wongchunhoi9.com/blog/${slug}`
})

useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description },
    { property: 'og:image', content: post.value?.img },
    { property: 'og:url', content: `https://wongchunhoi9.com/blog/${slug}` }
  ]
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Left Column -->
    <div class="block">
      <NuxtLink to="/blog" class="text-blue-500 hover:underline">
        ← All Blog Posts
      </NuxtLink>
    </div>

    <!-- Blog Content -->
    <div class="col-span-1 lg:col-span-3 mx-auto">
      <p>{{ formatDate(post.date) }}</p>
      <h1 class="text-3xl font-bold mb-4 ">{{ post.title }}</h1>
      <ContentRenderer :value="post" />
    </div>
  </div>

  <!-- Bottom Section -->
  <div class="mt-8 flex flex-col lg:flex-row justify-between items-center">


    <!-- Surrounding Blog Posts -->
    <div class="flex justify-between w-full lg:w-auto">
      <!-- Previous Post -->
      <NuxtLink
        v-if="surroundings?.[0]"
        :to="surroundings[0].path"
        class="text-blue-500 hover:underline mr-4"
      >
        ← {{ surroundings[0].title }}
      </NuxtLink>

      <!-- Next Post -->
      <NuxtLink
        v-if="surroundings?.[1]"
        :to="surroundings[1].path"
        class="text-blue-500 hover:underline"
      >
        {{ surroundings[1].title }} →
      </NuxtLink>
    </div>
  </div>
</template>