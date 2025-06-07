
<script setup lang="ts">
import { ref, watch } from 'vue'

interface LostItem {
  title: string
  date: string
  time: string
  FoundItemNameEng: string
  FoundItemNameChi: string
  customeID: string
  whoFound: string
  foundLocationEng: string
  foundLocationChi: string
  foundDate: string
  media: string[]
  active: boolean
  path: string
}


const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('LostAndFoundAnythingStore')
    // .where({ active: true })
    .order('customeID', 'ASC')
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

// Replace the currentImageIndex ref and navigation functions in the script section
const currentImageIndices = ref<{ [key: string]: number }>({})

// Watch for allPosts changes and initialize indices
watch(() => allPosts.value, (posts) => {
  if (posts) {
    posts.forEach(post => {
      if (!currentImageIndices.value[post.path]) {
        currentImageIndices.value[post.path] = 0
      }
    })
  }
}, { immediate: true })

// Update the navigation functions with null checks
const nextImage = (path: string, media: string[]) => {
  if (!currentImageIndices.value[path]) {
    currentImageIndices.value[path] = 0
  }
  currentImageIndices.value[path] = (currentImageIndices.value[path] + 1) % media.length
}

const previousImage = (path: string, media: string[]) => {
  if (!currentImageIndices.value[path]) {
    currentImageIndices.value[path] = 0
  }
  currentImageIndices.value[path] = currentImageIndices.value[path] === 0 
    ? media.length - 1 
    : currentImageIndices.value[path] - 1
}

// const currentImageIndex = ref(0)

// const nextImage = (media: string[]) => {
//   currentImageIndex.value = (currentImageIndex.value + 1) % media.length
// }

// const previousImage = (media: string[]) => {
//   currentImageIndex.value = currentImageIndex.value === 0 
//     ? media.length - 1 
//     : currentImageIndex.value - 1
// }
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-4xl  my-8 font-black ">
      Lost and Found Anything Store 失物萬事屋 
    </h1>
    
    <!-- Table Header -->
    <div class="hidden md:grid md:grid-cols-[40px_100px_1.5fr_1fr_1fr_1fr] gap-4 py-2 px-4 bg-gray-100 font-medium text-sm">
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
        class="border-b border-gray-500 last:border-b-0"
        @mouseenter="handleHover(post.path)"
        @mouseleave="handleHover(null)"
      >
        <!-- Item Row -->
          <div
          @click="toggleItem(post.path)"
          class="group grid md:grid-cols-[40px_100px_1.5fr_1fr_1fr_1fr] gap-4 py-4 px-4 cursor-pointer hover:bg-relayorange/10"
          >
            <!-- ID Column -->
            <div class="flex ">
              <span>{{ post.customeID }}</span>
            </div>
            <!-- Thumbnail Column -->
            <div class="relative">
              <!-- Main Thumbnail -->
              <div class="w-16 h-16 rounded-md">
                <NuxtImg
                  :src="post.media?.[0] || '/placeholder.jpg'"
                  :alt="post.FoundItemNameEng"
                  class="w-full h-full object-contain"
                  loading="lazy"
                  quality="50"
                  width="100"
                  height="100"
                  :modifiers="{ rotate: null }"
                />
              </div>
            </div>
            <div class="flex gap-2 ">
              <span>{{ post.FoundItemNameEng }}</span>
              <span>{{ post.FoundItemNameChi }}</span>
            </div>
            <div>{{ post.whoFound || 'Unknown' }}</div>
            <div class="">
              <span class="block">{{ post.foundLocationEng || 'Unknown' }}</span>
              <span>{{ post.foundLocationChi || 'Unknown'  }}</span>
            </div>
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
          <div class="aspect-square rounded-lg overflow-hidden ">
            <img
              v-if="post.media?.length"
              :src="post.media[currentImageIndices[post.path] || 0]?.startsWith('/') 
                ? post.media[currentImageIndices[post.path] || 0] 
                : `/${post.media[currentImageIndices[post.path] || 0]}`"
              :alt="`${post.FoundItemNameEng} - Image ${(currentImageIndices[post.path] || 0) + 1}`"
              class="w-full h-full object-contain"
              @error="(e) => e.target.src = '/placeholder.jpg'"
              loading="lazy"
            />
            <div 
              v-else 
              class="w-full h-full flex items-center justify-center text-gray-400"
            >
              No Images Available
            </div>
          </div>
          <!-- Add console log for debugging -->
          <!-- <div class="hidden">
          {{ console.log('Current index:', currentImageIndices[post.path]) }}
          {{ console.log('Current image:', post.media[currentImageIndices[post.path]]) }}
          {{ console.log('Total images:', post.media?.length) }}
          </div> -->
  
        <!-- Navigation Arrows -->
        <button 
          v-if="post.media?.length > 1"
          @click.stop="previousImage(post.path, post.media)"
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          v-if="post.media?.length > 1"
          @click.stop="nextImage(post.path, post.media)"
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
          {{ (currentImageIndices[post.path] || 0) + 1 }} / {{ post.media.length }}
        </div>
      </div>

            <!-- Information Column -->
            <div class="w-full md:w-1/3 space-y-4 mt-4 md:mt-0">
              <h3 class="text-xl font-medium">{{ post.FoundItemNameEng }}</h3>
              <h3 class="text-xl font-medium">{{ post.FoundItemNameChi }}</h3>
              
              <div class="space-y-2 text-sm">
                <!-- <p class="text-gray-600">{{ post.description }}</p> -->
                
                <div class="grid gap-2">
                  <!-- ...existing specification fields... -->
                </div>

                <div class="mt-4 space-y-2 border-t pt-4">
                  <!-- <h4 class="font-medium">Specifications:</h4> -->
                  <p>{{ post.size }}</p>
                  <p>{{ post.spec1 }}</p>
                  <p>{{ post.spec2 }}</p>
                </div>

                <div class="mt-4 border-t pt-4">
                  <!-- <h4 class="font-medium mb-2">Item Story:</h4> -->
                  <!-- <p class="mb-2">{{ post.itemStoryEnglish }}</p>
                  <p class="font-noto-tc">{{ post.itemStoryChinese }}</p> -->
                  <ContentRenderer :value="post" class="text-sm"/>
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