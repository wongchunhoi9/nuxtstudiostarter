<template>
  <Head>
    <Title> About - wongchunhoi9 </Title>
    <Meta name="About wong chun hoi - (hoi9)
    Artist
    artistic engineer @ floating projects
    1/2 @Noisy Plaster
    sound designer/engineer"  />
  </Head>
<div class="container max-w-6xl mx-auto px-4 py-8">
    <div class="md:flex">
        <div class="md shrink-0 mx-auto md:w-1/3 w-full">
            <NuxtImg
                src="/img/wongchunhoi9_profilepic.svg"
                alt="Portrait of the author"
                class="w-full "
            />
        </div>
        <div>
            <ContentRenderer
            v-if="biography"
            :value="biography"
            :head="false"
            />
        </div>
    </div>
    <hr class="my-4 border-b-2">
    <div>
        <ContentRenderer
            v-if="cv"
            :value="cv"
            :head="false"
        />
    </div>
    <hr class="my-4 border-b-2">
    <div>
        <ContentRenderer
            v-if="bibliography"
            :value="bibliography"
            :head="false"
        />
    </div>
    <hr class="my-4 border-b-2">
    <div>
        <ContentRenderer
            v-if="sounddesign"
            :value="sounddesign"
            :head="false"
        />
    </div>
</div>    

</template>

<script setup lang="ts">
const { data: biography } = await useAsyncData(() => queryCollection('about').path('/about/biography').first())
const { data: cv } = await useAsyncData(() => queryCollection('about').path('/about/cv').first())
const { data: bibliography } = await useAsyncData(() => queryCollection('about').path('/about/bibliography').first())
const { data: sounddesign } = await useAsyncData(() => queryCollection('about').path('/about/sounddesign').first())


</script>
