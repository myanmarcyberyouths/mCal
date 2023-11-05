import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

import { BiChevronLeft, BiChevronRight, BiCaretDown } from "react-icons/bi";
import { BsCalendar2Check, BsCalendar2Event, BsCalendar2Week } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import CalendarSlider from "./CalendarSlider";
import CalendarModeSelectBox from "./CalendarModeSelectBox";
import ActiveDateIndicator from "./ActiveDateIndicator";
import SidebarToggleBtn from "@/components/ui/buttons/SidebarToggleBtn";
import AppLogo from "@/components/ui/logos/AppLogo";

function Navbar() {
  return (
    <header className={`h-nav-h w-full border-b border-gray-300 flex items-stretch`}>
      <div className="flex-shrink-0 flex items-center gap-6 pl-3 w-[2.75rem] sm2:w-[3rem] md3:w-[4rem] lg2:w-[17rem]">
        <SidebarToggleBtn>
          <IoMdMenu size={28} />
        </SidebarToggleBtn>
        <div className="hidden lg2:block">
          <AppLogo />
        </div>
      </div>
      <div className="h-full flex-1 flex items-center justify-between px-3">
        <ActiveDateIndicator />
        <div className="flex items-center gap-5 md:pr-4 ml-auto">
          <CalendarSlider />
          <CalendarModeSelectBox />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
