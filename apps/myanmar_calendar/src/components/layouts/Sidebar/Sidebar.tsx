import React, { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CalendarLanguageMenu } from "./LanguageSelectBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import AppLogo from "@/components/ui/logos/AppLogo";
import SidebarToggleBtn from "@/components/ui/buttons/SidebarToggleBtn";
import { BsArrowLeftShort } from "react-icons/bs";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { setSidebarOpenState } from "@/store/systemState";
import CalendarPreferanceList from "./CalendarPreferanceList";
import EventCalendarList from "./EventCalendarList";
import ModelBackdrop from "@/components/ui/backdrops/ModelBackdrop";
import UserCalendarList from "./UserCalendarList";

function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen, enterMobileMode } = useSelector(
    (state: RootState) => state.systemState,
  );

  const sidebarRef = useOnClickOutside(() => {
    if (window.innerWidth >= 1280 || !sidebarOpen) return;
    dispatch(setSidebarOpenState(false));
  });

  return (
    // <section className={`flex-shrink-0 __scrollbar-sm py-3 transition-all duration-300 flex justify-center flex-row-reverse overflow-hidden absolute ${sidebarOpen ? "w-sidebar-w" : "w-0"}`}>
    <>
      <section
        ref={sidebarRef}
        className={cn(
          "absolute top-0 z-10 flex h-[100vh] flex-shrink-0 -translate-x-[100%] flex-col items-center overflow-hidden border-r border-gray-200 bg-gray-0 shadow-lg transition-all duration-300 sm2:translate-x-0 xl:static xl:h-[calc(100vh-theme(spacing.nav-h))] xl:border-none xl:shadow-none",
          enterMobileMode &&
            `'w-[83%] max-w-[22rem]' ${sidebarOpen ? "translate-x-0" : ""}`,
          !enterMobileMode &&
            `${sidebarOpen ? "w-[19rem] xl:w-sidebar-w" : "w-0"}`,
        )}
      >
        <div className="flex h-nav-h w-[90%] flex-shrink-0 items-center justify-between pl-1 xl:hidden xl:w-[16rem]">
          <AppLogo />
          <SidebarToggleBtn>
            <BsArrowLeftShort size={30} />
          </SidebarToggleBtn>
        </div>
        {/* w-[calc(theme(spacing.sidebar-w)-2.5rem)] */}
        <div className="__scrollbar-sm h-[calc(100%-theme(spacing.nav-h))] w-full min-w-[19rem] flex-shrink-0 space-y-6 bg-gray-0 px-5 py-3 pt-4 xl:h-full xl:w-sidebar-w xl:min-w-[theme(spacing.sidebar-w)]">
          <div className="">
            <p className="mb-[0.4rem] text-[0.75rem] font-medium text-gray-450">
              CALENDAR LANGUAGE
            </p>
            <CalendarLanguageMenu />
          </div>
          {/* => SystemLanguageSelectBox */}
          {/* => DateJumper */}
          <CalendarPreferanceList />
          <EventCalendarList />
          {/* <UserCalendarList /> */}
        </div>
      </section>
      {enterMobileMode && (
        <ModelBackdrop show={sidebarOpen} opacity="opacity-30" />
      )}
    </>
  );
}

export default Sidebar;
