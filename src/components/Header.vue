<script setup lang="ts">
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { useMemoryStore } from "@/stores";

const route = useRoute();
const memoryStore = useMemoryStore();
</script>

<template>
  <div
    class="z-10 w-full px-2 pt-2 flex items-center justify-between"
    v-auto-animate
  >
    <q-btn
      round
      unelevated
      icon="sym_o_arrow_back"
      size="14px"
      color="white"
      class="text-black"
      to="/"
    />

    <p class="mb-0 pb-0 font-bold text-base">
      {{ dayjs(memoryStore.entries[0]?.date).format("MMMM D, YYYY") }}
    </p>

    <div class="opacity-0 pointer-events-none">
      <q-btn
        v-if="route.name === 'MapView'"
        round
        unelevated
        icon="sym_o_list"
        size="14px"
        color="white"
        class="text-black"
        to="/list"
      />
      <q-btn
        v-if="route.name === 'ListView'"
        round
        unelevated
        icon="sym_o_map"
        size="14px"
        color="white"
        class="text-black"
        to="/map"
      />
    </div>
  </div>
</template>

<style scoped></style>
