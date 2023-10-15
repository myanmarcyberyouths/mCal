import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

import WeekMode from "./WeekMode/WeekMode";
import MonthMode from "./MonthMode/MonthMode";
import YearMode from "./YearMode/YearMode";

const calendar_modes = {
  W: <WeekMode />,
  M: <MonthMode />,
  Y: <YearMode />,
};

function Calendar() {
  const calendarMode = useSelector((state: RootState) => state.calendarState.calendarMode);

  return (
    <section className="flex-1 h-[calc(100vh-theme(spacing.nav-h))] supports-[height:100cqh]:h-[calc(100cqh-theme(spacing.nav-h))] supports-[height:100svh]:h-[calc(100svh-theme(spacing.nav-h))] border-l  border-gray-300 __scrollbar-md">
      {calendar_modes[calendarMode]}
    </section>
  );
}

export default Calendar;
