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
      ? 'bg-greenled text-black font-bold shadow-xl '
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
</template>