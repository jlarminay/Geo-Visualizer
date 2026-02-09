<script setup lang="ts">
import { ref } from "vue";
import { Map, Header } from "@/components";
import { useMemoryStore } from "@/stores";

const memoryStore = useMemoryStore();
const sliderValue = ref(-1);
</script>

<template>
  <div
    class="flex flex-col relative h-full min-h-0 overflow-hidden"
    v-auto-animate
  >
    <Map :activePoint="sliderValue" />
    <Header />

    <div
      class="absolute bottom-0 z-10 w-full p-2 flex items-center justify-between"
      v-auto-animate
    >
      <p
        v-if="sliderValue > -1"
        class="mb-0 pb-0 text-sm text-center w-full font-bold"
      >
        {{ memoryStore.entries[sliderValue]?.date.format("hh:mm:ssa") }}
      </p>
      <q-slider
        v-model="sliderValue"
        :min="-1"
        :max="memoryStore.entries.length - 1"
        class="px-4"
        color="white"
      />
    </div>
  </div>
</template>

<style scoped></style>
