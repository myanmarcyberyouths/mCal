import { RootState } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import WeekMode from "./WeekMode/WeekMode";
import MonthMode from "./MonthMode/MonthMode";
import YearMode from "./YearMode/YearMode";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import useScrollEvent from "@/hooks/useScrollEvent";

const calendar_modes = {
  week: <WeekMode />,
  month: <MonthMode />,
  year: <YearMode />,
};

function Calendar() {
  const calendarMode = useSelector(
    (state: RootState) => state.calendarState.calendarMode,
  );

  // const [showOverflowInset, setShowOverflowInset] = useState(false)

  // const calendarRef = useScrollEvent({
  //   customCallback: ({offsetHeight,scrollHeight,scrollTop}) => {
  //     if(offsetHeight === scrollHeight) return

  //     setShowOverflowInset(true)
      
  //     if((scrollHeight - offsetHeight) === scrollTop) {
  //       setShowOverflowInset(false)
  //     }
  //   }
  // })


  return (
    <section
      aria-label="Calendar"
      className={cn(
        "flex-1 h-[calc(100vh-theme(spacing.nav-h))] supports-[height:100cqh]:h-[calc(100cqh-theme(spacing.nav-h))] supports-[height:100svh]:h-[calc(100svh-theme(spacing.nav-h))] xl:border-l  xl:border-gray-200 __scrollbar-md",
      )}
    >
      {calendar_modes[calendarMode]}
    </section>
  );
}

export default Calendar;
