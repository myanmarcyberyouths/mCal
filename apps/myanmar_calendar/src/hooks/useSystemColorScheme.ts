import { THEME_MODE } from "@/type-models/utils.type";
import { useEffect, useRef } from "react";

export function useSystemColorScheme(
  callback: (theme: THEME_MODE) => THEME_MODE,
  disabled = false,
) {
  const sysColorSchemeRef = useRef<MediaQueryList>();

  useEffect(() => {
    if (disabled) return;
    const handleSysThemeChange = (event: MediaQueryListEvent) => {
      const newColorScheme = event.matches ? THEME_MODE.dark : THEME_MODE.light;
      callback(newColorScheme);
    };

    sysColorSchemeRef.current = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    sysColorSchemeRef.current.addEventListener("change", handleSysThemeChange);

    return () => {
      sysColorSchemeRef.current.removeEventListener(
        "change",
        handleSysThemeChange,
      );
    };
  }, [disabled]);
}
