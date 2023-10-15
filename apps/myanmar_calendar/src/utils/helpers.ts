import { utcToZonedTime } from "date-fns-tz";

export function getLocalTime(date?: Date) {
  date = date || new Date();
  return utcToZonedTime(new Date(date), "Asia/Rangoon");
}
