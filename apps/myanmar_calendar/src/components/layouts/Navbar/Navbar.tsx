import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

import { BiChevronLeft, BiChevronRight, BiCaretDown } from "react-icons/bi";
import { BsCalendar2Check, BsCalendar2Event, BsCalendar2Week } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import CalendarSlider from "./CalendarSlider";
import HeaderLogoMenu from "./HeaderLogoMenu";
import CalendarModeSelectBox from "./CalendarModeSelectBox";
import ActiveDateIndicator from "./ActiveDateIndicator";

function Navbar() {
  return (
    <header className={`h-nav-h w-full border-b border-gray-300 flex items-stretch`}>
      <HeaderLogoMenu />
      <div className="h-full flex-1 flex items-center justify-between px-3">
        <ActiveDateIndicator />
        <div className="flex items-center gap-5 pr-4">
          <CalendarSlider />
          <CalendarModeSelectBox />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
