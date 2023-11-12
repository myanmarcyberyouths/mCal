import { utcToZonedTime } from "date-fns-tz";
import { THEME_MODE } from "@/type-models/utils.type";

// export function getLocalTime(date?: Date) {
//   return utcToZonedTime(date ? new Date(date) : new Date(), "Asia/Rangoon");
// }

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

export const setAppTheme = (theme?: THEME_MODE) => {
  theme = theme || localStorage.darkMode || THEME_MODE.light;

  if (theme === THEME_MODE.system) {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  if (theme === THEME_MODE.dark) {
    document.documentElement.classList.add("dark");
  }

  if (theme === THEME_MODE.light) {
    document.documentElement.classList.remove("dark");
  }

  return theme;
};
