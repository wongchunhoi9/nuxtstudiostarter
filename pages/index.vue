<template>

    <main>
        <div class="md:flex flex-row-reverse ">
            <section class="md:max-w-lg md:p-4 p-2 md:border-l-2 md:border-black md:flex-shrink-0">
                News
                <ContentRenderer v-if="news" :value="news" />
                <div v-else>NEWS not found</div>
            </section>

            <section class="md:max-w-8xl md:p-4 p-0  md:border-black md:h-min">
                <!-- <RecentWork :displayPost="9"/>
                <RecentBlog :displayPost="4" /> -->
                <!-- <RecentPosts :displayPost="30" /> -->
                <div>
                    <!-- <h1>     
                    index page
                    </h1> -->
                        <div class="lg:columns-2 xl:columns-3 2xl:columns-4 gap-0">
                            <NuxtLink v-for="post in allPosts" :key="post.path" :to="post.path" class="pb-8 md:pb-0">
                                <div class="relative overflow-hidden hover:shadow-lg transition-all  lg:border-b-0 ">

                                    <div class="md:bg-relayorange  from-black md:opacity-0 hover:opacity-80  md:absolute inset-0 z-10  justify-center flex flex-col font-semibold items-center text-black md:text-xl text-2xl  p-2 ">
                                        {{ post.title }}
                                        <br>
                                        <span class="text-sm text-slate-700">
                                            {{post.medium }}
                                        </span>
                                    </div>
                                    
                                    <!-- <p>{{ post.description }}</p> -->
                                    
                                    <!-- <NuxtImg src="img/testing/IMG_0083_rotate.jpeg" :alt="post.title" class=" w-full inset-0 bg-cover bg-center z-0" /> -->
                                    <NuxtImg :src="`${post.image}`" :alt="post.title" class=" w-full  inset-0 bg-cover bg-center z-0 " />


                                </div>
                            </NuxtLink>
                        </div>
                </div>
            </section>
        </div>
    </main>

    <div>
        Testing nuxt Image 
        with modifieris rotate null
        <NuxtImg src="img/testing/IMG_7676.JPG" class="w-full" :modifiers="{ rotate: null }"/>
        <!-- <NuxtImg src="img/testing/IMG_7676.JPG" class="w-full" sizes="xs:200px md:500px lg:1024px"/> -->
        <NuxtImg src="img/testing/IMG_7676.JPG" class="w-full" preset="preview"/>
        
    </div>
</template>


<script setup lang="ts">
const { data: news } = await useAsyncData(() => queryCollection('about').path('/about/news').first())

const route = useRoute()
const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection('allContent')
    .where('date','IS NOT NULL')
    .order('date', 'DESC')
    .all()
})

</script>