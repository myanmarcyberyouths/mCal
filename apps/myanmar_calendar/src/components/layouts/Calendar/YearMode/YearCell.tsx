import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { setActiveDate, setCalendarMode } from "@/store/calendarState";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { CALENDAR_MODE } from "@/type-models/calendarState.type";
import { MIN_WIDTHS, WEEK_DAYS } from "@/utils/constants";
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, isThisMonth, isToday, nextDay, startOfMonth, startOfWeek } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function YearCell({ month }: { month: Date }) {
  // let monthName = month.toLocaleString("en-US", { month: "long" });

  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  const dispatch = useDispatch();
  const endOfTheMonth = endOfMonth(month);

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(nextDay(endOfTheMonth, 0)),
  });

  // const monthIsThisMonth = isThisMonth(month);

  const handleViewMonth = () => {
    dispatch(setCalendarMode(CALENDAR_MODE.MONTH));
    dispatch(setActiveDate(month.toISOString()));
  };

  return (
    <div className="flex justify-center items-start py-2 pt-3 px-2 sm:px-0">
      <div className="w-full px-[0.4rem] sm1:px-0 sm1:w-auto h-full sm2:h-auto">
        <a
          className={cn(
            "pl-3 sm1:pl-2 py-1 block text-[1.05rem] sm1:text-[0.925rem] font-medium sm2:hover:bg-gray-100  rounded-md sm2:cursor-pointer sm2:hover:underline mb-2 sm1:mb-[0.1rem]  text-red-500 sm1:text-gray-600 sm1:hover:text-gray-700  decoration-gray-500",
          )}
          onClick={(e) => {
            e.preventDefault();
            if (enterMobileMode) return;
            handleViewMonth();
          }}
        >
          <span className="first-letter:capitalize">
            {format(month, "MMMM")}
          </span>
        </a>
        <div className="grid grid-cols-7 gap-[0.4rem]">
          {Object.values(WEEK_DAYS).map((weekDay) => (
            <span
              key={weekDay.short}
              className=" capitalize text-red-400 text-[0.9rem] sm1:text-[0.85rem] font-medium text-center w-[1.75rem] h-[1.75rem] mx-auto"
            >
              {weekDay.long[0]}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-flow-row-dense gap-x-[0.5rem] gap-y-2 sm1:gap-y-[0.35rem]">
          {days.splice(0, 42).map((day) => {
            const dayIsToday = isToday(day);
            const isDayInCurrentMonth = isSameMonth(day, month);
            return (
              <time
                key={day.toString()}
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                  "flex justify-center items-center rounded-full text-sm sm1:text-xs font-semibold sm2:font-medium w-[1.65rem] h-[1.65rem] cursor-pointer mx-auto",
                  isDayInCurrentMonth
                    ? "text-gray-600  hover:text-gray-800 hover:bg-gray-200"
                    : " text-gray-200 hover:bg-gray-100",
                  dayIsToday && isDayInCurrentMonth
                    ? "bg-red-500 hover:bg-red-600 text-white hover:text-white"
                    : "",
                )}
                onClick={() => {
                  dispatch(setDayDialongTargetDay(day.toISOString()));
                }}
              >
                {format(day, "d")}
              </time>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default YearCell;
