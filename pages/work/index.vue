<template>

  <div class="lg:columns-2 xl:columns-3 2xl:columns-4 gap-0">
    <div>

      <NuxtLink v-for="post in allPosts" :key="post.path" :to="post.path">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <p>{{ formatDate(post.date) }}</p>
         <NuxtImg :src="`${post.image}`" :alt="post.title" class=" w-full inset-0 bg-cover bg-center z-0" />
      </NuxtLink>
    </div>
  </div>
  </template>

<script setup lang="ts">
const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('work')
    .order('date', 'DESC')
    .all()
})

function formatDate(inputDate: string | number | Date) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
//   const formattedDate = day + ". " + months[month] + " " + year;
//   const formattedDate = day + "." + (month+1) + "." + year;
  const formattedDate = year + "." + (month+1) + "." + day;
  return formattedDate;
}
// const allPosts = await queryCollection('blog').order('date',"DESC").all()


</script>