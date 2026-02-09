<script setup lang="ts">
import { Header } from "@/components";
import { useMemoryStore } from "@/stores";
import dayjs from "dayjs";

const memoryStore = useMemoryStore();
</script>

<template>
  <div class="flex relative h-full min-h-0" v-auto-animate>
    <Header class="fixed top-0 bg-[#121212] pb-2" />
    <div class="mt-14.5 w-full">
      <div
        v-for="(entry, i) in memoryStore.entries"
        :key="i"
        class="px-4 pt-2 text-base flex justify-between w-full"
      >
        <p>{{ dayjs(entry.date).format("hh:mm:ssa") }}</p>
        <p class="opacity-70 text-sm">({{ entry.lat }}, {{ entry.lng }})</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
