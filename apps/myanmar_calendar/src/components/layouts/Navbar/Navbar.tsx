import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

import { BiChevronLeft, BiChevronRight, BiCaretDown } from "react-icons/bi";
import {
  BsCalendar2Check,
  BsCalendar2Event,
  BsCalendar2Week,
} from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import CalendarSlider from "./CalendarSlider";
import CalendarModeDropDown from "./CalendarModeDropDown";
import ActiveDateIndicator from "./ActiveDateIndicator";
import SideMenuTogglerButton from "@/components/ui/buttons/SidebarToggleBtn";
import AppLogo from "@/components/ui/logos/AppLogo";
import DarkMode from "./DarkMode";
import SettingTrigger from "./SettingTrigger";

function Navbar() {
  return (
    <header className="flex h-nav-h w-full items-stretch border-b border-gray-200 bg-gray-0">
      <div className="flex w-[2.75rem] flex-shrink-0 items-center gap-6 pl-3 sm2:w-[3rem] md:w-[4rem] lg2:w-[15rem] lg3:w-[17rem]">
        <SideMenuTogglerButton>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
            className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </SideMenuTogglerButton>
        <div className="hidden lg2:block">
          <AppLogo />
        </div>
      </div>
      <div className="flex h-full flex-1 items-center justify-between px-3">
        <ActiveDateIndicator />
        <div className="sm3:gap-5 ml-auto flex items-center gap-2 md:pr-4">
          <CalendarSlider />
          <CalendarModeDropDown />
          <SettingTrigger />
          {/* <ThemeToggleButton /> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
