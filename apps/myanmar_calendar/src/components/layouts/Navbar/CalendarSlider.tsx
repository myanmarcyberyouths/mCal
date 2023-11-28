import useKeyPress from "@/hooks/useKeyPress";
import { RootState } from "@/store";
import { setActiveDate, updateActiveDate } from "@/store/calendarState";
import { CALENDAR_MODES } from "@/utils/constants";
import { getLocalTime } from "@/utils/helpers";
import { format, isThisMonth } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

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

    dispatch(
      updateActiveDate({
        [CALENDAR_MODES[calendarMode] + "s"]: slideValue,
      }),
    );
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
    <div className="flex  flex-shrink-0 items-stretch overflow-hidden rounded-md border border-gray-200">
      <button
        className="flex items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-50 active:bg-gray-200"
        onClick={() => handleCalendarSlide("prev")}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        className={`flex items-center justify-center border-gray-250 px-2  py-1.5 font-medium hover:bg-gray-50 active:bg-gray-50 ${
          activeDateIsThisMonth
            ? "text-red-500 hover:text-red-500 "
            : "text-gray-700 hover:text-gray-800  "
        }`}
        onClick={() => {
          dispatch(setActiveDate(getLocalTime().toISOString()));
        }}
      >
        {enterMobileMode ? format(new Date(activeDate), "yyyy") : "Today"}
      </button>
      <button
        className="flex aspect-square  items-center justify-center px-2 py-1.5 text-gray-600 hover:bg-gray-50 active:bg-gray-100"
        onClick={() => handleCalendarSlide("next")}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default CalendarSlider;
