<template>
    <NuxtImg 
    :src="src"
    :alt="alt"  
      v-bind="$attrs" 
      class=" mx-auto w-full md:w-auto md:h-auto md:max-h-[90vh]"  
      fit="cover"  
      sizes=" sm:480px md:768px lg:1024px xl:1280px"  
      :modifiers="{ rotate: null }"
    />
  </template>

<script setup lang="ts">

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  }
)
</script>