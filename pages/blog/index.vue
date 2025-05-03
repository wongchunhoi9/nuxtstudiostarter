<script setup lang="ts">
const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .all()
})

// Filters
const selectedCategories = ref<string[]>([])
const dateFilter = ref<{ from: string | null; to: string | null }>({
  from: null,
  to: null,
})

// Drawer state for responsive view
const isDrawerOpen = ref(false)

// Get unique categories from posts
const uniqueCategories = computed(() => {
  const categories = (allPosts.value ?? []).flatMap((post: any) => post.tags || [])
  return [...new Set(categories)]
})

// Filtered posts based on selected categories and date range
const filteredPosts = computed(() => {
  if (!allPosts.value) {
    console.warn('allPosts.value is undefined or null')
    return []
  }

  const filtered = (allPosts.value ?? []).filter((post: any) => {
    if (!post.tags || !Array.isArray(post.tags)) {
      console.warn('Post is missing tags or tags is not an array:', post)
      return false
    }

    const matchesCategory =
      !selectedCategories.value.length ||
      post.tags.some((tag: string) => selectedCategories.value.includes(tag))

    const matchesDate =
      (!dateFilter.value.from || new Date(post.date) >= new Date(dateFilter.value.from)) &&
      (!dateFilter.value.to || new Date(post.date) <= new Date(dateFilter.value.to))

    return matchesCategory && matchesDate
  })

  return filtered
})

// Format date for display
function formatDate(inputDate: string | number | Date) {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Toggle category selection
const toggleCategory = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter((c) => c !== category)
  } else {
    selectedCategories.value.push(category)
  }
}

// Toggle drawer menu
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

// Compute the filter status
const filterStatus = computed(() => {
  const categoryCount = selectedCategories.value.length
  const dateCount = dateFilter.value.from || dateFilter.value.to ? 1 : 0
  const totalFilters = categoryCount + dateCount
  return totalFilters > 0 ? `(${totalFilters} active)` : ''
})
</script>
<template>
    <h1 class="text-4xl  mb-8 ">
      Blog
    </h1>
  <div class="flex flex-col md:flex-row">
    <!-- Drawer Toggle Button for Responsive View -->
    <button
      class="md:hidden p-2 bg-gray-200 text-gray-700 rounded mb-4 "
      @click="toggleDrawer"
    >
      <span>
        {{ isDrawerOpen ? 'Close Filters' : ' Filters' }}
      </span>
      <span v-if="selectedCategories.length || dateFilter.from || dateFilter.to" class="ml-2 text-sm text-gray-500">
        (Applied: 
        <span v-for="(tag, index) in selectedCategories" :key="tag">
          {{ tag }}<span v-if="index < selectedCategories.length - 1">, </span>
        </span>
        <span v-if="dateFilter.from || dateFilter.to">
          {{ dateFilter.from ? `From: ${dateFilter.from}` : '' }}
          {{ dateFilter.to ? `To: ${dateFilter.to}` : '' }}
        </span>)
      </span>
    </button>

    <!-- Filter Section -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 bg-white z-50 p-4 transform transition-transform md:relative md:translate-x-0 md:w-1/4 border-b md:border-b-0 md:border-r border-gray-300',
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      class="w-2/3 md:w-1/4 md:sticky md:top-0 md:h-screen md:overflow-y-auto"
    >
      <!-- Close Drawer Button -->
      <button
        class="md:hidden absolute top-4 right-4 p-2 text-gray-700 hover:text-black"
        @click="toggleDrawer"
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

      <h3 class="font-bold mb-4">Filters</h3>

      <!-- Category Filter -->
      <div class="flex gap-2 flex-wrap md:block">
        <div
          v-for="category in uniqueCategories"
          :key="category"
          class="whitespace-nowrap py-1"
        >
          <span
            :class="[
              'p-2 rounded cursor-pointer',
              selectedCategories.includes(category)
                ? 'bg-[#5bffa7] text-black font-bold shadow-xl '
                : 'bg-gray-200 text-gray-700 hover:bg-relayorange'
            ]"
            @click="toggleCategory(category)"
          >
            {{ category }}
          </span>
        </div>
      </div>

      <!-- Date Filter -->
      <div class="mt-4 sticky top-0 bg-white z-10">
        <h4 class="font-semibold mb-2">Date</h4>
        <label class="block mb-2">
          From:
          <input
            type="date"
            v-model="dateFilter.from"
            class="border rounded p-1 w-full"
          />
        </label>
        <label class="block">
          To:
          <input
            type="date"
            v-model="dateFilter.to"
            class="border rounded p-1 w-full"
          />
        </label>
      </div>
    </aside>

    <!-- Blog Posts -->
    <div class="w-full md:w-3/4 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <NuxtLink
        v-for="post in filteredPosts"
        :key="post.path"
        :to="post.path"
        class="block mb-6"
      >
        <NuxtImg
        loading="lazy"
        :src="`${post.img}`"
        :alt="post.title"
        quality="50"
        width="500"
        class="w-full inset-0 bg-cover bg-center z-0 mb-2"
        />
        <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
        <p class="mb-2">{{ post.description }}</p>
        <div class="article-tag gap-2 flex flex-wrap mb-2">
          <div
            v-for="(tag, n) in post.tags"
            :key="n"
            class="bg-gray-200 px-2 py-1 rounded"
          >
            {{ tag }}
          </div>
        </div>
        <p class="text-sm text-gray-500">{{ formatDate(post.date) }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Ensure tags stay in one row without breaking */
.whitespace-nowrap {
  white-space: nowrap;
}

/* Sticky date filter */
.sticky {
  position: sticky;
}

/* Prevent filter from covering navigation bar in desktop view */
.md\:sticky {
  top: 4rem; /* Adjust this value based on your navigation bar height */
}
</style>