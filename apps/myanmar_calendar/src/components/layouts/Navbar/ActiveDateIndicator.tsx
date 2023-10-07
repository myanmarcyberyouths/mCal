import { RootState } from "@/store";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { add, format, startOfMonth } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

function ActiveDateIndicator() {
  const { activeDate, calendarLanguage } = useSelector((state: RootState) => state.calendarState);

  const activeDateObj = new Date(activeDate);

  const firstDayCurrentMonth = startOfMonth(activeDateObj);

  return (
    <div className="flex items-center gap-7">
      <h2 className="flex items-center gap-3">
        <time
          className="text-2xl text-gray-700"
          dateTime={format(activeDateObj, "yyyy-MM-dd")}>
          {format(activeDateObj, "MMMM yyyy")}
        </time>
        <span className="self-center h-[1.7rem] w-[1px] bg-gray-300 inline-block"></span>
        <span className="text-[1.1rem] text-gray-700">
          {i18n("Myanmar Year", "english", calendarLanguage as any)} {i18n(engToMyanmarNumber(englishToMyanmarDate(firstDayCurrentMonth).year), "myanmar", calendarLanguage as any)}{" "}
          {i18n("Ku", "english", calendarLanguage as any)} {i18n(englishToMyanmarDate(firstDayCurrentMonth).month, "myanmar", calendarLanguage as any)}
          {" - "}
          {i18n(englishToMyanmarDate(add(firstDayCurrentMonth, { months: 1 })).month, "myanmar", calendarLanguage as any)}
        </span>
      </h2>
    </div>
  );
}

export default ActiveDateIndicator;
