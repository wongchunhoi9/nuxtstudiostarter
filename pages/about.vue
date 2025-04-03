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
    <!-- <div>
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
    </div> -->
</div>    

</template>

<script setup lang="ts">

const biography = await queryCollection('about').path('/biography').first()
// const cv = await queryCollection('about').path('/about/cv').first()
// const bibliography = await queryCollection('about').path('/about/bibliography').first()
// const sounddesign = await queryCollection('about').path('/about/sounddesign').first()

// if (!cv.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
// }

</script>
