import useKeyPress from "@/hooks/useKeyPress";
import { RootState } from "@/store";
import { setActiveDate, updateActiveDate } from "@/store/calendarState";
import { CALENDAR_MODE_ENUM } from "@/type-models/calendarState.type";
import { getLocalTime } from "@/utils/helpers";
import { format, isSameDay, isThisMonth, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

function CalendarSlider() {
  const dispatch = useDispatch();
  const calendarMode = useSelector((state: RootState) => state.calendarState.calendarMode);
  const activeDate = useSelector((state: RootState) => state.calendarState.activeDate);
  const enterMobileMode = useSelector((state: RootState) => state.systemState.enterMobileMode);

  const [activeDateIsThisMonth, setActiveDateIsThisMonth] = useState(false);

  const handleCalendarSlide = (direction: "next" | "prev") => {
    const slideValue = direction === "next" ? 1 : -1;

    if (calendarMode === CALENDAR_MODE_ENUM.WEEK) {
      dispatch(updateActiveDate({ weeks: slideValue }));
    }
    if (calendarMode === CALENDAR_MODE_ENUM.MONTH) {
      dispatch(updateActiveDate({ months: slideValue }));
    }
    if (calendarMode === CALENDAR_MODE_ENUM.YEAR) {
      dispatch(updateActiveDate({ years: slideValue }));
    }
  };

  useEffect(() => {
    setActiveDateIsThisMonth(isThisMonth(new Date(activeDate)));
  }, [activeDate]);

  const dayDialogTargetDay = useSelector((state: RootState) => state.modelControlState.dayDialogTargetDay);

  useKeyPress("ArrowLeft", () => handleCalendarSlide("prev"), !!dayDialogTargetDay);
  useKeyPress("ArrowRight", () => handleCalendarSlide("next"), !!dayDialogTargetDay);

  return (
    <div className="h-[2.5rem] flex-shrink-0 flex items-stretch overflow-hidden rounded-md border border-cgray-300">
      <button
        className="flex justify-center items-center aspect-square hover:bg-cgray-100 active:bg-cgray-200 text-cgray-600 "
        onClick={() => handleCalendarSlide("prev")}>
        <BiChevronLeft size={24} />
      </button>
      <button
        className={`flex items-center justify-center border-r border-l border-cgray-300 hover:bg-cgray-100 text-[0.95rem]  font-medium w-[6rem] active:bg-cgray-200 ${
          activeDateIsThisMonth ? "text-red-500 hover:text-red-500 " : "text-cgray-700 hover:text-cgray-800  "
        }`}
        onClick={() => {
          dispatch(setActiveDate(getLocalTime().toISOString()));
        }}>
        {enterMobileMode ? format(new Date(activeDate), "yyyy") : "Today"}
      </button>
      <button
        className="flex justify-center items-center aspect-square hover:bg-cgray-100 active:bg-cgray-200 text-cgray-600"
        onClick={() => handleCalendarSlide("next")}>
        <BiChevronRight size={24} />
      </button>
    </div>
  );
}

export default CalendarSlider;
