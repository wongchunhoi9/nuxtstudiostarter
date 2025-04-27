<template>

  <div class="container mx-auto md:px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2  md:p-4 pb-8">

      <NuxtLink v-for="post in allPosts" :key="post.path" :to="post.path">
        <h2 class=" text-xl">{{ post.title }}</h2>
        <!-- <p>{{ post.description }}</p> -->
        <p>{{ formatDate(post.date) }}</p>
         <NuxtImg :src="`${post.img}`" :alt="post.title" class=" w-full inset-0 bg-cover bg-center z-0" />
         <p v-for="(category, n) in post.category" :key="n" class="inline-block text-xs px-3 bg-gray-100 mr-2" > {{ category }}  </p>
      </NuxtLink>
    </div>
  </div>
  </template>

<script setup lang="ts">
const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('soundDesign')
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