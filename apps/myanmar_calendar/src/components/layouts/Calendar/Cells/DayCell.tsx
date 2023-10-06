import { setDayDialongTargetDay } from "@/store/modelControlState";
import { LANGUAGE_ENUM } from "@/type-models/calendarState.type";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { getLocalTime } from "@/utils/helpers";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { format, isToday } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";

interface DayCellT {
  day: Date;
  language: LANGUAGE_ENUM;
}

function DayCell({ day, language }: DayCellT) {
  const dispatch = useDispatch();
  const dayIsToday = isToday(getLocalTime(day));

  const mmDate = i18n(engToMyanmarNumber(englishToMyanmarDate(day).date), "myanmar", "myanmar" as any);
  const myanmar_calendar = englishToMyanmarDate(day);
  const moonAlign = myanmar_calendar.moonPhase === "လပြည့်" || myanmar_calendar.moonPhase === "လကွယ်";

  return (
    <div
      className="border-b border-r flex flex-col items-stretch border-gray-300 p-2 py-[0.25rem] pb-[0.4rem] min-h-[8.5rem]"
      onClick={() => {
        dispatch(setDayDialongTargetDay(day.toISOString()));
      }}>
      <div className=" flex justify-between items-start ">
        <time className="flex justify-start -mt-[0.05rem] text-gray-500 flex-1 text-[0.92rem] leading-5">{mmDate}</time>
        <time
          className={`flex justify-center items-center font-semibold text-[1.12rem]  h-[1.6rem] leading-7  ${dayIsToday ? "text-gray-100 bg-red-500" : "text-gray-600 "} ${
            format(day, "d") == "1" ? "rounded-md px-[0.35rem]" : "rounded-full w-[1.6rem]"
          }`}
          dateTime={day.toLocaleDateString()}>
          {format(day, "d")} {format(day, "d") == "1" && <span className={`${dayIsToday ? "text-gray-100" : "text-gray-600 "}text-[1.12rem] ml-[0.3rem]`}>{format(day, "MMM")}</span>}
        </time>
        <div className="flex flex-1 self-stretch min-w-[1.5rem] justify-end items-center gap-1">
          {myanmar_calendar && (
            <>
              {/* <span className={`hidden lg:inline text-[0.65rem] ${myanmar_calendar.pyathada ? "text-red-500" : "text-blue-500"}`}>{myanmar_calendar.pyathada || myanmar_calendar.yatyaza}</span> */}
              {/* <span className={`w-[0.95rem] aspect-square rounded-full ${myanmar_calendar.moonPhase === "လပြည့်" ? "bg-red-500" : "bg-gray-600"}`}></span> */}

              {/* full text on large screen */}
              <span className={`hidden md3:inline text-[0.65rem] whitespace-nowrap ${myanmar_calendar.pyathada ? "text-red-500" : "text-blue-500"}`}>
                {myanmar_calendar.pyathada || myanmar_calendar.yatyaza}
              </span>
              {/* short text on small screen */}
              <span className={`inline md3:hidden text-[0.65rem] ${myanmar_calendar.pyathada ? "text-red-400" : "text-blue-500"}`}>{myanmar_calendar.pyathada ? "ပြ" : "ရာ"}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 "></div>
      <div className="flex justify-between items-center h-[1rem]">
        <div></div>
        <div className="flex gap-1 items-center ">
          {(mmDate == "၁" || moonAlign) && (
            <>
              <span className="hidden md2:inline text-[0.68rem] leading-[1.3rem] text-gray-600 whitespace-nowrap overflow-x-hidden">
                {myanmar_calendar.month}
                {myanmar_calendar.moonPhase}
              </span>
            </>
          )}
          {moonAlign && <span className={`w-[0.91rem] h-[0.91rem] flex-shrink-0  rounded-full ${myanmar_calendar.moonPhase === "လပြည့်" ? "bg-red-500" : "bg-gray-600"}`}></span>}
        </div>

        {/* full text on large screen */}
        {/* <span className={`hidden lg1:inline text-[0.65rem] whitespace-nowrap ${myanmar_calendar.pyathada ? "text-red-500" : "text-blue-500"}`}>
          {myanmar_calendar.pyathada || myanmar_calendar.yatyaza}
        </span> */}
        {/* short text on small screen */}
        {/* <span className={`inline lg1:hidden text-[0.65rem] ${myanmar_calendar.pyathada ? "text-red-400" : "text-blue-500"}`}>{myanmar_calendar.pyathada ? "ပြ" : "ရာ"}</span> */}
      </div>
    </div>
  );
}

export default DayCell;
