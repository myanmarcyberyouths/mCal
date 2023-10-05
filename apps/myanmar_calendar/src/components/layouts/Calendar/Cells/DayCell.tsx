import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { format } from "date-fns";
import React from "react";

interface DayCellT {
  day: Date;
}

function DayCell({ day }: DayCellT) {
  return (
    <div className="border-b border-r border-gray-300 p-2 py-[0.2rem] min-h-[8.5rem]">
      <div className=" flex justify-between items-start ">
        <time className="flex justify-start -mt-[0.05rem] text-gray-500 flex-1 text-[0.92rem] leading-5">{i18n(engToMyanmarNumber(englishToMyanmarDate(day).date), "myanmar", "myanmar" as any)}</time>
        <time
          className="flex justify-center items-end font-semibold text-gray-600 text-[1.12rem] w-[1.5rem] leading-7"
          dateTime={day.toLocaleDateString()}>
          {format(day, "d")} {format(day, "d") == "1" && <span className="text-gray-600 text-[1.12rem] ml-[0.3rem]">{format(day, "MMM")}</span>}
        </time>
        <div className="flex flex-1 self-stretch min-w-[1.5rem] justify-end items-center gap-1">
          {(englishToMyanmarDate(day).moonPhase === "လပြည့်" || englishToMyanmarDate(day).moonPhase === "လကွယ်") && (
            <>
              <span className="text-[0.7rem] text-gray-600">{englishToMyanmarDate(day).moonPhase}</span>
              <span className={`w-[0.95rem] aspect-square rounded-full ${englishToMyanmarDate(day).moonPhase === "လပြည့်" ? "bg-red-500" : "bg-gray-600"}`}></span>
            </>
          )}
          {/* {englishToMyanmarDate(day).moonPhase === "လကွယ်" && <span className="w-[1rem] h-[1rem] rounded-full bg-gray-700"></span>} */}
        </div>
      </div>
    </div>
  );
}

export default DayCell;
