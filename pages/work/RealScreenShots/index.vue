<script setup lang="ts">
const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('RealScreenShots')
    .order('date', 'DESC')
    .all()
})
const showcase1  = await queryCollection('RealScreenShots').path(`/work/realscreenshots/showcase1`).first()

// debug use
// const specificPost  = await queryCollection('RealScreenShots').path(`/work/realscreenshots/showcase1`).first()
// console.log('specificPost', specificPost)

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
  <div class="container mx-auto max-w-6xl px-4">

    <h1 class="px-4 text-4xl  my-4 font-bold">
    </h1>
    <div class="py-4">
      <h1 class="text-4xl font-extrabold my-7">Real Screenshots 螢幕快照</h1>
      <p class="">image image archive</p>
      <p class="">on going from 2020</p>
    </div>

    
    <!-- display showcase #1 @ pointsman -->
    <ContentRenderer :value="showcase1" />

    

    
    <!-- photo collection -->
     <h1 class="">photo collection     </h1>

    <div class="w-full  p-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 ">
      <NuxtLink
      v-for="post in filteredPosts"
      :key="post.path"
      :to="post.path"
      class="block md:mb-0 hover:z-10  relative"
      >
      <div class="md:bg-relayorange  from-black md:opacity-0 hover:opacity-80  md:absolute inset-0 z-10  md:justify-center flex flex-col font-semibold items-center text-black md:text-xl text-2xl  p-2 ">
          {{ post.title }}
          <br>

      </div>
      
      <NuxtImg      
      :src="`${post.img}`"
      :alt="post.title"
      :modifiers="{ rotate: null }" 
      quality="50"
      width="100"
      height="100"
      class="w-full inset-0 z-0 h-full  object-cover transition-all duration-200 ease-in-out transform hover:scale-110 hover:shadow-lg relative"
      />
      <!-- image overlay on hover image  -->


      <!-- <div class="hidden md:block ">
        <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
        <div class="flex">
          <p class="text-sm text-gray-500 pr-4">{{ formatDate(post.date) }}</p>
          <p class="text-sm text-gray-500">{{post.time }}</p> 
        </div>
        <p class="text-sm text-gray-500">{{ post.location}}</p>
    </div> -->
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