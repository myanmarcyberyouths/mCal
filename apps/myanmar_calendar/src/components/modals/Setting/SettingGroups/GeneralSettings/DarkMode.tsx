import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radioInputs/RadioGroup";
import { LOCAL_STORAGE_KEYS, THEME_MODE } from "@/type-models/utils.type";
import React, { useEffect, useRef, useState } from "react";
import SettingSectionContainer from "../SettingSectionContainer";
import { cn } from "@/lib/utils";
import { useSystemColorScheme } from "@/hooks/useSystemColorScheme";
import { setAppTheme } from "@/utils/helpers";

function DarkMode() {
  const [themeMode, setThemeMode] = useState<THEME_MODE>(setAppTheme);

  const toggleTheme = (themeMode: THEME_MODE) => {
    setThemeMode(themeMode);
    setAppTheme(themeMode);
    localStorage.setItem(LOCAL_STORAGE_KEYS.darkMode, themeMode);
  };

  useSystemColorScheme(setAppTheme, themeMode !== THEME_MODE.system);

  return (
    <SettingSectionContainer label="Themes">
      <RadioGroup
        onValueChange={(e: THEME_MODE) => toggleTheme(e)}
        value={themeMode}
        defaultValue={themeMode}
        className="space-y-1"
      >
        <label
          htmlFor={THEME_MODE.system}
          className="group/darkMode flex w-fit cursor-pointer items-center space-x-2"
        >
          <RadioGroupItem
            value={THEME_MODE.system}
            id={THEME_MODE.system}
            className={cn(themeMode === THEME_MODE.system && "border-rose-500")}
          />
          <span className="text-[0.9rem] font-light capitalize text-gray-600 group-hover/darkMode:text-rose-500">
            {THEME_MODE.system}
          </span>
        </label>

        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-10 ">
          <label htmlFor={THEME_MODE.light} className="group/darkMode">
            <div className="mb-1 flex cursor-pointer items-center space-x-2">
              <RadioGroupItem
                value={THEME_MODE.light}
                id={THEME_MODE.light}
                className={cn(
                  themeMode === THEME_MODE.light && "border-rose-500",
                )}
              />
              <span className="text-[0.9rem] font-light capitalize text-gray-600 group-hover/darkMode:text-rose-500">
                {THEME_MODE.light}
              </span>
            </div>
            <AppThemePreview theme="light" />
          </label>
          <label htmlFor={THEME_MODE.dark} className="group/darkMode">
            <div className="mb-1 flex cursor-pointer items-center space-x-2">
              <RadioGroupItem
                value={THEME_MODE.dark}
                id={THEME_MODE.dark}
                className={cn(
                  themeMode === THEME_MODE.dark && "border-rose-500",
                )}
              />
              <span className="text-[0.9rem] font-light capitalize text-gray-600 group-hover/darkMode:text-rose-500">
                {THEME_MODE.dark}
              </span>
            </div>
            <AppThemePreview theme="dark" />
          </label>
        </div>
      </RadioGroup>
    </SettingSectionContainer>
  );
}

export default DarkMode;

function AppThemePreview({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        " ml-5 flex h-[6.5rem] w-[11rem] cursor-pointer flex-col rounded-md border-2 ",
        theme === "light"
          ? "border-gray-600  bg-gray-0 dark:border-gray-200 dark:bg-gray-800 dark:hover:border-rose-500 "
          : "border-gray-50 bg-gray-700 hover:border-rose-500 dark:border-gray-600/90 dark:bg-gray-50  ",
      )}
    >
      <div
        className={cn(
          "flex h-[1.1rem] items-center justify-between border-b-2 px-1 pr-2",
          theme === "light"
            ? "border-gray-200 dark:border-gray-600"
            : "border-gray-600 dark:border-gray-200",
        )}
      >
        <div className="h-[0.35rem] w-3 rounded-sm bg-rose-500"></div>
        <div className="flex gap-1">
          <div className="h-1 w-3 bg-rose-500"></div>
          <div className="h-1 w-3 bg-gray-300"></div>
          {/* <div></div> */}
        </div>
      </div>
      <div className="flex flex-1 items-stretch">
        <div
          className={cn(
            "w-[2.5rem]  border-r-2 p-1",
            theme === "light"
              ? "border-gray-200 dark:border-gray-600"
              : "border-gray-600 dark:border-gray-200",
          )}
        >
          {/* <div className="h-2 bg-gray-300 mb-[0.35rem] rounded-xs"></div> */}
          <ul className="space-y-1">
            <li
              className={cn(
                "h-1 rounded-lg ",
                theme === "light"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-gray-300",
              )}
            ></li>
            <li
              className={cn(
                "h-1 rounded-lg ",
                theme === "light"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-gray-300",
              )}
            ></li>
            <li
              className={cn(
                "h-1 rounded-lg ",
                theme === "light"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-gray-300",
              )}
            ></li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export function useDarkMode() {
  // const [themeMode, setThemeMode] = useState<THEME_MODE>();

  // useEffect(() => {
  //   const initialThemeMode = setAppTheme();
  //   setThemeMode(initialThemeMode);
  // }, []);
  const themeMode = setAppTheme();

  useSystemColorScheme(setAppTheme, themeMode !== THEME_MODE.system);
}
