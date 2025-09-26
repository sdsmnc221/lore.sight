<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import Sparkles from "../components/Sparkles.vue";

import Video0925 from "/videos/0925.mp4";

const route = useRoute();

const videos: Record<string, string> = {
  "0925": Video0925,
};

const metaInfo: Record<string, string> = {
  "0925":
    "Éclairon, en cette journée, mille & une bougies pour notre Lilou, félisweetienne de 17 ans.",
};

const { params } = route;

onMounted(async () => {
  await nextTick();
});
</script>

<template>
  <Sparkles
    background="transparent"
    :min-size="1.2"
    :max-size="120"
    :particle-density="1200"
    :speed="2"
    particle-color="#39736d"
    class="browser-main w-[100vw] h-[200vh] top-0 left-0 mix-blend-color-dodge overflow-hidden"
  ></Sparkles>

  <div class="overflow-hidden w-full h-[100dvh]">
    <main
      class="flex flex-col justify-center items-center fixed inset-0 p-4 md:p-10 backdrop-blur-xs"
    >
      <!-- Organic sparkles background -->
      <div class="sparkles-container">
        <div
          class="sparkle"
          v-for="n in 50"
          :key="n"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
          }"
        ></div>
      </div>

      <!-- Info display with Start.vue style -->
      <div
        id="info"
        class="info-display relative top-[16%] w-[72%] md:w-[32%] md:top-10"
      >
        ✨{{ metaInfo[params.id as string] }}✨
      </div>

      <figure class="flex items-center justify-center relative w-full h-full">
        <img
          alt=""
          src="/video-frame.png"
          class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] md:h-[86%] md:w-auto w-[86%] h-auto aspect-[4/5]"
        />
        <video
          class="video-player absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] md:h-[64%] md:w-auto w-[64%] h-auto aspect-[4/5] rounded-2xl"
          :src="videos[params.id as string]"
          controls
        />
      </figure>
    </main>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap");
@import "../index.css";

.browser-main {
  position: fixed;
  animation: brutalistColorShiftOverlay_ 10s infinite;
}

.sparkles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #10b981, #fbbf24);
  border-radius: 50%;
  animation: sparkleFloat 3s infinite ease-in-out;

  &:nth-child(odd) {
    background: radial-gradient(circle, #fbbf24, #f59e0b);
    animation-duration: 4s;
  }

  &:nth-child(3n) {
    background: radial-gradient(circle, #059669, #10b981);
    animation-duration: 2.5s;
  }
}

@keyframes sparkleFloat {
  0%,
  100% {
    transform: translateY(0px) scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.info-display {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.2),
    rgba(251, 191, 36, 0.2)
  );
  border: 3px solid transparent;
  border-radius: 25px;
  padding: 1rem 2rem;
  font-family: "Kalam", cursive;
  font-size: 1.1rem;
  font-weight: 400;
  color: #fbbf24;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3),
    inset 0 2px 4px rgba(251, 191, 36, 0.2);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 3px;
    background: linear-gradient(45deg, #10b981, #fbbf24, #059669);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
  }

  // Organic decorative elements
  &::after {
    content: "✦ ❋ ✦";
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.9),
      rgba(251, 191, 36, 0.9)
    );
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    color: #064e3b;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.75rem 1.5rem;
    margin-bottom: 1.5rem;
  }
}

@keyframes infoGlow {
  0% {
    box-shadow: 0 8px 32px rgba(57, 115, 109, 0.3);
    border-color: rgba(57, 115, 109, 0.3);
  }
  100% {
    box-shadow: 0 8px 32px rgba(255, 233, 199, 0.4);
    border-color: rgba(255, 233, 199, 0.4);
  }
}

.controls-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
}

.organic-button {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(5, 150, 105, 0.8),
    rgba(16, 185, 129, 0.6)
  );
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-family: "Kalam", cursive;
  font-size: 0.9rem;
  font-weight: 400;
  color: #f0fdf4;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);

  // Handrawn border effect
  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #10b981, #fbbf24, #059669, #f59e0b);
    border-radius: inherit;
    padding: 2px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  // Organic shape variation
  &:nth-child(odd) {
    border-radius: 30px 15px 25px 20px;
    transform: rotate(-1deg);
  }

  &:nth-child(even) {
    border-radius: 20px 30px 15px 25px;
    transform: rotate(1deg);
  }

  &:nth-child(3n) {
    border-radius: 25px 20px 30px 15px;
    transform: rotate(-0.5deg);
  }

  // Hover effects
  &:hover {
    transform: translateY(-3px) scale(1.05) rotate(0deg);
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.9),
      rgba(251, 191, 36, 0.7)
    );
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4),
      0 4px 15px rgba(251, 191, 36, 0.3);

    &::before {
      opacity: 1;
    }

    .button-text {
      color: #064e3b;
      text-shadow: 0 1px 2px rgba(251, 191, 36, 0.5);
    }
  }

  // Active state
  &.active {
    background: linear-gradient(
      135deg,
      rgba(251, 191, 36, 0.9),
      rgba(245, 158, 11, 0.8)
    );
    color: #064e3b;
    box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4),
      inset 0 2px 4px rgba(16, 185, 129, 0.2);

    &::before {
      opacity: 1;
    }

    .button-text {
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(16, 185, 129, 0.3);
    }
  }

  // Mobile responsiveness
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    transform: none !important;
    border-radius: 20px !important;

    &:hover {
      transform: translateY(-2px) scale(1.02) !important;
    }
  }
}

.button-text {
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

// Color shift animations from Start.vue
@keyframes brutalistColorShiftOverlay_ {
  0% {
    filter: hue-rotate(0deg) saturate(1);
  }
  25% {
    filter: hue-rotate(90deg) saturate(1.2);
  }
  50% {
    filter: hue-rotate(180deg) saturate(0.8);
  }
  75% {
    filter: hue-rotate(270deg) saturate(1.1);
  }
  100% {
    filter: hue-rotate(360deg) saturate(1);
  }
}

// Responsive design improvements
@media (max-width: 1024px) {
  .browser-main {
    padding: 2rem 1rem;
  }
}

@media (max-width: 768px) {
  .browser-main {
    padding: 1.5rem 0.75rem;
  }
}

@media (max-width: 480px) {
  .browser-main {
    padding: 1rem 0.5rem;
  }

  .browser-container {
    height: 100dvh;
  }
}

// Portrait orientation adjustments
@media (orientation: portrait) and (max-width: 768px) {
  .ar-container {
    height: 40vh;
    max-height: 40vh;
  }
}

// Landscape orientation adjustments
@media (orientation: landscape) and (max-height: 600px) {
  .ar-container {
    height: 100vh;
    max-height: 70vh;
  }

  .info-display {
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
  }

  .controls-container {
    margin-top: 0.5rem;
  }
}

// AR.js video styling - always centered on desktop
.video-player {
  // Apply the image mask
  // mask: url("/video-frame.svg") no-repeat center center;
  // mask-size: contain;
  // -webkit-mask: url("/video-frame.svg") no-repeat center center;
  // -webkit-mask-size: contain;

  // Smooth transitions
  transition: all 0.3s ease;
}
</style>
