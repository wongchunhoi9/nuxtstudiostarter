<template>

<div>
    <h1>
        about page see if it works?
    </h1>   
    <div>
        <ContentRenderer
            v-if="biography"
            :value="biography"
            :head="false"
        />
    </div>
    <div>
        <ContentRenderer
            v-if="cv"
            :value="cv"
            :head="false"
        />
    </div>
    <div>
        <ContentRenderer
            v-if="bibliography"
            :value="bibliography"
            :head="false"
        />
    </div>
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
