import useKeyPress from "@/hooks/useKeyPress";
import { RootState } from "@/store";
import { setActiveDate, updateActiveDate } from "@/store/calendarState";
import { CalendarMode } from "@/type-models/calendarState.type";
import {CALENDAR_MODES} from "@/utils/constants";
import { getLocalTime } from "@/utils/helpers";
import { format, isSameDay, isThisMonth, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

function CalendarSlider() {
  const dispatch = useDispatch();
  const calendarMode = useSelector(
    (state: RootState) => state.calendarState.calendarMode,
  );
  const activeDate = useSelector(
    (state: RootState) => state.calendarState.activeDate,
  );
  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );

  const [activeDateIsThisMonth, setActiveDateIsThisMonth] = useState(false);

  const handleCalendarSlide = (direction: "next" | "prev") => {
    const slideValue = direction === "next" ? 1 : -1;

    dispatch(updateActiveDate({
      [CALENDAR_MODES[calendarMode] + 's']: slideValue
    }))
  };

  useEffect(() => {
    setActiveDateIsThisMonth(isThisMonth(new Date(activeDate)));
  }, [activeDate]);

  const dayDialogTargetDay = useSelector(
    (state: RootState) => state.modelControlState.dayDialogTargetDay,
  );

  useKeyPress(
    "ArrowLeft",
    () => handleCalendarSlide("prev"),
    !!dayDialogTargetDay,
  );
  useKeyPress(
    "ArrowRight",
    () => handleCalendarSlide("next"),
    !!dayDialogTargetDay,
  );

  return (
    <div className="flex h-[2.5rem] flex-shrink-0 items-stretch overflow-hidden rounded-md border border-gray-200">
      <button
        className="flex aspect-square items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 "
        onClick={() => handleCalendarSlide("prev")}
      >
        <BiChevronLeft size={24} />
      </button>
      <button
        className={`flex items-center justify-center border-r border-l border-gray-250 hover:bg-gray-100 text-[0.95rem]  font-medium w-[6rem] active:bg-gray-200 ${
          activeDateIsThisMonth ? "text-red-500 hover:text-red-500 " : "text-gray-700 hover:text-gray-800  "
        }`}
        onClick={() => {
          dispatch(setActiveDate(getLocalTime().toISOString()));
        }}
      >
        {enterMobileMode ? format(new Date(activeDate), "yyyy") : "Today"}
      </button>
      <button
        className="flex aspect-square items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200"
        onClick={() => handleCalendarSlide("next")}
      >
        <BiChevronRight size={24} />
      </button>
    </div>
  );
}

export default CalendarSlider;
