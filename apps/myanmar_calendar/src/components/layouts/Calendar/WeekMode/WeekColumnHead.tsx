import { cn } from "@/lib/utils";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { format, isToday, isWeekend } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";

function WeekColumnHead({
  day,
  scrollReachedTop,
}: {
  day: Date;
  scrollReachedTop: boolean;
}) {
  const dispatch = useDispatch();
  const dayIsToday = isToday(day);
  const myanmar_calendar = englishToMyanmarDate(day);
  const mmDate = i18n(
    engToMyanmarNumber(myanmar_calendar.date),
    "myanmar",
    "myanmar" as any,
  );

  return (
    <div
      key={day.toString()}
      className={cn(
        "group/weekHeader flex flex-col items-center justify-between border-b border-gray-300  last:mr-1",
        !scrollReachedTop && " border-b-gray-100",
      )}
    >
      <div className="flex flex-col items-center gap-[0.1rem] pt-2">
        <div
          className={cn(
            "text-sm font-medium text-gray-450",
            isWeekend(day) && "text-red-500",
          )}
        >
          {format(day, "iii")}
        </div>
        <time
          onClick={() => {
            dispatch(setDayDialongTargetDay(day.toISOString()));
          }}
          dateTime={format(day, "yyyy-MM-dd")}
          className={cn(
            " flex h-[1.9rem] w-[1.9rem] cursor-pointer items-center justify-center rounded-full text-[1.15rem] font-semibold text-gray-450",
            dayIsToday
              ? "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
              : " hover:bg-gray-200 hover:text-gray-600 active:bg-gray-300 ",
          )}
        >
          {format(day, "d")}
        </time>
      </div>
      <div className=" w-full justify-self-end border-r border-gray-200 group-last/weekHeader:border-r-0 ">
        <div className="p-1 px-[0.35rem] pb-[0.3rem]">
          <time
            dateTime={format(day, "yyyy-MM-dd")}
            className="flex h-[2rem] w-full items-center justify-center rounded-md bg-gray-100 px-2 text-[0.825rem] font-semibold text-gray-450 hover:text-gray-500"
          >
            <span className="text-[0.825rem] font-semibold text-gray-600">
              {myanmar_calendar.month}
              {myanmar_calendar.moonPhase}
            </span>
            <span className="mb-[0.1rem] ml-1 text-[0.9rem] font-semibold text-gray-600">
              {mmDate}
            </span>
          </time>
        </div>
      </div>
    </div>
  );
}

export default WeekColumnHead;
