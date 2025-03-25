<template>
    <NuxtLink v-for="post in allPosts" :key="post.path" :to="post.path">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
    </NuxtLink>
  </template>

<script setup lang="ts">
const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .all()
})

// const allPosts = await queryCollection('blog').order('date',"DESC").all()


</script>