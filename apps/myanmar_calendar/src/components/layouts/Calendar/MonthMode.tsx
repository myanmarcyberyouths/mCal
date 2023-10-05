import { RootState } from "@/store";
import { WEEK_DAYS } from "@/utils/constants";
import { getLocalTime } from "@/utils/helpers";
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import DayCell from "./Cells/DayCell";
import { cn } from "@/lib/utils";

function MonthMode() {
  const activeDate = useSelector((state: RootState) => state.calendarState.activeDate);

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(getLocalTime(activeDate))),
    end: endOfWeek(endOfMonth(getLocalTime(activeDate))),
  });

  console.log(days);

  return (
    <>
      <div className="grid grid-cols-7 sticky top-0 h-[2rem] border-b border-gray-300 bg-white">
        {Object.values(WEEK_DAYS).map((weekday) => (
          <span
            key={weekday.short}
            className={cn(
              "flex justify-center items-center border-r border-gray-300 h-full capitalize font-semibold text-[0.9rem]",
              weekday.short === "sun" || weekday.short === "sat" ? "text-red-500" : "text-gray-500"
            )}>
            {weekday.short}
          </span>
        ))}
      </div>
      {/* min-h-[41rem] */}
      <div className="w-full h-[calc(100%-2rem)]  grid grid-cols-7 grid-flow-row-dense">
        {days.map((day, dayIdx) => (
          <DayCell
            key={day.toString()}
            day={day}
          />
        ))}
      </div>
    </>
  );
}

export default MonthMode;
