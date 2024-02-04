import { RootState } from "@/store";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getWeeksInMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import MonthCell from "./MonthCell";
import { cn } from "@/lib/utils";
import { getLocalTime, getWeekDayIndex } from "@/utils/dateTimeHelper";
import { OptionsWithTZ } from "date-fns-tz";
import useAriaGridNavigation from "@/hooks/useAriaGridNavigation";
import {updateActiveDate} from "@/store/calendarState";
import {CALENDAR_MODES, SLIDE_DIRECTION} from "@/utils/constants";

function MonthMode() {
  const dispatch = useDispatch()
  const calendarState = useSelector((state: RootState) => state.calendarState);
  const { activeDate, weekStart } = calendarState;
  let activeDateObj = new Date(activeDate);

  const options: OptionsWithTZ = {
    weekStartsOn: getWeekDayIndex(weekStart),
  };

  let weeks = eachWeekOfInterval({
    start: startOfWeek(startOfMonth(getLocalTime(activeDateObj)), options),
    end: endOfWeek(endOfMonth(getLocalTime(activeDateObj)), options),
  });



  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(getLocalTime(activeDateObj)), options),
    end: endOfWeek(endOfMonth(getLocalTime(activeDateObj)), options),
  });

  const firstWeek = days.slice(0, 7);

  const handleCalendarSlide = (direction: SLIDE_DIRECTION) => {

    dispatch(
      updateActiveDate({
        [CALENDAR_MODES[calendarState.calendarMode] + "s"]: direction,
      }),
    );
  };

  const calendarGridRef = useAriaGridNavigation({
    rowSelector: 'tr.aria-row',
    colSelector: 'td.aria-col',
    onReachStart: () => handleCalendarSlide(SLIDE_DIRECTION.PREVIOUS),
    onReachEnd: () => handleCalendarSlide(SLIDE_DIRECTION.NEXT)
  }, [calendarState])


  return (
    <table aria-label="Calendar month view" className="h-full w-full border-collapse">
      <thead className="sticky top-0 block">
        <tr className="grid h-[2.25rem] grid-cols-7 border-gray-200 bg-gray-0">
        {firstWeek.map((day) => {
          const weekDayName = format(day, "ccc");
          return (
            <th
              key={day.toString()}
              className={cn(
                "flex h-full items-stretch justify-center border-r border-gray-200 px-2  text-[0.85rem] font-medium capitalize",
                weekDayName === "Sun" || weekDayName === "Sat"
                  ? "text-red-500"
                  : "text-gray-450",
              )}
            >
              <span className="inline-block w-full h-full py-[0.35rem] border-b border-gray-200/70">
              <span className=" flex h-full w-full items-center justify-center rounded-md bg-gray-100">
                {weekDayName}
              </span>
              </span>
            </th>
          );
        })}
        </tr>
      </thead>

      {/* min-h-[41rem] */}
      {/* grid-rows-[repeat(auto-fill,minmax(1fr,auto))] */}
      <tbody
        ref={calendarGridRef}
        className=" h-[calc(100%-2.25rem)] grid grid-cols-1 focus:-outline-offset-1 border-collapse">
        {weeks.map(week => {
          const days = eachDayOfInterval({
            start: startOfWeek(week, options),
            end: endOfWeek(week, options)
          })
          return (
            <tr key={week.toString()} className="aria-row grid grid-flow-row auto-rows-[1fr] grid-cols-[repeat(7,minmax(auto,1fr))] border-collapse">
              {days.map((day) => (
                <MonthCell
                  key={day.toString()}
                  day={day}
                  calendarState={calendarState}
                />
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default MonthMode;


// Grid row auto wrap with dynamic height

{/* <tr className="grid h-[calc(100%-2.25rem)]  w-full grid-flow-row auto-rows-[1fr] grid-cols-[repeat(7,minmax(auto,1fr))]">
  {days.map((day) => (
    <MonthCell
      key={day.toString()}
      day={day}
      calendarState={calendarState}
    />
  ))}
</tr> */}