import { WEEKDAY_INDEX } from "@/type-models/utils.type";
import { endOfMinute } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function getLocalTime(date?: Date) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return utcToZonedTime(date ? new Date(date) : new Date(), "Asia/Tokyo");
}

export type TDate = string | Date;
export const toDate = (dateString: TDate) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    date,
    toDate,
  };
};

export function calculateEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

export function getWeekDayIndex(weekdayName: string): WEEKDAY_INDEX {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const index = weekdays.findIndex(
    (day) =>
      day.toLowerCase() === weekdayName.toLowerCase() ||
      day.substring(0, 3).toLocaleLowerCase() ===
        weekdayName.toLocaleLowerCase(),
  );

  if (index === -1) {
    throw new Error(`Invalid weekday name: ${weekdayName}`);
  }
  return index as WEEKDAY_INDEX;
}
