import useKeyPress from "@/hooks/useKeyPress";
import { RootState } from "@/store";
import { setActiveDate, updateActiveDate } from "@/store/calendarState";
import { CALENDAR_MODE_ENUM } from "@/type-models/calendarState.type";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

function CalendarSlider() {
  const dispatch = useDispatch();
  const calendarMode = useSelector((state: RootState) => state.calendarState.calendarMode);

  const slideCalendar = (direction: "next" | "prev") => {
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

  useKeyPress("ArrowLeft", () => slideCalendar("prev"));
  useKeyPress("ArrowRight", () => slideCalendar("next"));

  return (
    <div className="h-[2.5rem] flex-shrink-0 flex items-stretch overflow-hidden rounded-md border border-gray-300">
      <button
        className="flex justify-center items-center aspect-square hover:bg-gray-100 active:bg-gray-200 text-gray-600 "
        onClick={() => slideCalendar("prev")}>
        <BiChevronLeft size={24} />
      </button>
      <button
        className="flex items-center justify-center border-r border-l border-gray-300 font-semibold w-[6rem] text-gray-700 hover:bg-gray-100  hover:text-gray-800 active:bg-gray-200"
        onClick={() => {
          dispatch(setActiveDate(new Date()));
        }}>
        {/* ယနေ့ */}
        Today
      </button>
      <button
        className="flex justify-center items-center aspect-square hover:bg-gray-100 active:bg-gray-200 text-gray-600"
        onClick={() => slideCalendar("next")}>
        <BiChevronRight size={24} />
      </button>
    </div>
  );
}

export default CalendarSlider;
