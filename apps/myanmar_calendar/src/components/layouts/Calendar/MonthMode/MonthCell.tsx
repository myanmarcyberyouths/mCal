import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/ui/areas/ScrollArea";
import event_calendars from "@/event_calendars";
import { cn } from "@/lib/utils";
import { CalendarStateInterface } from "@/store/calendarState";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { brightenColor } from "@/utils/brightenColor";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { format, isSameMonth, isSameWeek, isToday, lastDayOfMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface MonthCellT {
  day: Date;
  calendarState: CalendarStateInterface;
}

function MonthCell({ day, calendarState }: MonthCellT) {
  const dispatch = useDispatch();
  const { calendarLanguage, activeDate, preferance, eventCalendars } = calendarState;
  const [dayIsToday, setDayIsToday] = useState(false);

  let activeDateObj = new Date(activeDate);

  const dayBelongsInActiveMonth = isSameMonth(day, activeDateObj);
  const dayIsInEndWeek = isSameWeek(lastDayOfMonth(activeDateObj), day);

  const mmDate = i18n(engToMyanmarNumber(englishToMyanmarDate(day).date), "myanmar", "myanmar" as any);
  const myanmarDate = englishToMyanmarDate(day);
  const moonAlign = myanmarDate.moonPhase === "လပြည့်" || myanmarDate.moonPhase === "လကွယ်";

  React.useEffect(() => {
    setDayIsToday(isToday(day));
  }, [day]);

  // Eg; event_calendars(day, ["international", "publicHolidays"])
  const checkedEvents = event_calendars(
    day,
    Object.keys(eventCalendars).filter((calendar) => {
      if (eventCalendars[calendar].checked === true) return calendar;
    })
  );

  return (
    // min-h-[8.5rem]
    <div
      className={cn(
        "border-b border-r flex gap-1 flex-col items-stretch border-gray-300 p-2 py-[0.25rem] pb-[0.3rem]  min-h-[8.5rem] hover:bg-gray-50",
        dayIsInEndWeek ? "min-h-[8.65rem] pb-[0.45rem]" : ""
      )}
      onClick={() => {
        dispatch(setDayDialongTargetDay(day.toISOString()));
      }}>
      {/* ------ CELL TOP ------- */}
      <div className=" flex justify-between items-start">
        <time
          dateTime={format(day, "yyyy-MM-dd")}
          className={cn("flex justify-start -mt-[0.05rem] text-gray-500 flex-1 text-[0.975rem] leading-5", dayBelongsInActiveMonth ? "text-gray-500" : "text-gray-300")}>
          {mmDate}
        </time>
        <time
          className={cn(
            "flex justify-center items-center font-semibold text-[1.12rem]  h-[1.6rem] leading-7",
            dayBelongsInActiveMonth ? "text-gray-600" : "text-gray-300",
            dayIsToday ? "text-gray-50 bg-red-500" : " ",
            format(day, "d") == "1" ? "rounded-md px-[0.35rem]" : "rounded-full w-[1.6rem]"
          )}
          dateTime={format(day, "yyyy-MM-dd")}>
          {format(day, "d")}{" "}
          {format(day, "d") == "1" && (
            <span className={cn("text-[1.12rem] ml-[0.3rem]", dayBelongsInActiveMonth ? "text-gray-600" : "text-gray-300", dayIsToday ? "text-gray-100" : "")}>{format(day, "MMM")}</span>
          )}
        </time>
        {/* ASTRO */}
        <div className={cn("flex flex-1 self-stretch min-w-[1.5rem] justify-end items-center gap-1 transition-all", preferance.astroEvent ? "opacity-100" : "opacity-0")}>
          {/* long text on large screen */}
          <span className={`hidden md3:inline text-[0.65rem] whitespace-nowrap ${myanmarDate.pyathada ? "text-red-500" : "text-blue-500"}`}>{myanmarDate.pyathada || myanmarDate.yatyaza}</span>
          {/* short text on small screen */}
          <span className={`inline md3:hidden text-[0.65rem] ${myanmarDate.pyathada ? "text-red-400" : "text-blue-500"}`}>{myanmarDate.pyathada ? "ပြ" : "ရာ"}</span>
        </div>
      </div>

      {/* ------ CELL MIDDLE ------- */}
      {/* <ScrollArea
        className="flex-1 h-fit w-full overflow-hidden"
        type="hover"
        scrollHideDelay={100}>
      <ScrollViewport className="max-h-full w-full"> */}
      <div className="flex-1 __scrollbar-xs">
        <ul className=" space-y-[0.15rem] ">
          {checkedEvents.map((eventCalendar) => (
            <>
              {eventCalendar.event.map((event) => (
                // h-[1.25rem]
                <li
                  key={event}
                  className="rounded-sm flex items-start py-[0.335rem]   px-1 gap-1 bg-gray-100"
                  style={{
                    backgroundColor: brightenColor(eventCalendars[eventCalendar.eventType].tagColor, 85),
                  }}>
                  <span
                    className="inline-block w-[0.35rem] h-[0.35rem] rounded-full bg-gray-500 mt-[0.15rem] flex-shrink-0"
                    style={{
                      backgroundColor: eventCalendars[eventCalendar.eventType].tagColor,
                    }}></span>
                  <span
                    className="text-[0.7rem] text-gray-600 -mt-[0.1rem] font-semibold leading-[0.7rem]"
                    style={{
                      color: eventCalendars[eventCalendar.eventType].tagColor,
                    }}>
                    {event}
                  </span>
                </li>
              ))}
            </>
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
      {(mmDate == "၁" || moonAlign) && preferance.moonPhase && (
        <div className="flex justify-between items-center h-[1.1rem] flex-shrink-0">
          <div></div>
          {/* MOON PHASE */}
          <div className={cn("flex gap-1 items-center transition-all", preferance.moonPhase ? "opacity-100" : "opacity-0")}>
            {(mmDate == "၁" || moonAlign) && (
              <span className="hidden md2:inline text-[0.68rem] leading-[1.3rem] text-gray-600 whitespace-nowrap overflow-x-hidden">
                {myanmarDate.month}
                {myanmarDate.moonPhase}
              </span>
            )}
            {moonAlign && <span className={`w-[0.91rem] h-[0.91rem] flex-shrink-0  rounded-full ${myanmarDate.moonPhase === "လပြည့်" ? "bg-red-500" : "bg-gray-600"}`}></span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthCell;
