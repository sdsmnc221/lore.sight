<script setup lang="ts">
import Sparkles from "../components/Sparkles.vue";
import MorphingText from "../components/MorphingText.vue";
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
      <div class="h-full m-w-full w-auto aspect-[1024/1516] p-10 md:p-0">
        <img alt="" src="/dreamer-of-ink.png" class="ink h-full w-full" />
      </div>
      <div
        class="absolute right-[-24px] bottom-[-10px] scale-[0.64] md:scale-[1] md:right-[32vw] md:bottom-40"
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
      class="w-[100vw] h-[100dvh] fixed top-[-100vh] translate-y-[100vh] left-0 mix-blend-color-dodge"
    ></Sparkles>

    <button class="absolute inset-0 top-[-40vh] left-10 md:left-32">
      <RouterLink :to="{ name: 'Browser' }">
        <MorphingText
          :texts="['Lores', 'Start']"
          className="text-2xl md:text-5xl text-white cursor-pointer uppercase"
          :morphTime="3.2"
          :cooldownTime="1.5"
        />
        <MorphingText
          :texts="['Explorer', 'Scanning']"
          className="text-2xl md:text-5xl text-white relative top-8 md:top-10 cursor-pointer uppercase"
          :morphTime="2.8"
          :cooldownTime="1.5"
        />
      </RouterLink>
    </button>
  </div>
</template>

<style scoped>
main {
  animation: brutalistColorShiftOverlay 10s infinite;
}

#lalala {
  position: fixed !important;
}

.ink {
  animation: brutalistColorShift 4s infinite;
  background-size: contain;
}
</style>
