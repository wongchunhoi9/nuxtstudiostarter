<template>
  <nav class="w-full px-2 pt-2 bg-transparent">
    <div class="flex items-center justify-between align-middle md:flex-row">
      
      <!-- Header logo -->
      <div class="md:order-3 order-1 self-start md:self-auto">
        <TheHeaderLogo />
      </div>

      <!-- Search bar -->
      <div class="hidden md:flex-grow md:flex justify-center md:order-2 order-2 w-full md:w-auto mt-4 md:mt-0">
        <div class="w-full md:w-2/3"> <!-- Full width on mobile, narrower on larger screens -->
          <SearchBarFuseJs />
        </div>
      </div>

      <!-- Navbar -->
      <div class="hidden md:block md:order-1 order-3">
        <ul class="flex space-x-2 font-sans">
          <NuxtLink to="/"><li><span class="p-2 hover:bg-relayorange hover:text-black rounded">home</span></li></NuxtLink>
          <NuxtLink to="/work"><li><span class="p-2 hover:bg-relayorange hover:text-black rounded">work</span></li></NuxtLink>
          <NuxtLink to="/music"><li><span class="p-2 hover:bg-relayorange hover:text-black rounded">music</span></li></NuxtLink>
          <NuxtLink to="/sounddesign"><li><span class="p-2 hover:bg-relayorange hover:text-black rounded">sound design</span></li></NuxtLink>
          <NuxtLink to="/blog"><li><span class="p-2 hover:bg-relayorange hover:text-black rounded">blog</span></li></NuxtLink>
          <NuxtLink to="/about"><li><span class="p-2 hover:bg-relayorange hover:text-black rounded">about</span></li></NuxtLink>
          <NuxtLink to="/contact"><li><span class="p-2 hover:bg-relayorange hover:text-black rounded">contact</span></li></NuxtLink>
        </ul>
      </div>

      <!-- Mobile toggle -->
      <div class="md:hidden order-3  md:mt-0">
        <button @click="drawer">
          <svg 
            class="h-8 w-8 fill-current text-black"
            fill="none" stroke-linecap="round" 
            stroke-linejoin="round" stroke-width="2" 
            viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Drawer Menu -->
      <aside class="p-5 transform top-0 left-0 w-96 bg-white border-2 border-black fixed h-full overflow-auto ease-in-out transition-all duration-100 z-99" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
        <div class="close">
          <button class="absolute top-0 right-0 mt-4 mr-4" @click="isOpen = false">
            <svg 
              class="w-6 h-6"
              fill="none" stroke-linecap="round" 
              stroke-linejoin="round" stroke-width="2"
              viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <span @click="isOpen = false" class="flex w-full items-center p-4 border-b"></span>

        <!-- Search bar in drawer -->
        <div class="w-full mt-4 mb-4">
          <SearchBarFuseJs @link-clicked="closeDrawer" />
        </div>
        <ul class="divide-y font-sans">
          <li><NuxtLink to="/" @click="isOpen = false"><span class="my-4 inline-block text-xl">home</span></NuxtLink></li>
          <li><NuxtLink to="/work" @click="isOpen = false"><span class="my-4 inline-block text-xl">work</span></NuxtLink></li>
          <li><NuxtLink to="/music" @click="isOpen = false"><span class="my-4 inline-block text-xl">music</span></NuxtLink></li>
          <li><NuxtLink to="/sounddesign" @click="isOpen = false"><span class="my-4 inline-block text-xl">sound design</span></NuxtLink></li>
          <li><NuxtLink to="/blog" @click="isOpen = false"><span class="my-4 inline-block text-xl">blog</span></NuxtLink></li>
          <li><NuxtLink to="/about" @click="isOpen = false"><span class="my-4 inline-block text-xl">about</span></NuxtLink></li>
          <li><NuxtLink to="/contact" @click="isOpen = false"><span class="my-4 inline-block text-xl">contact</span></NuxtLink></li>
        </ul>
      </aside>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  @apply font-bold text-black rounded p-4 md:p-0 shadow-emerald-400 shadow-xl bg-[#5bffa7] animate-bounce-slow;
}
</style>


<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    closeDrawer() {
      this.isOpen = false; // Close the drawer
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  }
};
</script>