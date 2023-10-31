import { RootState } from "@/store";
import { CALENDAR_MODE_ENUM } from "@/type-models/calendarState.type";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { add, format, startOfMonth } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

function ActiveDateIndicator() {
  const { activeDate, calendarLanguage, calendarMode } = useSelector((state: RootState) => state.calendarState);

  const activeDateObj = new Date(activeDate);

  const firstDayCurrentMonth = startOfMonth(activeDateObj);

  return (
    <div className="flex items-center gap-7">
      <h2 className="flex items-center gap-3">
        <time
          className="hidden sm2:inline-block text-[1.5rem] text-gray-600"
          dateTime={format(activeDateObj, "yyyy-MM-dd")}>
          {format(activeDateObj, `${calendarMode === CALENDAR_MODE_ENUM.YEAR ? "yyyy" : "MMMM yyyy"}`)}
        </time>
        <span className="hidden sm2:inline-block self-center h-[1.7rem] w-[1px] bg-gray-300"></span>
        <time
          dateTime={format(activeDateObj, "yyyy-MM-dd")}
          className="text-[1.1rem] text-gray-700">
          {i18n("Myanmar Year", "english", calendarLanguage as any)} {i18n(engToMyanmarNumber(englishToMyanmarDate(firstDayCurrentMonth).year), "myanmar", calendarLanguage as any)}{" "}
          {i18n("Ku", "english", calendarLanguage as any)}{" "}
          {calendarMode !== CALENDAR_MODE_ENUM.YEAR && (
            <>
              {i18n(englishToMyanmarDate(firstDayCurrentMonth).month, "myanmar", calendarLanguage as any)}
              {" - "}
              {i18n(englishToMyanmarDate(add(firstDayCurrentMonth, { months: 1 })).month, "myanmar", calendarLanguage as any)}
            </>
          )}
        </time>
      </h2>
    </div>
  );
}

export default ActiveDateIndicator;
