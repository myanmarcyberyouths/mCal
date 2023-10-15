import { utcToZonedTime } from "date-fns-tz";

export function getLocalTime(date?: Date) {
  return utcToZonedTime(date ? new Date(date) : new Date(), "Asia/Rangoon");
}
