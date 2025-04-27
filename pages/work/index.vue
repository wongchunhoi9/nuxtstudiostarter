<template>

  <div class="container mx-auto md:px-4 px-2">
    <h1 class="text-4xl  my-8">
      Work
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-4  md:p-4 pb-8">
      <NuxtLink v-for="post in allPosts" :key="post.path" :to="post.path" class="hover:bg-relayorange mb-8 md:mb-0">
        <NuxtImg :src="`${post.img}`" :alt="post.title" class=" w-full inset-0 bg-cover bg-center z-0" />
        <h2 class=" text-2xl">{{ post.title }}</h2>
        <!-- <p>{{ post.description }}</p> -->
        <p>{{ formatDate(post.date) }}</p>
         <p v-for="(category, n) in post.category" :key="n" class="inline-block text-xs px-3 bg-gray-100 mr-2" > {{ category }}  </p>
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
  // const formattedDate = year + "." + (month+1) + "." + day;
  const formattedDate = year;  //display year only
  return formattedDate;
}
// const allPosts = await queryCollection('blog').order('date',"DESC").all()


</script>