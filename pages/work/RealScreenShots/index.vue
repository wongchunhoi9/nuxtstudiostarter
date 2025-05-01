<script setup lang="ts">
const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('RealScreenShots')
    .order('date', 'DESC')
    .all()
})

// debug use
// const specificPost  = await queryCollection('RealScreenShots').path(`/work/RealScreenShots/RealScreenShot-20201201`).first()
//console.log('specificPost', specificPost)

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
  <div class="mx-auto max-w-full">

    <h1 class="text-4xl  my-4">
      Real Screenshots
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
    
  
    
    <!-- Blog Posts -->
    <div class="w-full md:p-4 p-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 md:gap-2">
      <NuxtLink
      v-for="post in filteredPosts"
      :key="post.path"
      :to="post.path"
      class="block md:mb-0"
      >
      <NuxtImg
      loading="lazy"
      :src="`${post.img}`"
      :alt="post.title"
      :modifiers="{ rotate: null }" 
      quality="50"
      width="500"
      class="w-full inset-0 z-0 md:mb-2 h-36 md:h-48 object-cover"
      />
      <div class="hidden md:block ">
        <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
        <div class="flex">
          <p class="text-sm text-gray-500 pr-4">{{ formatDate(post.date) }}</p>
          <p class="text-sm text-gray-500">{{post.time }}</p> 
        </div>
        <p class="text-sm text-gray-500">{{ post.location}}</p>
        <!-- <p class="mb-2">{{ post.description }}</p> -->
        <!-- <div class="article-tag gap-2 flex flex-wrap mb-2">
          <div
          v-for="(tag, n) in post.tags"
          :key="n"
          class="bg-gray-200 px-2 py-1 rounded"
          >
          {{ tag }}
        </div>
      </div> -->
    </div>
  </NuxtLink>
</div>
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