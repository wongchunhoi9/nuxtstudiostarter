<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const tocItems = ref([])
const activeId = ref('')
const isDrawerOpen = ref(false)

// Generate TOC from content
const generateToc = () => {
  const headings = document.querySelectorAll('h1, h2, h3')
  return Array.from(headings).map(heading => ({
    id: heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-'),
    text: heading.innerText,
    level: parseInt(heading.tagName[1])
  }))
}

// Handle scroll and highlight active section
const handleScroll = () => {
  const headings = document.querySelectorAll('h1, h2, h3')
  const scrollPosition = window.scrollY

  for (const heading of Array.from(headings).reverse()) {
    if (heading.offsetTop <= scrollPosition + 100) {
      activeId.value = heading.id
      break
    }
  }
}

// Scroll to section
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    // Close drawer on mobile after clicking
    isDrawerOpen.value = false
  }
}

// Toggle drawer for mobile
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

// Initialize
onMounted(() => {
  nextTick(() => {
    tocItems.value = generateToc()
    window.addEventListener('scroll', handleScroll)
  })
})

watch(() => props.content, () => {
  nextTick(() => {
    tocItems.value = generateToc()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Mobile TOC Toggle Button -->
    <button 
      @click="toggleDrawer"
      class="md:hidden fixed bottom-4 right-4 bg-white shadow-lg rounded-full p-3 z-50"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <!-- TOC Navigation -->
    <nav 
      :class="[
        'toc-nav transition-transform duration-300',
        'md:translate-x-0 md:static md:top-4',
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full',
        'fixed right-0 top-0 h-screen bg-white z-40 w-64 shadow-lg md:shadow-none'
      ]"
    >
      <!-- Mobile Close Button -->
      <button 
        @click="toggleDrawer"
        class="md:hidden absolute top-4 right-4 p-2"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- TOC Content -->
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4 md:hidden">Contents</h3>
        <ul class="space-y-2">
          <li 
            v-for="item in tocItems" 
            :key="item.id"
            class="toc-item"
            :class="[
              `pl-${(item.level - 1) * 4}`,
              activeId === item.id ? 'active' : ''
            ]"
            @click="scrollToSection(item.id)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.toc-nav {
  @apply max-h-[calc(100vh-2rem)] overflow-y-auto pr-4;
}

.toc-item {
  @apply cursor-pointer text-gray-600 hover:text-gray-900 transition-colors py-1;
}

.toc-item.active {
  @apply text-black font-medium;
}

/* Prevent body scroll when mobile drawer is open */
:global(body.drawer-open) {
  overflow: hidden;
}
</style>