<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import Sparkles from "../components/Sparkles.vue";

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
    ).innerHTML = `Ready to scan ${markerName} images`;

    // Update button states
    document.querySelectorAll("#controls button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.getElementById(`btn-${markerName}`).classList.add("active");
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
              ).innerHTML = `Found ${markerName}! Redirecting...`;
              setTimeout(() => {
                window.location.href = config.redirect;
              }, 1500);
            }
          });

          element.addEventListener("markerLost", function () {
            if (currentActiveMarker === markerName) {
              document.getElementById(
                "info"
              ).innerHTML = `Looking for ${markerName} images...`;
            }
          });
        }
      });
    }, 2000);

    setTimeout(() => {
      // Match position of eye and arjs-video
      const arjsVideo = document.querySelector("#arjs-video");
      const arjsVideoOverlay = document.querySelector("#arjs-video-overlay");

      if (arjsVideo && arjsVideoOverlay) {
        const { top, left, width, height } = arjsVideo.getBoundingClientRect();

        // Use setProperty with 'important' priority
        (arjsVideoOverlay as any).style.setProperty(
          "top",
          top + "px",
          "important"
        );
        (arjsVideoOverlay as any).style.setProperty(
          "left",
          left + "px",
          "important"
        );
        (arjsVideoOverlay as any).style.setProperty(
          "width",
          width + "px",
          "important"
        );
        (arjsVideoOverlay as any).style.setProperty(
          "height",
          height + "px",
          "important"
        );
      }
    }, 1200);
  });
});
</script>

<template>
  <div class="overflow-hidden w-full h-[200dvh]">
    <Sparkles
      background="transparent"
      :min-size="1.2"
      :max-size="120"
      :particle-density="1200"
      particle-color="#39736d"
      class="w-full h-[200vh] fixed inset-0 mix-blend-color-dodge"
    ></Sparkles>

    <main
      class="flex flex-col justify-center items-center fixed inset-0 p-20 backdrop-blur-xs"
    >
      <div id="info">Ready to scan capybara images</div>

      <a-scene
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
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
        >
        </a-nft>

        <a-nft
          id="sky-ticket-b-marker"
          type="nft"
          url="./markers/sky-ticket-b"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
          visible="false"
        >
        </a-nft>

        <a-nft
          id="train-ticket-en-marker"
          type="nft"
          url="./markers/ticket-en"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
          visible="true"
        >
        </a-nft>

        <a-nft
          id="train-ticket-vn-marker"
          type="nft"
          url="./markers/ticket-vn"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
          visible="false"
        >
        </a-nft>

        <a-nft
          id="capybara-marker"
          type="nft"
          url="./markers/capybara"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
          visible="false"
        >
        </a-nft>

        <a-entity camera></a-entity>
      </a-scene>

      <div class="absolute">
        <img alt="" src="/frame2.svg" class="h-[54vh] min-w-[50vw] w-auto" />
      </div>

      <div id="controls">
        <button id="btn-capybara" @click="switchToMarker('capybara')">
          Capybara
        </button>
        <button id="btn-sky-ticket-a" @click="switchToMarker('sky-ticket-a')">
          Sky Set (a)
        </button>
        <button id="btn-sky-ticket-b" @click="switchToMarker('sky-ticket-b')">
          Sky Set (b)
        </button>
        <button
          id="btn-capybara"
          class="active"
          @click="switchToMarker('train-ticket-en')"
        >
          Train Set (EN)
        </button>
        <button id="btn-capybara" @click="switchToMarker('train-ticket-vn')">
          Train Set (VN)
        </button>
      </div>
    </main>

    <Sparkles
      background="transparent"
      :min-size="1.2"
      :max-size="6.4"
      :particle-density="1000"
      particle-color="#ffe9c7"
      class="w-[100vw] h-[100dvh] fixed top-[-100vh] translate-y-[100vh] left-0 mix-blend-color-dodge"
    ></Sparkles>
  </div>

  <!-- <Transition
    enter-active-class="transition-all duration-2000 absolute top-0 left-0"
    enter-from-class="blur-md opacity-0"
    enter-to-class="blur-none opacity-100"
    leave-active-class="transition-all duration-2000 absolute top-0 left-0"
    leave-from-class="blur-none opacity-100"
    leave-to-class="blur-md opacity-0"
  >
    <div></div>
  </Transition> -->
</template>

<style lang="scss">
#lalala {
  position: fixed !important;
}

#arjs-video {
  position: fixed !important;
  z-index: 99 !important;

  top: 50% !important;
  left: 50% !important;
  transform: translate(-42.5%, -50%) scale(0.5) !important;

  /* Apply the image mask */
  mask: url("/eye.gif") no-repeat center center;
  mask-size: contain; /* or cover, 100% 100%, etc. */
  -webkit-mask: url("/eye.gif") no-repeat center center;
  -webkit-mask-size: contain;

  /* Optional: smooth transitions */
  transition: mask-position 0.3s ease;
}

#arjs-video-overlay {
  z-index: 100;
  mix-blend-mode: difference;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  background-image: url("/eye.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
