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
  media: string[]
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
    <div class="hidden md:grid md:grid-cols-[40px_80px_1.5fr_1fr_1fr_1fr] gap-4 py-2 px-4 bg-gray-100 font-medium text-sm">
      <div>ID</div>
      <div>Thumb</div>
      <div>Item Name</div>
      <div>Found By</div>
      <div>Location</div>
      <div>Found Date</div>
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
          class="group grid md:grid-cols-[40px_80px_1.5fr_1fr_1fr_1fr] gap-4 py-4 px-4 cursor-pointer hover:bg-gray-50"
          >
            <!-- ID Column -->
            <div class="flex ">
              <span>{{ post.customeID }}</span>
            </div>
            <!-- Thumbnail Column -->
            <div class="relative">
              <!-- Main Thumbnail -->
              <div class="w-16 h-16 rounded-md overflow-hidden">
                <img
                  :src="post.media?.[0] || '/placeholder.jpg'"
                  :alt="post.FoundItemName"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="flex ">
              <span>{{ post.FoundItemName }}</span>
            </div>
            <div>{{ post.whoFound || 'Unknown' }}</div>
            <div>{{ post.foundLocation || 'Unknown' }}</div>
      <div class="flex  justify-between">
        <span>{{ post.foundDate || 'Unknown' }}</span>
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
              <!-- Add error handling and fallback -->
              <NuxtImg
                :src="media.startsWith('/') ? media : `/${media}`"
                :alt="`${post.FoundItemName} - Image ${index + 1}`"
                class="w-full h-full object-contain"
                quality="80"
                loading="lazy"
                height="100"
                width="100"
                :modifiers="{ rotate: null }"
                @error="(e) => e.target.src = '/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- Replace the Expanded Content section -->
        <div
          v-show="expandedItems.has(post.path)"
          class="overflow-hidden transition-all duration-300 p-4"
        >
          <div class="flex flex-col md:flex-row gap-4">
            <!-- 3D Model Column -->
            <div class="w-full md:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden">
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
            <div class="w-full md:w-1/3 relative">
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
                v-if="post.media?.length > 1"
                @click.stop="previousImage(post.media)"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full"
              >
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                v-if="post.media?.length > 1"
                @click.stop="nextImage(post.media)"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full"
              >
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Image Counter -->
              <div 
                v-if="post.media?.length > 1"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {{ currentImageIndex + 1 }} / {{ post.media?.length }}
              </div>
            </div>

            <!-- Information Column -->
            <div class="w-full md:w-1/3 space-y-4 mt-4 md:mt-0">
              <h3 class="text-xl font-medium">{{ post.FoundItemName }}</h3>
              
              <div class="space-y-2 text-sm">
                <p class="text-gray-600">{{ post.description }}</p>
                
                <div class="grid gap-2">
                  <!-- ...existing specification fields... -->
                </div>

                <div class="mt-4 space-y-2 border-t pt-4">
                  <h4 class="font-medium">Specifications:</h4>
                  <p>{{ post.spec1 }}</p>
                  <p>{{ post.spec2 }}</p>
                </div>

                <div class="mt-4 border-t pt-4" v-if="post.itemStoryEnglish || post.itemStoryChinese">
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