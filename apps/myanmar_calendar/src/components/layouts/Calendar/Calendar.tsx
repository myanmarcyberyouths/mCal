import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

import WeekMode from "./WeekMode";
import MonthMode from "./MonthMode";
import YearMode from "./YearMode";

const calendar_modes = {
  W: <WeekMode />,
  M: <MonthMode />,
  Y: <YearMode />,
};

function Calendar() {
  const calendarMode = useSelector((state: RootState) => state.calendarState.calendarMode);

  return <section className="flex-1 h-[calc(100vh-theme(spacing.nav-h))] border-l  border-gray-300 __scrollbar-md">{calendar_modes[calendarMode]}</section>;
}

export default Calendar;
