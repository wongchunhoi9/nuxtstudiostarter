<template>
    <Head>
    <Title> Work - wongchunhoi9 </Title>
    <Meta name="Artwork Made by Wong Chun Hoi"  />
  </Head>

  <div class="container mx-auto md:px-4 px-2">
    <!-- Title and Filter Drawer Button -->
    <div class="flex justify-between items-center my-8">
      <h1 class="text-4xl font-black ">Work</h1>
      <!-- Drawer Toggle Button (Mobile View) -->
      <button
        class="lg:hidden "
        @click="toggleFilters"
        :class="{
            ' ': selectedCategory === null,
            'bg-greenled': selectedCategory !== null
          }"
      >
        Filters
      </button>
      
    </div>

    <!-- Responsive Filter Drawer -->
    <div
      v-if="showFilters"
      class="fixed top-20 left-0 w-4/5 h-4/5 bg-white border-black border-2 p-4 z-50 overflow-y-auto "
    >
      <!-- Close Button -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Categories</h3>
        <button
          class=" font-semibold"
          @click="toggleFilters"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
      </div>
      <ul class="space-y-2">
        <li
          class="cursor-pointer hover:text-blue-500"
          :class="{
            'text-blue-500 font-bold': selectedCategory === null,
            'text-gray-700': selectedCategory !== null
          }"
          @click="resetFilters"
        >
          ALL
        </li>
        <div class="flex flex-wrap md:block gap-4">

          <li
          v-for="(category, index) in uniqueCategories"
          :key="index"
          class="cursor-pointer hover:text-blue-500 block" 
          :class="{
            'text-blue-500 font-bold': selectedCategory === category,
            'text-gray-700': selectedCategory !== category
          }"
          @click="filterByCategory(category)"
          >
          {{ category }}
        </li>
      </div>
      </ul>
    </div>

    <!-- Filtered Category Display (Mobile View) -->
    <div v-if="selectedCategory" class="lg:hidden mb-4 text-sm text-gray-700">
      <p class="text-sm text-end">
        Showing results for: 
        <span class="font-bold text-blue-500">{{ selectedCategory }}</span>
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Sidebar (Visible on Larger Screens) -->
      <aside class="hidden lg:block col-span-1">
        <h2 class="text-xl font-semibold mb-4 text-gray-500">Filters</h2>
        <div class="mb-4">
          <h3 class="text-md text-gray-500 ">Categories</h3>
          <ul>
            <!-- "ALL" Button -->
            <li
              class="cursor-pointer hover:bg-orangerelaylight inline-block mr-2 px-3"
              :class="{
                'text-sm  bg-greenled mr-2': selectedCategory === null,
                'text-sm text-gray-500': selectedCategory !== null
              }"
              @click="resetFilters"
            >
              ALL
            </li>
            <!-- Category List -->
            <li
              v-for="(category, index) in uniqueCategories"
              :key="index"
              class="inline-block text-sm px-3 bg-gray-100 mr-2"
              :class="{
                'bg-greenled font-semibold': selectedCategory === category,
                'text-gray-400': selectedCategory !== category
              }"
              @click="filterByCategory(category)"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </aside>

      <!-- Work Posts -->
      <div class="col-span-1 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.path"
          :to="post.path"
          class="relative group"
        >
          <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
          <div class="text-left">
            <p>{{ formatDate(post.date) }}</p>
          </div>
          <NuxtImg
            :src="`${post.img}`"
            :alt="post.title"
            class="w-full inset-0 bg-cover bg-center z-0"
          />
          <p
            v-for="(category, n) in post.category"
            :key="n"
            class="inline-block text-xs px-3 bg-gray-100 mr-2"
          >
            {{ category }}
          </p>
          <div
            class="absolute inset-0 bg-relayorangelight opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          ></div>
        </NuxtLink>
      </div>
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

// State for filters
import { ref, computed } from 'vue'
const selectedCategory = ref(null)
const showFilters = ref(false) // State for toggling filters on mobile

// Get unique categories
const uniqueCategories = computed(() =>
  [...new Set(allPosts.value.map((post) => post.category).flat())]
)

// Filtered posts based on selected filters
const filteredPosts = computed(() => {
  return allPosts.value.filter((post) => {
    const matchesCategory =
      !selectedCategory.value || post.category.includes(selectedCategory.value)
    return matchesCategory
  })
})

// Filter functions
function filterByCategory(category) {
  selectedCategory.value = selectedCategory.value === category ? null : category
}

// Reset filters
function resetFilters() {
  selectedCategory.value = null
}

// Toggle filters for mobile view
function toggleFilters() {
  showFilters.value = !showFilters.value
}

function formatDate(inputDate: string | number | Date) {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const formattedDate = year // display year only
  return formattedDate
}
</script>