<script setup lang="ts">
import Fuse from 'fuse.js'

const query = ref('')
const { data } = await useAsyncData('search-data', () => queryCollectionSearchSections('allContent'))
console.log('All Searchable data:', data.value)

const fuse = new Fuse(data.value, {
  keys: ['title', 'description']
})

const result = computed(() => fuse.search(toValue(query)).slice(0, 10))

// console.log('queryL', result)


</script>

<template>
  <div class="p-4 border-black border-b-2">
    <div>

        <input v-model="query" placeholder="Search..." class="w-1/4 border-b-1" />
        <ul class="absolute z-10 bg-white border-2">
            <li v-for="link of result" :key="link.item.id" class="mt-2 border-2 hover:bg-orange-50">
                <NuxtLink :to="link.item.id">
                    <button variant="ghost" class="" :to="link.item.id">
                        {{ link.item.title }}
                        <span class="text-gray-500 text-xs">
                            {{ link.item.content?.slice(0, 100) }}...
                        </span>
                    </button>
                </NuxtLink>
            </li>
        </ul>
    </div>
  </div>
</template>