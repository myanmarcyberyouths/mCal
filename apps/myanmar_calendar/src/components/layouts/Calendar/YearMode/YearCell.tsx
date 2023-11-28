import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { setActiveDate, setCalendarMode } from "@/store/calendarState";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { CalendarMode } from "@/type-models/calendarState.type";
import { WEEK_DAYS } from "@/type-models/utils.type";
import { MIN_WIDTHS } from "@/utils/constants";
import { getWeekDayIndex } from "@/utils/dateTimeHelper";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isThisMonth,
  isToday,
  nextDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { OptionsWithTZ } from "date-fns-tz";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface YearCellInterface {
  month: Date;
  weekStart: WEEK_DAYS;
}

function YearCell({ month, weekStart }: YearCellInterface) {
  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  const dispatch = useDispatch();
  const endOfTheMonth = endOfMonth(month);

  const options: OptionsWithTZ = {
    weekStartsOn: getWeekDayIndex(weekStart),
  };

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), options),
    end: endOfWeek(nextDay(endOfTheMonth, 0), options),
  });

  const firstWeek = days.slice(0, 7);

  const handleViewMonth = () => {
    dispatch(setCalendarMode(CalendarMode.MONTH));
    dispatch(setActiveDate(month.toISOString()));
  };

  return (
    <div className="flex items-start justify-center px-2 py-2 pt-3 sm:px-0">
      <div className="h-full w-full px-[0.4rem] sm1:w-auto sm1:px-0 sm2:h-auto">
        <a
          className={cn(
            "block rounded-md py-1 pl-3 text-[1.05rem] font-medium text-red-500 decoration-gray-500  sm1:mb-[0.1rem] sm1:pl-2 sm1:text-[0.925rem] sm1:text-gray-600  sm1:hover:text-gray-700 sm2:cursor-pointer sm2:hover:bg-gray-100  sm2:hover:underline",
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
        <div className="mt-2 grid grid-cols-7 gap-[0.4rem]">
          {firstWeek.map((weekDay) => (
            <span
              key={weekDay.toString()}
              className=" mx-auto h-[1.75rem] w-[1.75rem] text-center text-[0.9rem] font-medium capitalize text-red-400 dark:text-red-500 sm1:text-[0.75rem]"
            >
              {format(weekDay, "ccc")[0]}
            </span>
          ))}
        </div>
        <div className="grid grid-flow-row-dense grid-cols-7 gap-x-[0.5rem] gap-y-2 sm1:gap-y-[0.35rem]">
          {days.splice(0, 42).map((day) => {
            const dayIsToday = isToday(day);
            const isDayInCurrentMonth = isSameMonth(day, month);
            return (
              <time
                key={day.toString()}
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                  "mx-auto flex h-[1.65rem] w-[1.65rem] cursor-pointer items-center justify-center rounded-full text-sm font-semibold sm1:text-xs sm2:font-medium",
                  isDayInCurrentMonth
                    ? "text-gray-600  hover:bg-gray-200 hover:text-gray-800"
                    : " text-gray-200 hover:bg-gray-100",
                  dayIsToday && isDayInCurrentMonth
                    ? "bg-red-500 text-white hover:bg-red-600 hover:text-white"
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
