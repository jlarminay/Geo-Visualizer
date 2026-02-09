import { defineStore } from "pinia";
import { toaster, parseCoord } from "@/helpers";
import dayjs from "dayjs";
import { type MapPoint } from "@/types";

// import { Capacitor } from "@capacitor/core";
// import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const useMemoryStore = defineStore("memory", {
  state: () => ({
    entries: [] as MapPoint[],
  }),

  getters: {},

  actions: {
    async import(file: File): Promise<boolean> {
      try {
        const text = await file.text();
        const lines = text.split("\n").map((l) => l.trim());
        const newEntries: MapPoint[] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (!line) continue;

          const data = line.split(",");
          const date = dayjs(`${data[2]}${data[3]}`, "YYMMDDHHmmss");
          const lat = parseCoord(data[4]);
          const lng = parseCoord(data[5]);

          // Leaflet expects [lat, lng] as numbers
          newEntries.push({ date: date, lat, lng });
        }

        this.entries = newEntries;
        toaster("success", `Imported ${newEntries.length} entries.`);
        return true;
      } catch (err: any) {
        toaster("error", err?.message || String(err));
        return false;
      }
    },
  },
});
