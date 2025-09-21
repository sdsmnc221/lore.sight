<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
import Sparkles from "../components/Sparkles.vue";
import overrideARjsVideoPosition from "../lib/arjsvid";
import createCanvasCopy from "../lib/arjsvid";
import isMobile from "../lib/isMobile";

const isMobileComputed = ref(isMobile());

const markerConfigs = {
  "train-ticket-en": {
    redirect: "https://the-tot.vercel.app/",
    elementId: "train-ticket-en-marker",
  },
  "train-ticket-vn": {
    redirect: "https://the-tot.vercel.app/",
    elementId: "train-ticket-vn-marker",
  },
  "sky-ticket-a": {
    redirect: "https://the-tot-2.vercel.app/",
    elementId: "sky-ticket-a-marker",
  },
  "sky-ticket-b": {
    redirect: "https://the-tot-2.vercel.app/",
    elementId: "sky-ticket-b-marker",
  },
  capybara: {
    redirect: "https://the-tot-2.vercel.app/",
    elementId: "capybara-marker",
  },
};

let currentActiveMarker = "train-ticket-en-marker";

const switchToMarker = (markerName) => {
  console.log("Switching to marker:", markerName);

  // Hide all markers
  Object.values(markerConfigs).forEach((config) => {
    const element = document.getElementById(config.elementId);
    if (element) {
      element.setAttribute("visible", "false");
    }
  });

  // Show selected marker
  const selectedConfig = markerConfigs[markerName];
  if (selectedConfig) {
    const selectedElement = document.getElementById(selectedConfig.elementId);
    if (selectedElement) {
      selectedElement.setAttribute("visible", "true");
    }

    currentActiveMarker = markerName;
    document.getElementById(
      "info"
    ).innerHTML = `✨ Ready to scan ${markerName} images ✨`;

    // Update button states
    document.querySelectorAll("#controls button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.getElementById(`btn-${markerName}`).classList.add("active");
  }
};

// Enhanced overlay positioning with continuous sync
const positionOverlay = () => {
  const arjsVideo = document.querySelector("#arjs-video");
  const arjsVideoOverlay = document.querySelector("#arjs-video-overlay");

  if (arjsVideo && arjsVideoOverlay) {
    // Force center positioning regardless of video position
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const overlaySize = Math.min(
      window.innerWidth * 0.6,
      window.innerHeight * 0.4
    );

    arjsVideoOverlay.style.setProperty("position", "fixed", "important");
    arjsVideoOverlay.style.setProperty("top", "50%", "important");
    arjsVideoOverlay.style.setProperty("left", "50%", "important");
    arjsVideoOverlay.style.setProperty(
      "transform",
      "translate(-50%, -50%)",
      "important"
    );
    arjsVideoOverlay.style.setProperty(
      "width",
      overlaySize + "px",
      "important"
    );
    arjsVideoOverlay.style.setProperty(
      "height",
      overlaySize + "px",
      "important"
    );
    arjsVideoOverlay.style.setProperty("z-index", "101", "important");

    const { width, height } = arjsVideo.getBoundingClientRect();
    arjsVideo.style.setProperty("position", "fixed", "important");
    arjsVideo.style.setProperty(
      "top",
      height + centerY / 2 + "px",
      "important"
    );
    arjsVideo.style.setProperty(
      "left",
      centerX - width / 2 + "px",
      "important"
    );
    arjsVideo.style.setProperty("z-index", 102, "important");
  }
};

onMounted(async () => {
  await nextTick();

  // Set up event listeners after scene loads
  window.addEventListener("load", function () {
    // Wait a bit for AR.js to initialize
    setTimeout(() => {
      Object.keys(markerConfigs).forEach((markerName) => {
        const config = markerConfigs[markerName];
        const element = document.getElementById(config.elementId);

        if (element) {
          element.addEventListener("markerFound", function () {
            if (currentActiveMarker === markerName) {
              document.getElementById(
                "info"
              ).innerHTML = `🌟 Found ${markerName}! Redirecting... 🌟`;
              setTimeout(() => {
                window.location.href = config.redirect;
              }, 1500);
            }
          });

          element.addEventListener("markerLost", function () {
            if (currentActiveMarker === markerName) {
              document.getElementById(
                "info"
              ).innerHTML = `🔍 Looking for ${markerName} images...`;
            }
          });
        }
      });
    }, 2000);

    // // Continuous sync for responsive behavior
    // const syncInterval = setInterval(positionOverlay, 100);

    // // Cleanup on page unload
    // window.addEventListener("beforeunload", () => {
    //   clearInterval(syncInterval);
    // });
  });

  createCanvasCopy();

  // Initial positioning
  setTimeout(positionOverlay, 1200);

  // Handle window resize and orientation changes
  window.addEventListener("resize", () => {
    setTimeout(positionOverlay, 100);
    isMobileComputed.value = isMobile();
  });

  window.addEventListener("orientationchange", () => {
    setTimeout(positionOverlay, 500);
  });
});
</script>

<template>
  <Sparkles
    background="transparent"
    :min-size="1.2"
    :max-size="120"
    :particle-density="1200"
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
      <div id="info" class="info-display">
        ✨Weaving stories through visual perception✨
      </div>

      <!-- AR Scene Container -->
      <div class="ar-container">
        <a-scene
          vr-mode-ui="enabled: false"
          renderer="logarithmicDepthBuffer: true;"
          embedded
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
          class="ar-scene"
        >
          <!-- All markers loaded at once, but only one active -->
          <a-nft
            id="sky-ticket-a-marker"
            type="nft"
            url="./markers/sky-ticket-a"
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
            visible="false"
          />

          <a-nft
            id="sky-ticket-b-marker"
            type="nft"
            url="./markers/sky-ticket-b"
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
            visible="false"
          />

          <a-nft
            id="train-ticket-en-marker"
            type="nft"
            url="./markers/ticket-en"
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
            visible="true"
          />

          <a-nft
            id="train-ticket-vn-marker"
            type="nft"
            url="./markers/ticket-vn"
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
            visible="false"
          />

          <a-nft
            id="capybara-marker"
            type="nft"
            url="./markers/capybara"
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
            visible="false"
          />

          <a-entity camera></a-entity>
        </a-scene>

        <div
          class="fixed z-[-10] top-1/2 left-1/2 translate-x-[-50%] md:translate-y-[-50%] translate-y-[-66%] w-[90%] md:w-auto mix-blend-difference md:mix-blend-overlay"
        >
          <img
            alt=""
            :src="isMobileComputed ? '/frame.svg' : '/frame2.svg'"
            class="md:h-auto md:w-[40vw] h-[60vh] w-auto brightness-[200%] md:brightness-[100%] saturate-[0.8]"
          />
        </div>
      </div>

      <!-- Control buttons with organic style -->
      <div id="controls" class="controls-container pt-20 md:pt-0">
        <button
          id="btn-capybara"
          @click="switchToMarker('capybara')"
          class="organic-button"
        >
          <span class="button-text">🦫 Capybara</span>
        </button>
        <button
          id="btn-sky-ticket-a"
          @click="switchToMarker('sky-ticket-a')"
          class="organic-button"
        >
          <span class="button-text">☁️ Sky Set (a)</span>
        </button>
        <button
          id="btn-sky-ticket-b"
          @click="switchToMarker('sky-ticket-b')"
          class="organic-button"
        >
          <span class="button-text">🌤️ Sky Set (b)</span>
        </button>
        <button
          id="btn-train-ticket-en"
          class="organic-button active"
          @click="switchToMarker('train-ticket-en')"
        >
          <span class="button-text">🚂 Train Set (EN)</span>
        </button>
        <button
          id="btn-train-ticket-vn"
          @click="switchToMarker('train-ticket-vn')"
          class="organic-button"
        >
          <span class="button-text">🚄 Train Set (VN)</span>
        </button>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap");

.browser-main {
  position: fixed;
  animation: brutalistColorShiftOverlay 10s infinite;
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
  margin-bottom: 2rem;
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

// AR container styling
.ar-container {
  position: relative;
  width: 50%;
  height: 60vh;
  max-width: 90vw;
  max-height: 60vh;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    height: 50vh;
    max-height: 50vh;
    margin-bottom: 1rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    height: 45vh;
    max-height: 45vh;
    margin-bottom: 0.75rem;
    border-radius: 12px;
    box-shadow: none;
  }
}

// AR Scene styling
.ar-scene {
  width: 100% !important;
  height: 100% !important;
  border-radius: inherit;
}

// Eye overlay - always centered
.eye-overlay {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 101 !important;
  mix-blend-mode: difference;
  background-image: url("/eye.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 20px;
  pointer-events: none;
  width: min(60vw, 400px) !important;
  height: min(40vh, 300px) !important;

  @media (max-width: 768px) {
    width: min(70vw, 350px) !important;
    height: min(35vh, 250px) !important;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    width: min(80vw, 300px) !important;
    height: min(30vh, 200px) !important;
    border-radius: 12px;
    margin-top: -10vh !important;
    mix-blend-mode: soft-light;
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

// AR.js video styling with eye mask - always centered
#arjs-video,
#arjs-video-copy {
  position: fixed !important;
  // top: 50% !important;
  // left: 50% !important;
  // transform: translate(-25%, -50%) !important;
  z-index: 99 !important;
  border-radius: 20px;
  width: min(60vw, 400px) !important;
  height: min(40vh, 300px) !important;

  // Apply the image mask
  mask: url("/eye.gif") no-repeat center center;
  mask-size: contain;
  -webkit-mask: url("/eye.gif") no-repeat center center;
  -webkit-mask-size: contain;

  // Smooth transitions
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: min(70vw, 350px) !important;
    height: min(35vh, 250px) !important;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    width: min(80vw, 300px) !important;
    height: min(30vh, 200px) !important;
    border-radius: 12px;
  }
}

// Color shift animations from Start.vue
@keyframes brutalistColorShiftOverlay {
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

  #arjs-video {
    width: min(75vw, 300px) !important;
    height: min(30vh, 200px) !important;
  }

  .eye-overlay {
    width: min(75vw, 300px) !important;
    height: min(30vh, 200px) !important;
  }
}

// Landscape orientation adjustments
@media (orientation: landscape) and (max-height: 600px) {
  .ar-container {
    height: 70vh;
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
</style>
