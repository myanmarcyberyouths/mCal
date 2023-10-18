import { cn } from "@/lib/utils";
import { CalendarStateInterface } from "@/store/calendarState";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import React from "react";

interface WeekColumnPropsI {
  day: Date;
  calendarState: CalendarStateInterface;
}

function WeekColumn({ day, calendarState }: WeekColumnPropsI) {
  const { preferance } = calendarState;
  const myanmar_calendar = englishToMyanmarDate(day);
  const mmDate = i18n(engToMyanmarNumber(myanmar_calendar.date), "myanmar", "myanmar" as any);

  return (
    <div className="min-h-[calc(100vh-calc(6.8rem+theme(spacing.nav-h)))] border-r border-gray-300 last:border-none last:pr-1">
      {/* <div className="p-2">
        <span className="h-[2.5rem] bg-indigo-100 w-full px-2 flex items-center text-[0.825rem] text-indigo-500 font-semibold rounded-md">
          {myanmar_calendar.month}
          {myanmar_calendar.moonPhase} <span className="text-sm mb-[0.1rem] ml-1">{mmDate}</span>
        </span>
      </div> */}
      <div className="p-2">
        {preferance.astro && (myanmar_calendar.pyathada || myanmar_calendar.yatyaza) && (
          <span
            className={cn(
              "h-[2.3rem] bg-gray-100 w-full px-2 flex items-center justify-center text-[0.825rem] font-semibold rounded-md",
              myanmar_calendar.pyathada ? "text-red-400 bg-red-50" : "text-blue-500 bg-blue-50"
            )}>
            {myanmar_calendar.pyathada || myanmar_calendar.yatyaza}
          </span>
        )}
      </div>
    </div>
  );
}

export default WeekColumn;

// function MainFeatureCell() {
//   return <div></div>
// }
