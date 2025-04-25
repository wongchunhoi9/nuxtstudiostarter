<script setup lang="ts">
import MiniSearch from 'minisearch'

const query = ref('')
const { data } = await useAsyncData('search', () => queryCollectionSearchSections('allContent'))

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title', 'path'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

// Add data to the MiniSearch instance
miniSearch.addAll(toValue(data.value))
const result = computed(() => miniSearch.search(toValue(query)))

// Debug: Log documents to verify content
console.log('Documents:', data.value)
// console.log('Result:', result.value)

</script>

<template>
  <div class="p-4">
      <Input v-model="query" placeholder="Search..." class="p-4 border border-zinc-900" />
      <ul>
        <li v-for="link of result" :key="link.id" class="mt-2">
          <NuxtLink :to="link.id">{{ link.title }}</NuxtLink>
          <!-- <p class="text-gray-500 text-xs">{{ link.content }}</p> -->
        </li>
      </ul>
  </div>
</template>
