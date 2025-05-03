<template>
  <Head>
    <Title> Sound Design - wongchunhoi9 </Title>
    <Meta name="Work made by wong chun hoi"  />
  </Head>
  <div class="container mx-auto md:px-4 px-2">

   <!-- Heading -->
    <h1 class="text-4xl  my-8 font-black">
      Sound Design
    </h1>

    <!-- List of post -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:p-4 pb-8">
      <NuxtLink
        v-for="post in allPosts"
        :key="post.path"
        :to="post.path"
        class="relative group"
      >
      <h2 class="text-2xl font-medium">{{ post.title }}</h2>
      <p class="pr-4 text-end">{{ formatDate(post.date) }}</p>
      <p class=" text-gray-800 md:px-4 md:text-end text-xl">
        {{ post.medium }}
      </p>
      
        <!-- Post Image -->
        <NuxtImg
          :src="`${post.img}`"
          :alt="post.title"
          class="w-full inset-0 bg-cover bg-center z-0"
        />

        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-relayorangelight opacity-0 group-hover:opacity-70 transition-opacity duration-300"
        ></div>

        <!-- Post Content -->
        <div class="relative z-10 p-4">
          <div class="post-description md:p-2 md:block hidden text-sm">
            {{ post.description }}
          </div>
          <div class="tag-list px-1">
            <div
              v-for="(category, n) in post.categories"
              :key="n"
              class="tag inline-block bg-gray-200 rounded px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            >
              {{ category }}
            </div>
          </div>
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