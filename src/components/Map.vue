<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import * as L from "leaflet";
import { useMemoryStore } from "@/stores";

import "leaflet/dist/leaflet.css";

let map: L.Map | null = null;
let markersLayer: L.LayerGroup | null = null;
const memoryStore = useMemoryStore();

const props = defineProps<{
  activePoint: number;
}>();

onMounted(() => {
  map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([0, 0], 2);

  const tiles = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 16,
      minZoom: 2,
    },
  );
  tiles.addTo(map);

  addMarkersAndFit();

  // Ensure proper sizing after mount
  setTimeout(() => map?.invalidateSize(), 0);
});

watch(
  () => props.activePoint,
  (newVal) => {
    addMarkersAndFit(newVal);
  },
);

function addMarkersAndFit(activePoint: number = -1) {
  if (!map) return;

  // Remove previous markers layer if exists
  if (markersLayer) {
    markersLayer.clearLayers();
    map.removeLayer(markersLayer);
  }
  markersLayer = L.layerGroup();
  const latlngs: [number, number][] = [];
  let activeLatLng: [number, number] | null = null;

  memoryStore.entries.forEach((entry, index) => {
    const latlng: [number, number] = [entry.lat, entry.lng];
    latlngs.push(latlng);
    const marker = L.circleMarker(latlng, {
      radius: 2,
      color: "#ff5722",
      fillColor: "#ff5722",
      fillOpacity: 1,
    }).addTo(markersLayer!);

    if (
      activePoint !== undefined &&
      index === activePoint &&
      activePoint > -1
    ) {
      marker.setStyle({
        radius: 6,
        color: "#ff5722",
        fillColor: "#ff5722",
        fillOpacity: 1,
      });
      marker.openPopup();
      activeLatLng = latlng;
    }
  });

  // Add polyline connecting all points
  if (latlngs.length > 1) {
    L.polyline(latlngs, {
      color: "#ff5722",
      weight: 2,
      opacity: 1,
    }).addTo(markersLayer!);
  }

  markersLayer.addTo(map);

  // Zoom/follow logic
  if (activePoint > -1 && activeLatLng) {
    map.setView(activeLatLng, 14, { animate: true });
  } else if (latlngs.length > 0) {
    const bounds = L.latLngBounds(latlngs);
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}

onBeforeUnmount(() => {
  map?.remove();
  map = null;
});
</script>

<template>
  <div id="map" class="absolute w-full h-full z-1" />
</template>

<style scoped></style>
