import { RootState } from "@/store";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { add, format, startOfMonth } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

function ActiveDateIndicator() {
  const activeDate = useSelector((state: RootState) => state.calendarState.activeDate);

  const firstDayCurrentMonth = startOfMonth(activeDate);

  return (
    <div className="flex items-center gap-7">
      <h2 className="flex items-center gap-3">
        <time
          className="text-2xl text-gray-700"
          dateTime={format(activeDate, "yyyy-MM-dd")}>
          {format(activeDate, "MMMM yyyy")}
        </time>
        <span className="self-center h-[1.7rem] w-[1px] bg-gray-300 inline-block"></span>
        <span className="text-[1.1rem] text-gray-700">
          {/* မြန်မာနှစ် ၁၃၈၅ ခု တန်ဆောင်မုန်း - နတ်တော် */}
          {i18n("Myanmar Year", "english", "myanmar" as any)} {i18n(engToMyanmarNumber(englishToMyanmarDate(firstDayCurrentMonth).year), "myanmar", "myanmar" as any)}{" "}
          {i18n("Ku", "english", "myanmar" as any)} {i18n(englishToMyanmarDate(firstDayCurrentMonth).month, "myanmar", "myanmar" as any)}
          {" - "}
          {i18n(englishToMyanmarDate(add(firstDayCurrentMonth, { months: 1 })).month, "myanmar", "myanmar" as any)}
        </span>
      </h2>
    </div>
  );
}

export default ActiveDateIndicator;
