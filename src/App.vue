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

<style></style>
