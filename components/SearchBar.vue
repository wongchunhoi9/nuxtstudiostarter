<script setup>
import { ref, computed } from 'vue'
import MiniSearch from 'minisearch'

// Reactive state for search query
const searchQuery = ref('')

// Fetch all content from the 'content' collection
const { data: documents } = await useAsyncData('all-content', () =>
  queryCollection('allContent').first()
)

// Debug: Log documents to verify content
console.log('Documents:', documents.value)

// Initialize MiniSearch
const miniSearch = new MiniSearch({
  fields: ['title', 'content'], // Fields to index
  storeFields: ['title', 'path'], // Fields to return in results
  searchOptions: {
    boost: { title: 2 }, // Prioritize title matches
    fuzzy: 0.3, // Enable fuzzy search
    prefix: true // Allow prefix matching
  }
})

// Index documents
if (documents.value) {
  const indexedDocs = documents.value.map(doc => ({
    id: doc.path, // Unique ID
    title: doc.title || 'Untitled',
    content: doc.body?.toString() || '', // Convert body to string
    path: doc.path
  }))
  console.log('Indexed Documents:', indexedDocs) // Debug: Log indexed documents
  miniSearch.addAll(indexedDocs)
}

// Compute search results
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const results = miniSearch.search(searchQuery.value)
  console.log('Search Results:', results) // Debug: Log search results
  return results.map(result => ({
    title: result.title,
    path: result.path,
    snippet: documents.value
      ?.find(doc => doc.path === result.path)
      ?.body?.toString()
      ?.slice(0, 100) + '...' || ''
  }))
})
</script>

<template>
  <div class="relative max-w-xl mx-auto">
    <!-- Search Input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search content..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <!-- Debug: Display if no results -->
    <div v-if="searchQuery && !searchResults.length" class="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg p-4">
      <p class="text-gray-600">No results found for "{{ searchQuery }}"</p>
    </div>

    <!-- Search Results -->
    <div
      v-if="searchResults.length"
      class="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto"
    >
      <ul>
        <li
          v-for="result in searchResults"
          :key="result.path"
          class="px-4 py-2 hover:bg-gray-100"
        >
          <NuxtLink :to="result.path" class="block">
            <h3 class="font-semibold">{{ result.title }}</h3>
            <p class="text-sm text-gray-600">{{ result.snippet }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>