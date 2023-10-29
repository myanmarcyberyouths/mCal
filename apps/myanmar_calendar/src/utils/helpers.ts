import { utcToZonedTime } from "date-fns-tz";

export function getLocalTime(date?: Date) {
  return utcToZonedTime(date ? new Date(date) : new Date(), "Asia/Rangoon");
}

export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}

export function setLocalStorage(key: string, value: any) {
  if (typeof window === "undefined") {
    console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
}
