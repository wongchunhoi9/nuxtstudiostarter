<script setup lang="ts">
interface LostItem {
  title: string
  date: string
  time: string
  FoundItemName: string
  customeID: string
  whoFound: string
  foundLocation: string
  foundDate: string
  Media: string[]
  active: boolean
  path: string
}

const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('LostAndFoundAnythingStore')
    // .where({ active: true })
    .order('date', 'DESC')
    .all()
})

const expandedItems = ref(new Set())
const hoveredItem = ref<string | null>(null)

const toggleItem = (path: string) => {
  if (expandedItems.value.has(path)) {
    expandedItems.value.delete(path)
  } else {
    expandedItems.value.add(path)
  }
  hoveredItem.value = null
}

const handleHover = (path: string | null) => {
  if (!expandedItems.value.has(path)) {
    hoveredItem.value = path
  }
}

const currentImageIndex = ref(0)

const nextImage = (media: string[]) => {
  currentImageIndex.value = (currentImageIndex.value + 1) % media.length
}

const previousImage = (media: string[]) => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? media.length - 1 
    : currentImageIndex.value - 1
}
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-4xl  my-8 font-black ">
      Lost and Found Anything Store Collection
    </h1>
    
    <!-- Table Header -->
    <div class="hidden md:grid md:grid-cols-5 gap-4 py-2 px-4 bg-gray-100 font-medium text-sm">
      <div>Item Name</div>
      <div>Found By</div>
      <div>Location</div>
      <div>Found Date</div>
      <div>ID</div>
    </div>

    <!-- Items List -->
    <div class="space-y-2">
      <div
        v-for="post in allPosts"
        :key="post.path"
        class="border-b border-gray-200 last:border-b-0"
        @mouseenter="handleHover(post.path)"
        @mouseleave="handleHover(null)"
      >
        <!-- Item Row -->
        <div
          @click="toggleItem(post.path)"
          class="group grid md:grid-cols-5 gap-4 py-4 px-4 cursor-pointer hover:bg-gray-50"
        >
          <!-- Item Details -->
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-gray-400 group-hover:text-gray-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <span>{{ post.FoundItemName }}</span>
          </div>
          <div>{{ post.whoFound || 'Unknown' }}</div>
          <div>{{ post.foundLocation || 'Unknown' }}</div>
          <div>{{ post.foundDate || 'Unknown' }}</div>
          <div class="flex items-center justify-between">
            <span>{{ post.customeID }}</span>
            <svg
              class="w-5 h-5 transform transition-transform duration-200"
              :class="expandedItems.has(post.path) ? 'rotate-180' : ''"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <!-- Thumbnails Preview Row -->
        <div
          v-if="hoveredItem === post.path && post.media?.length"
          class="px-4 pb-4 transition-all duration-300"
        >
          <div class="flex gap-4 overflow-x-auto pb-2">
            <div
              v-for="(media, index) in post.media"
              :key="index"
              class="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md shadow-lg"
            >
              <NuxtImg
                :src="media"
                :alt="`${post.FoundItemName} - Image ${index + 1}`"
                class="w-full h-full object-conatin"
                quality="80"
                loading="lazy"
                height="100"
                width="100"
                :modifiers="{ rotate: null }"
              />
            </div>
          </div>
        </div>

        <!-- Expanded Content -->
        <div
          v-show="expandedItems.has(post.path)"
          class="overflow-hidden transition-all duration-300 p-4"
        >
          <div class="flex gap-4">
            <!-- 3D Model Column -->
            <div class="w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                v-if="post.modelEmbeddedLink"
                :src="post.modelEmbeddedLink"
                class="w-full h-full"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                frameborder="0"
              ></iframe>
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                No 3D Model Available
              </div>
            </div>

            <!-- Image Gallery Column -->
            <div class="w-1/3 relative">
              <div class="aspect-square rounded-lg overflow-hidden">
                <NuxtImg
                  v-if="post.media?.length"
                  :src="post.media[currentImageIndex]"
                  :alt="`${post.FoundItemName} - Image ${currentImageIndex + 1}`"
                  class="w-full h-full object-contain"
                  quality="80"
                  :modifiers="{ rotate: null }"
                />
              </div>
              
              <!-- Navigation Arrows -->
              <button 
                @click="previousImage(post.media)"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                @click="nextImage(post.media)"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Image Counter -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {{ currentImageIndex + 1 }} / {{ post.media?.length }}
              </div>
            </div>

            <!-- Information Column -->
            <div class="w-1/3 space-y-4">
              <h3 class="text-xl font-medium">{{ post.FoundItemName }}</h3>
              
              <div class="space-y-2 text-sm">
                <p class="text-gray-600">{{ post.description }}</p>
                
                <div class="grid gap-2">
                  <div class="flex justify-between border-b border-gray-200 py-1">
                    <span class="text-gray-500">ID:</span>
                    <span>{{ post.customeID }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-200 py-1">
                    <span class="text-gray-500">Found By:</span>
                    <span>{{ post.whoFound || 'Unknown' }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-200 py-1">
                    <span class="text-gray-500">Location:</span>
                    <span>{{ post.foundLocation || 'Unknown' }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-200 py-1">
                    <span class="text-gray-500">Date:</span>
                    <span>{{ post.foundDate || 'Unknown' }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-200 py-1">
                    <span class="text-gray-500">Size:</span>
                    <span>{{ post.size || 'N/A' }}</span>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  <h4 class="font-medium">Specifications:</h4>
                  <p>{{ post.spec1 }}</p>
                  <p>{{ post.spec2 }}</p>
                </div>

                <div class="mt-4" v-if="post.itemStoryEnglish || post.itemStoryChinese">
                  <h4 class="font-medium mb-2">Item Story:</h4>
                  <p class="mb-2">{{ post.itemStoryEnglish }}</p>
                  <p class="font-noto-tc">{{ post.itemStoryChinese }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar for thumbnail row */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 2px;
}
</style>