import { defineStore } from "pinia";
import { toaster, parseCoord } from "@/helpers";
import dayjs from "dayjs";
import { type MapPoint } from "@/types";
import demoData from "@/demo";

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
    async demoData(): Promise<boolean> {
      try {
        this.entries = demoData;
        toaster("success", `Imported demo entries.`);
        return true;
      } catch (err: any) {
        toaster("error", err?.message || String(err));
        return false;
      }
    },
    async import(file: File): Promise<boolean> {
      try {
        const text = await file.text();
        const lines = text.split("\n").map((l) => l.trim());
        const newEntries: MapPoint[] = [];
        let previousData: { lat?: number; lng?: number } = {};
        let skippedLines = 0;

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (!line) continue;

          const data = line.split(",");
          const date = dayjs(`${data[2]}${data[3]}`, "YYMMDDHHmmss");
          const lat = parseCoord(data[4]);
          const lng = parseCoord(data[5]);

          // before pushing, check if moved less than set distance away
          if (
            previousData.lat !== undefined &&
            previousData.lng !== undefined
          ) {
            const distance = Math.sqrt(
              Math.pow(lat - previousData.lat, 2) +
                Math.pow(lng - previousData.lng, 2),
            );
            // if distance is less than 0.0001 degrees (approximately 11.1 meters), skip
            if (distance < 0.0001) {
              skippedLines++;
              continue; // approximately
            }
          }

          // store previous data for next iteration
          previousData = { lat, lng };

          // Leaflet expects [lat, lng] as numbers
          newEntries.push({ date: date, lat, lng });
        }

        this.entries = newEntries;
        const skippedPercentage = (
          (skippedLines / (newEntries.length + skippedLines)) *
          100
        ).toFixed(1);
        toaster(
          "success",
          `Imported ${newEntries.length} entries. 
          <br/>
          Skipped ${skippedLines} entries (${skippedPercentage}%).`,
        );
        return true;
      } catch (err: any) {
        toaster("error", err?.message || String(err));
        return false;
      }
    },
  },
});
