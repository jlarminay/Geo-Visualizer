import type dayjs from "dayjs";

export interface MapPoint {
  date: dayjs.Dayjs;
  lat: number;
  lng: number;
}
