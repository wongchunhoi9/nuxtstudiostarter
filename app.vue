<template>
  <NuxtLayout>
      <!-- <NuxtWelcome /> -->
      <!-- <div class="relative bg-[#fffefb]"> -->

      <div class="relative ">
      <NuxtPage />
      </div>
      <NuxtLoadingIndicator color="#8CFCAF" /> <!-- here -->
  </NuxtLayout>
  </template>

<script setup lang="ts">
useHead({
  title: 'wongchunhoi9.com',
  meta: [
    { name: 'Wong Chun Hoi 王鎮海', content: 'Personal Website' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})
</script>


