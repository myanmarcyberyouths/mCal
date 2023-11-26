import { Button } from "@/components/ui/buttons/Button";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

function DarkMode() {
  const [darkMode, setDarkMode] = React.useState(false);

  // check and reset theme when `darkMode` changes
  React.useEffect(() => {
    themeCheck();
  }, [darkMode]);

  // check theme on component mount
  React.useEffect(() => {
    themeCheck();
  }, []);

  // check and reset theme
  const themeCheck = () => {
    if (localStorage.darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  };
  return <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />;
}

export function ThemeToggle({ darkMode, setDarkMode }) {
  // called when checkbox is checked or unchecked
  const toggleTheme = () => {
    const theme = localStorage.getItem("darkMode");
    if (theme) {
      localStorage.setItem("darkMode", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("darkMode", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
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

export default DarkMode;
