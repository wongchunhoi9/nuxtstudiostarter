<template>
    <h2 :id="props.id" class="text-3xl md:mt-8 md:mb-4 mt-4 font-semibold">
      <a
        v-if="props.id && generate"
        :href="`#${props.id}`"
      >
        <slot />
      </a>
      <slot v-else />
    </h2>
  </template>
  
  <script setup lang="ts">
  import { computed, useRuntimeConfig } from '#imports'
  
  const props = defineProps<{ id?: string }>()
  
  const { headings } = useRuntimeConfig().public.mdc
  const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
  </script>