<template>
    <NuxtLayout>
      <div class="p-4 mx-auto text-center">

        <div class="text-3xl my-7 font-bold">
          {{ error.statusCode }}
        </div>
        <div>
          {{ error.message }}
        </div>
        <div>
          but error can be good
        </div>
        <NuxtImg
          class="mx-auto my-4"
          src="/img/thoseorangeyoucannoteat/orangewebgif/orange33-1080p_1-copy.gif"
          alt="3D model of an orange"
          width="300"
          height="300"></NuxtImg>
        <!-- <model-viewer alt="" class="mx-auto" style="height:40vh;" src="/3dmodel/orange33.gltf"   shadow-intensity="1" camera-controls touch-action="pan-y" camera-orbit="calc(12.5rad + env(window-scroll-y) * 15rad)" auto-rotate></model-viewer> -->
        
      </div>
    </NuxtLayout>
</template>
  

  <script setup>
    defineProps(['error'])
  </script>