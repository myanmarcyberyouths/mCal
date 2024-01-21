import {
  ScrollArea,
  ScrollBar,
  ScrollViewport,
} from "@/components/ui/areas/ScrollArea";
import { getAllEventsOfDay } from "@/event_calendars/formatEvent";
import useDayEndInterval from "@/hooks/useDayEndInterval";
import { cn } from "@/lib/utils";
import { CalendarStateInterface } from "@/store/calendarState";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { modifyColorOpacity } from "@/utils/styleHelpers";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import {
  format,
  isSameMonth,
  isSameWeek,
  isToday,
  lastDayOfMonth,
} from "date-fns";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface MonthCellT {
  day: Date;
  calendarState: CalendarStateInterface;
}

function MonthCell({ day, calendarState }: MonthCellT) {
  const dispatch = useDispatch();
  const { calendarLanguage, activeDate, show, eventCalendars } = calendarState;
  const [dayIsToday, setDayIsToday] = useState(isToday(day));

  let activeDateObj = new Date(activeDate);

  const dayBelongsInActiveMonth = isSameMonth(day, activeDateObj);
  const dayIsInEndWeek = isSameWeek(lastDayOfMonth(activeDateObj), day);

  const mmDate = i18n(
    engToMyanmarNumber(englishToMyanmarDate(day).date),
    "myanmar",
    "myanmar" as any,
  );
  const myanmarDate = englishToMyanmarDate(day);
  const moonAlign =
    myanmarDate.moonPhase === "လပြည့်" || myanmarDate.moonPhase === "လကွယ်";

  useDayEndInterval(() => setDayIsToday(isToday(day)));

  const checkedEvents = getAllEventsOfDay(
    day,
    eventCalendars.filter((calendar) => calendar.checked === true),
  );

  return (
    // min-h-[8.5rem]
    <div
      className={cn(
        "flex min-h-[8.5rem] flex-col items-stretch gap-1 border-b border-r border-gray-200 p-2 py-[0.25rem] pb-[0.3rem]  hover:bg-gray-50 dark:border-gray-100",
        dayIsInEndWeek ? "min-h-[8.65rem] pb-[0.45rem]" : "",
      )}
      onClick={() => {
        dispatch(setDayDialongTargetDay(day.toISOString()));
      }}
    >
      {/* ------ CELL TOP ------- */}
      <div className=" flex items-start justify-between">
        <time
          dateTime={format(day, "yyyy-MM-dd")}
          className={cn(
            "-mt-[0.05rem] flex flex-1 justify-start text-[0.825rem] leading-5 text-gray-500",
            dayBelongsInActiveMonth ? "text-gray-500" : "text-gray-300",
          )}
        >
          {mmDate}
        </time>
        <time
          className={cn(
            "flex aspect-square h-[1.6rem] justify-center  text-[1.025rem] font-medium leading-7",
            dayBelongsInActiveMonth ? "text-gray-600" : "text-gray-300",
            dayIsToday && "rounded-full bg-red-500 text-gray-50",
          )}
          dateTime={format(day, "yyyy-MM-dd")}
        >
          {format(day, "d")}{" "}
          {/* {format(day, "d") == "1" && (
            <span className={cn("text-[1.025rem] ml-[0.3rem]", dayBelongsInActiveMonth ? "text-gray-600" : "text-gray-300", dayIsToday ? "text-gray-100" : "")}>{format(day, "MMM")}</span>
          )} */}
        </time>
        {/* ASTRO */}
        <div
          className={cn(
            "flex min-w-[1.5rem] flex-1 items-center justify-end gap-1 self-stretch transition-all",
            show.astroEvent ? "opacity-100" : "opacity-0",
          )}
        >
          {/* long text on large screen */}
          <span
            className={`hidden whitespace-nowrap text-[0.65rem] md3:inline ${
              myanmarDate.pyathada ? "text-red-500" : "text-blue-500"
            }`}
          >
            {myanmarDate.pyathada || myanmarDate.yatyaza}
          </span>
          {/* short text on small screen */}
          <span
            className={`inline text-[0.65rem] md3:hidden ${
              myanmarDate.pyathada ? "text-red-400" : "text-blue-500"
            }`}
          >
            {myanmarDate.pyathada ? "ပြ" : "ရာ"}
          </span>
        </div>
      </div>

      {/* ------ CELL MIDDLE ------- */}
      {/* <ScrollArea
        className="flex-1 h-fit w-full overflow-hidden"
        type="hover"
        scrollHideDelay={100}>
      <ScrollViewport className="max-h-full w-full"> */}
      <div className="__scrollbar-xxs flex-1">
        <ul className=" space-y-[0.15rem] ">
          {checkedEvents.map((eventCalendar) => (
            <Fragment key={eventCalendar.id}>
              {eventCalendar.events.map((event) => (
                // h-[1.25rem]
                <li
                  key={event}
                  className="flex items-start gap-1 rounded-sm bg-gray-100 px-1 py-[0.335rem]"
                  style={{
                    backgroundColor: modifyColorOpacity(
                      eventCalendar.tagColor,
                      0.15,
                    ),
                    // backgroundColor: brightenColor(eventCalendars[eventCalendar.eventType].tagColor, 85),
                  }}
                >
                  <span
                    className="mt-[0.15rem] inline-block h-[0.35rem] w-[0.35rem] flex-shrink-0 rounded-full bg-gray-500"
                    style={{
                      backgroundColor: eventCalendar.tagColor,
                    }}
                  ></span>
                  <span
                    className="-mt-[0.025rem] text-[0.7rem] font-semibold leading-[0.7rem] text-gray-600"
                    style={{
                      color: eventCalendar.tagColor,
                    }}
                  >
                    {event}
                  </span>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      </div>
      {/* <ScrollBar
            className=""
            thumbClassName="bg-gray-300"
          />
        </ScrollViewport>
      </ScrollArea> */}

      {/* ------ CELL BOTTOM ------- */}
      {(mmDate == "၁" || moonAlign) && show.moonPhase && (
        <div className="flex h-[1.1rem] flex-shrink-0 items-center justify-between">
          <div aria-hidden="true"></div>
          {/* MOON PHASE */}
          <div
            className={cn(
              "flex items-center gap-1 transition-all",
              show.moonPhase ? "opacity-100" : "opacity-0",
            )}
          >
            {(mmDate == "၁" || moonAlign) && (
              <span className="hidden overflow-x-hidden whitespace-nowrap text-[0.68rem] leading-[1.3rem] text-gray-600 md2:inline">
                {myanmarDate.month}
                {myanmarDate.moonPhase}
              </span>
            )}
            {moonAlign && (
              <span
                className={`h-[0.91rem] w-[0.91rem] flex-shrink-0  rounded-full ${
                  myanmarDate.moonPhase === "လပြည့်"
                    ? "bg-red-500"
                    : "bg-gray-700"
                }`}
              ></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthCell;
