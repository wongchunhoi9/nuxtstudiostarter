<template>

  <div class="container mx-auto md:px-4 px-2">
    <h1 class="text-4xl  my-8">
      Sound Design
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8  md:p-4 pb-8">

      <NuxtLink v-for="post in allPosts" :key="post.path" :to="post.path">
        <h2 class=" text-2xl">{{ post.title }}</h2>
        <!-- <p>{{ post.description }}</p> -->
        <p>{{ formatDate(post.date) }}</p>
        <span class=" text-slate-700 md:px-4 text-xl">
            {{ post.medium }}
        </span>
         <NuxtImg :src="`${post.img}`" :alt="post.title" class=" w-full inset-0 bg-cover bg-center z-0" />
         <!-- <p v-for="(category, n) in post.category" :key="n" class="inline-block text-xs px-3 bg-gray-100 mr-2" > {{ category }}  </p> -->
         <div class="work-medium-and-year flex my-2">
              <!-- <span class="bg-slate-50 text-gray-500 mx-4 px-4 ">
                  {{ post.year }}
              </span> -->
          </div>
          
          <div class="post-discription md:p-2 md:block hidden text-sm ">
              {{ post.description }}
          </div>
          <div class="tag-list px-1">
              <div v-for="(category, n) in post.categories" :key="n" class="tag inline-block bg-gray-200 rounded px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2" >{{ category }}</div>
          </div>
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