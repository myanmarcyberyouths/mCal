import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import React from "react";

import {BiChevronLeft, BiChevronRight, BiCaretDown} from "react-icons/bi";
import {
    BsCalendar2Check,
    BsCalendar2Event,
    BsCalendar2Week,
} from "react-icons/bs";
import {IoMdMenu} from "react-icons/io";
import CalendarSlider from "./CalendarSlider";
import CalendarModeSelectBox from "./CalendarModeSelectBox";
import ActiveDateIndicator from "./ActiveDateIndicator";
import SidebarToggleBtn from "@/components/ui/buttons/SidebarToggleBtn";
import AppLogo from "@/components/ui/logos/AppLogo";
import DarkMode from "./DarkMode";

function Navbar() {
    return (
        <header
            className={`h-nav-h w-full bg-gray-0 border-b border-gray-200 flex items-stretch`}
        >
            <div
                className="flex-shrink-0 flex items-center gap-6 pl-3 w-[2.75rem] sm2:w-[3rem] md:w-[4rem] lg2:w-[15rem] lg3:w-[17rem]">
                <SidebarToggleBtn>
                    <button
                        type="button"
                        id="radix-:R19lla:"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                        className="border border-gray-200 w-8 h-8 hover:bg-gray-100 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-lg ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="h-4 w-4 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 9h16.5m-16.5 6.75h16.5"></path>
                        </svg>
                        <span className="sr-only">Toggle Menu</span></button>
                </SidebarToggleBtn>
                <div className="hidden lg2:block">
                    <AppLogo/>
                </div>
            </div>
            <div className="h-full flex-1 flex items-center justify-between px-3">
                <ActiveDateIndicator/>
                <div className="flex items-center gap-2 sm3:gap-5 md:pr-4 ml-auto">
                    <CalendarSlider/>
                    <CalendarModeSelectBox/>
                    <DarkMode/>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
