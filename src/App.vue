<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { inject } from "@vercel/analytics";
onMounted(async () => {
  await nextTick();

  inject();
});
</script>

<template>
  <RouterView></RouterView>
</template>

<style>
@keyframes brutalistColorShift {
  0% {
    filter: contrast(1.2) saturate(1.5) hue-rotate(0deg) brightness(1);
  }

  16.66% {
    filter: contrast(2) saturate(3) hue-rotate(60deg) brightness(1.3);
  }

  33.33% {
    filter: contrast(1.8) saturate(2.5) hue-rotate(120deg) brightness(0.8);
  }

  50% {
    filter: contrast(2.5) saturate(4) hue-rotate(180deg) brightness(1.2);
  }

  66.66% {
    filter: contrast(1.5) saturate(2) hue-rotate(240deg) brightness(0.9);
  }

  83.33% {
    filter: contrast(3) saturate(3.5) hue-rotate(300deg) brightness(1.4);
  }

  100% {
    filter: contrast(1.2) saturate(1.5) hue-rotate(360deg) brightness(1);
  }
}

@keyframes brutalistColorShiftOverlay {
  0% {
    filter: contrast(1.2) saturate(1.5) hue-rotate(0deg) brightness(1);
    border-color: #fff;
    box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff0000, 20px 20px 0 0 #000;
  }

  16.66% {
    filter: contrast(2) saturate(3) hue-rotate(60deg) brightness(1.3);
    border-color: #ffff00;
    box-shadow: 0 0 0 4px #000, 0 0 0 8px #00ff00, 20px 20px 0 0 #ff0000;
  }

  33.33% {
    filter: contrast(1.8) saturate(2.5) hue-rotate(120deg) brightness(0.8);
    border-color: #00ff00;
    box-shadow: 0 0 0 4px #fff, 0 0 0 8px #0000ff, 20px 20px 0 0 #ffff00;
  }

  50% {
    filter: contrast(2.5) saturate(4) hue-rotate(180deg) brightness(1.2);
    border-color: #00ffff;
    box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff00ff, 20px 20px 0 0 #00ff00;
  }

  66.66% {
    filter: contrast(1.5) saturate(2) hue-rotate(240deg) brightness(0.9);
    border-color: #0000ff;
    box-shadow: 0 0 0 4px #fff, 0 0 0 8px #ffff00, 20px 20px 0 0 #ff00ff;
  }

  83.33% {
    filter: contrast(3) saturate(3.5) hue-rotate(300deg) brightness(1.4);
    border-color: #ff00ff;
    box-shadow: 0 0 0 4px #000, 0 0 0 8px #00ffff, 20px 20px 0 0 #0000ff;
  }

  100% {
    filter: contrast(1.2) saturate(1.5) hue-rotate(360deg) brightness(1);
    border-color: #fff;
    box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff0000, 20px 20px 0 0 #000;
  }
}

@keyframes colorOverlay {
  0% {
    background: linear-gradient(
      45deg,
      rgba(255, 0, 0, 0.3),
      rgba(0, 0, 0, 0.1)
    );
  }

  25% {
    background: linear-gradient(
      -45deg,
      rgba(0, 255, 0, 0.4),
      rgba(255, 255, 0, 0.2)
    );
  }

  50% {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 255, 0.3),
      rgba(255, 0, 255, 0.1)
    );
  }

  75% {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 0, 0.4),
      rgba(0, 255, 255, 0.2)
    );
  }

  100% {
    background: linear-gradient(
      180deg,
      rgba(255, 0, 0, 0.3),
      rgba(0, 0, 0, 0.1)
    );
  }
}
</style>
