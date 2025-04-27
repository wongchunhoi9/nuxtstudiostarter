<script setup lang="ts">
import { NuxtImg } from '#components'
import Fuse from 'fuse.js'
import { useRouter } from 'vue-router'

// Define the emit function for the 'link-clicked' event
const emit = defineEmits(['link-clicked'])

const query = ref('')
const { data } = await useAsyncData('search-data', () => queryCollectionSearchSections('allContent'))
// console.log('All Searchable data:', data.value)

const fuse = new Fuse(data.value, {
  keys: ['title', 'description','img']
})
// console.log('fuse data set:', fuse)

const result = computed(() => fuse.search(toValue(query)).slice(0, 10))

const router = useRouter()
const activeIndex = ref(-1) // Track the currently highlighted index

const handleLinkClick = (id: string) => {
  query.value = ''; // Clear the search query
  activeIndex.value = -1; // Reset the active index
  router.push(id); // Navigate to the selected page
  emit('link-clicked'); // Notify the parent to close the drawer
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (!result.value.length) return

  if (event.key === 'ArrowDown') {
    // Move down in the list
    activeIndex.value = (activeIndex.value + 1) % result.value.length
  } else if (event.key === 'ArrowUp') {
    // Move up in the list
    activeIndex.value = (activeIndex.value - 1 + result.value.length) % result.value.length
  } else if (event.key === 'Enter' && activeIndex.value >= 0) {
    // Select the active item
    handleLinkClick(result.value[activeIndex.value].item.id)
  }
}

const clearQuery = () => {
  query.value = '' // Clear the search query
  activeIndex.value = -1 // Reset the active index
}
</script>

<template>
  <div class="px-2 ">
    <div class="rounded-md relative">
      <input
        v-model="query"
        placeholder="Search..."
        class="w-full text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
        @keydown="handleKeyDown"
      />
      <button
          v-if="query"
          @click="clearQuery"
          class="absolute right-2 text-gray-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
      </button>
      <ul v-if="query && result.length" class="absolute z-10 bg-white border-2">
        <li
          v-for="(link, index) of result"
          :key="link.item.id"
          :class="[
            'mt-2 border-2 hover:bg-relayorange',
            { 'bg-orange-100': index === activeIndex }
          ]"
        >
          <button
            @click="handleLinkClick(link.item.id)"
            class="w-full text-left p-2"
          >
            
            {{ link.item.title }}
            <span class="text-gray-500 text-xs">
              {{ link.item.content?.slice(0, 100) }}...
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>