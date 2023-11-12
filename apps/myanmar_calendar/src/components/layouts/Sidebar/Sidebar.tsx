import React, { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CalendarLanguageSelectBox } from "./LanguageSelectBox";
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
  // const [hideSidebar, setHi]

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
          "absolute h-[100vh] border-r border-gray-200 top-0 z-10 shadow-lg xl:shadow-none xl:static xl:h-[calc(100vh-theme(spacing.nav-h))] xl:border-none flex-shrink-0 transition-all duration-300 flex flex-col items-center overflow-hidden bg-gray-0 -translate-x-[100%] sm2:translate-x-0",
          enterMobileMode &&
            `'w-[83%] max-w-[22rem]' ${sidebarOpen ? "translate-x-0" : ""}`,
          !enterMobileMode &&
            `${sidebarOpen ? "w-[19rem] xl:w-sidebar-w" : "w-0"}`,
        )}
      >
        <div className="xl:hidden h-nav-h w-[90%] xl:w-[16rem] flex justify-between items-center flex-shrink-0 pl-1">
          <AppLogo />
          <SidebarToggleBtn>
            <BsArrowLeftShort size={30} />
          </SidebarToggleBtn>
        </div>
        {/* w-[calc(theme(spacing.sidebar-w)-2.5rem)] */}
        <div className="space-y-6 bg-gray-0 w-full min-w-[19rem] xl:min-w-[theme(spacing.sidebar-w)] xl:w-sidebar-w flex-shrink-0 py-3 pt-4 h-[calc(100%-theme(spacing.nav-h))] xl:h-full px-5 __scrollbar-sm">
          <div className="">
            <p className="text-[0.75rem] font-medium text-gray-450 mb-[0.4rem]">
              CALENDAR LANGUAGE
            </p>
            <CalendarLanguageSelectBox />
          </div>
          {/* => SystemLanguageSelectBox */}
          {/* => DateJumper */}
          <CalendarPreferanceList />
          <EventCalendarList />
          {/* <UserCalendarList /> */}
        </div>
      </section>
      {enterMobileMode && <ModelBackdrop show={sidebarOpen} opacity="0.3" />}
    </>
  );
}

export default Sidebar;
