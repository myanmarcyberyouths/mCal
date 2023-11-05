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
      <div className="flex flex-col md2:flex-row md2:items-center md2:gap-3">
        <h2 className="text-[1.1rem] md2:text-[1.5rem] text-gray-600">
          <time
            className="hidden sm2:inline-block "
            dateTime={format(activeDateObj, "yyyy-MM-dd")}>
            {format(activeDateObj, `${calendarMode === CALENDAR_MODE_ENUM.YEAR ? "yyyy" : "MMMM yyyy"}`)}
          </time>
        </h2>
        <span
          aria-hidden="true"
          className="hidden md2:inline-block self-center h-[1.7rem] w-[1px] bg-gray-300"></span>
        <h2 className="text-[1.1rem] sm2:text-[1rem] md2:text-[1.1rem] text-gray-700">
          <time
            dateTime={format(activeDateObj, "yyyy-MM-dd")}
            className="">
            <span className="inline sm2:hidden md3:inline">{i18n("Myanmar Year", "english", calendarLanguage as any)}</span>{" "}
            {i18n(engToMyanmarNumber(englishToMyanmarDate(firstDayCurrentMonth).year), "myanmar", calendarLanguage as any)} {i18n("Ku", "english", calendarLanguage as any)}{" "}
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
    </div>
  );
}

export default ActiveDateIndicator;
