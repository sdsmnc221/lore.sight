<script setup lang="ts">
import Sparkles from "../components/Sparkles.vue";
import MorphingText from "../components/MorphingText.vue";
import isMobile from "../lib/isMobile";
import { onMounted, ref } from "vue";

const refIsMobile = ref(isMobile());

onMounted(() => {
  window.addEventListener("resize", () => {
    refIsMobile.value = isMobile();
  });
});
</script>

<template>
  <div class="overflow-hidden w-[100vw] h-[100dvh]">
    <Sparkles
      background="transparent"
      :min-size="1.2"
      :max-size="120"
      :particle-density="1200"
      particle-color="#39736d"
      class="w-[100vw] h-[100dvh] fixed inset-0 mix-blend-color-dodge"
    ></Sparkles>

    <main
      class="flex justify-center items-center fixed inset-0 p-10 m-10 backdrop-blur-xs"
    >
      <div
        class="h-full aspect-[1024/1516] md:aspect-[16/9] md:w-[100vw] md:h-auto p-10 md:p-0 md:brightness-[132%] md:mix-blend-overlay md:invert"
      >
        <img
          alt=""
          :src="`/dreamer-of-ink${refIsMobile ? '.webp' : '-dsk.webp'}`"
          class="ink h-full md:w-full w-auto aspect-[1024/1516] md:aspect-[16/9] md:scale-[1.4] md:mix-blend-difference fixed md:relative top-0 md:top-auto left-0 md:left-auto"
        />
      </div>
      <div
        class="absolute right-[-8vw] bottom-[32%] scale-[0.56] md:scale-[1] md:right-[28vw] md:bottom-36 md:opacity-[0.64]"
      >
        <img
          alt=""
          src="/scripture.svg"
          class="scripture h-[32vh] w-auto mix-blend-difference invert"
        />
      </div>
    </main>

    <Sparkles
      id="lalala"
      background="transparent"
      :min-size="1.2"
      :max-size="6.4"
      :particle-density="1000"
      particle-color="#ffe9c7"
      :speed="1.2"
      class="w-[100vw] h-[100dvh] fixed top-[-100vh] translate-y-[100vh] left-0 mix-blend-color-dodge"
    ></Sparkles>

    <button
      class="absolute inset-0 bottom-[10vh] top-auto mix-blend-difference md:bottom-[64vh]"
    >
      <RouterLink
        :to="{ name: 'Browser' }"
        :class="{
          'btn-text w-48 h-16 inline-block bg-red-100 rounded-xl brightness-[320%]':
            refIsMobile,
        }"
      >
        <MorphingText
          :texts="['Lores', 'Start']"
          className="text-2xl md:text-5xl text-white cursor-pointer mix-blend-difference uppercase"
          :morphTime="3.2"
          :cooldownTime="1.5"
        />
        <MorphingText
          :texts="['Scanning', 'Explorer']"
          className="text-2xl md:text-5xl text-white relative top-6 md:top-10 mix-blend-difference cursor-pointer uppercase"
          :morphTime="2.8"
          :cooldownTime="1.5"
        />
      </RouterLink>
    </button>
  </div>
</template>

<style lang="scss">
main {
  animation: vintageColorShiftOverlay 8s ease-in-out infinite;
}

#lalala {
  position: fixed !important;
  animation: brutalistColorShiftOverlay_ 10s infinite;
}

.ink {
  animation: vintageColorShift 8s ease-in-out infinite;
  background-size: contain;

  @media screen and (max-width: 480px) {
    animation: brutalistColorShiftOverlay 10s infinite;
    mix-blend-mode: hard-light;
  }
}

.btn-text {
  box-shadow: 0 0 0 4px #dc3b3b, 0 0 0 8px #00ffff, 4px -40px 20px 40px #0000ff,
    4px 20px 20px 20px #0000ff;
}
</style>
