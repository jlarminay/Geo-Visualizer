<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMemoryStore } from "@/stores";

const memoryStore = useMemoryStore();
const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);

async function importFile(e: any) {
  const f = e.target.files?.[0];
  const results = await memoryStore.import(f);
  if (results) {
    router.push("/map");
  }
  e.target.value = null;
}
async function importDemoData() {
  const results = await memoryStore.demoData();
  if (results) {
    router.push("/map");
  }
}
</script>

<template>
  <div
    class="flex flex-col relative h-full min-h-0 items-center justify-center px-4"
    v-auto-animate
  >
    <img src="/icon-close.png" alt="Logo" class="w-20 mb-4" />
    <p class="text-3xl">Geo Visualizer</p>

    <div class="text-center">
      <q-btn
        unelevated
        no-caps
        label="Select Log File"
        color="primary"
        class="mb-6"
        @click="fileInput?.click()"
      />

      <input
        ref="fileInput"
        type="file"
        accept="text/csv,text/plain,.csv"
        class="hidden"
        @change="importFile"
      />

      <p>
        This app is designed to function with log files generated from the
        <a
          href="https://canadagps.ca/products/columbus-v-990-gps-data-logger-microsd-slot-4gb-capacity-50-million-waypoints-voice-tag-g-sensor-66-channels-mtk2-chipset-windows-mac-linux-compatible"
          class="link"
        >
          Columbus V-990</a
        >.
      </p>
      <p>Any other files may not work as intended.</p>
    </div>

    <div
      class="absolute bottom-0 z-10 w-full p-2 flex items-center justify-center gap-2"
      v-auto-animate
    >
      <p class="link mb-0 pb-0" @click="importDemoData">Demo Data</p>
      |
      <a
        href="https://github.com/jlarminay/Geo-Visualizer"
        target="_blank"
        class="link"
      >
        Github
      </a>
      |
      <a href="https://joshlarminay.com" target="_blank" class="link">
        Website
      </a>
    </div>
  </div>
</template>

<style scoped></style>
