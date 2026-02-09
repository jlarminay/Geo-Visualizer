// @ts-ignore
import { createToaster } from "@meforma/vue-toaster";

const toasterObject = createToaster({
  position: "top",
  duration: 3000,
});

export function toaster(type: "success" | "error", message: string) {
  if (type === "error") {
    toasterObject.error(`
      <p>Import failed</p>
      <span>${message}</span>
    `);
  } else {
    toasterObject.success(`
      <p>Success</p>
      <span>${message}</span>
    `);
  }

  return;
}

// Parse latitude and longitude with N/S/E/W
export function parseCoord(coord: string | undefined): number {
  if (!coord) return 0;
  const value = parseFloat(coord);
  if (coord.endsWith("S") || coord.endsWith("W")) {
    return -value;
  }
  return value;
}
