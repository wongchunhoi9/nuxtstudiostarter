<script setup>
import { ref, computed } from 'vue'
import MiniSearch from 'minisearch'

// Reactive state for search query
const searchQuery = ref('')

// Fetch all content
let documents = ref([])
let fetchError = ref(null)

try {
  const { data, error } = await useAsyncData('all-content', () => queryCollection('blog').first())
  documents = data
  fetchError = error
} catch (err) {
  fetchError.value = err.message
}

// Debug: Log documents and error
console.log('Documents:', documents.value)
console.log('Fetch Error:', fetchError.value)

// Initialize MiniSearch
const miniSearch = new MiniSearch({
  fields: ['title', 'content'], // Fields to index
  storeFields: ['title', '_path'], // Use _path for Nuxt Content
  searchOptions: {
    boost: { title: 2 }, // Prioritize title matches
    fuzzy: 0.2, // Enable fuzzy search
    prefix: true // Allow prefix matching
  }
})

// Index documents if available
if (documents.value && documents.value.length) {
  const indexedDocs = documents.value.map(doc => ({
    id: doc._path, // Use _path for Nuxt Content
    title: doc.title || doc._path.split('/').pop() || 'Untitled', // Fallback title
    content: typeof doc.body === 'string' ? doc.body : JSON.stringify(doc.body) || '', // Ensure string
    _path: doc._path
  }))
  console.log('Indexed Documents:', indexedDocs)
  miniSearch.addAll(indexedDocs)
}

// Compute search results
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const results = miniSearch.search(searchQuery.value)
  console.log('Search Query:', searchQuery.value)
  console.log('Search Results:', results)
  return results.map(result => ({
    title: result.title,
    path: result._path, // Use _path for routing
    snippet: (documents.value?.find(doc => doc._path === result._path)?.body?.toString() || '').slice(0, 100) + '...'
  }))
})
</script>

<template>
  <div class="relative max-w-xl mx-auto">
    <!-- Error or Loading State -->
    <div v-if="fetchError" class="text-red-500 p-2">
      Error fetching content: {{ fetchError }}
    </div>
    <div v-else-if="!documents" class="text-gray-600 p-2">
      Loading content...
    </div>

    <!-- Search Input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search content..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <!-- No Results Message -->
    <div
      v-if="searchQuery && !searchResults.length && documents"
      class="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg p-4"
    >
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