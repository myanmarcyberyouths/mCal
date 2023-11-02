import { cn } from "@/lib/utils";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { engToMyanmarNumber } from "@/utils/engToMyanmarNumber";
import { englishToMyanmarDate, i18n } from "burma-calendar";
import { format, isToday, isWeekend } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";

function WeekColumnHead({ day, scrollReachedTop }: { day: Date; scrollReachedTop: boolean }) {
  const dispatch = useDispatch();
  const dayIsToday = isToday(day);
  const myanmar_calendar = englishToMyanmarDate(day);
  const mmDate = i18n(engToMyanmarNumber(myanmar_calendar.date), "myanmar", "myanmar" as any);

  return (
    <div
      key={day.toString()}
      className={cn("group/weekHeader flex flex-col items-center justify-between border-b border-gray-300  last:mr-1", !scrollReachedTop && " border-b-gray-100")}>
      <div className="flex flex-col items-center pt-2 gap-[0.1rem]">
        <div className={cn("font-medium text-gray-450 text-sm", isWeekend(day) && "text-red-500")}>{format(day, "iii")}</div>
        <time
          onClick={() => {
            dispatch(setDayDialongTargetDay(day.toISOString()));
          }}
          dateTime={format(day, "yyyy-MM-dd")}
          className={cn(
            " text-[1.15rem] font-semibold text-gray-450 flex items-center justify-center rounded-full w-[1.9rem] h-[1.9rem] cursor-pointer",
            dayIsToday ? "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white" : " hover:bg-gray-200 active:bg-gray-300 hover:text-gray-600 "
          )}>
          {format(day, "d")}
        </time>
      </div>
      <div className=" justify-self-end border-r group-last/weekHeader:border-r-0 border-gray-200 w-full ">
        <div className="p-1 px-[0.35rem] pb-[0.3rem]">
          <time
            dateTime={format(day, "yyyy-MM-dd")}
            className="h-[2rem] w-full px-2 flex items-center justify-center text-[0.825rem] bg-gray-50 text-gray-450 font-semibold rounded-md hover:text-gray-500">
            <span className="text-[0.825rem] font-semibold ">
              {myanmar_calendar.month}
              {myanmar_calendar.moonPhase}
            </span>
            <span className="text-[0.9rem] mb-[0.1rem] ml-1 font-semibold">{mmDate}</span>
          </time>
        </div>
      </div>
    </div>
  );
}

export default WeekColumnHead;
