import { Button } from "@/components/ui/buttons/Button";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

type ThemeSchema = "light" | "dark";

export function ThemeToggleButton() {
  const [defaultTheme] = useState<ThemeSchema>("light");

  //  detect system theme
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const darkModeOn = darkQuery.matches;
  const [darkMode, setDarkMode] = useState(darkModeOn);
  darkQuery.addEventListener("change", (e) => {
    setDarkMode(e.matches);
  });

  function onToggleTheme() {
    setDarkMode((prevMode) => !prevMode);
  }

  //  set theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [defaultTheme, darkMode]);

  //  set localStorage
  useEffect(() => {
    localStorage.setItem("theme", defaultTheme);
  }, [defaultTheme]);

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={onToggleTheme}
      className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 "
    >
      {darkMode ? (
        <BiMoon size={18} className="text-gray-600" />
      ) : (
        <BiSun size={18} className="text-gray-600" />
      )}
    </Button>
  );
}

export default ThemeToggleButton;
