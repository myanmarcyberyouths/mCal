import React, { useEffect, useState } from "react";
import CommingSoonBanner from "../CommingSoonBanner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isToday,
  startOfWeek,
} from "date-fns";
import {
  ScrollArea,
  ScrollBar,
  ScrollViewport,
} from "@/components/ui/areas/ScrollArea";
import useScrollEvent from "@/hooks/useScrollEvent";
import { cn } from "@/lib/utils";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import WeekColumn from "./WeekColumn";
import WeekColumnHead from "./WeekColumnHead";

function WeekMode() {
  const dispatch = useDispatch();
  const calendarState = useSelector((state: RootState) => state.calendarState);
  const { activeDate } = calendarState;

  const activeDateObj = new Date(activeDate);

  const days = eachDayOfInterval({
    start: startOfWeek(activeDateObj),
    end: endOfWeek(activeDateObj),
  });

  // Scroll Events Handling
  const [scrollReachedTop, setScrollReachedTop] = useState(true);

  const scrollViewportRef = useScrollEvent(
    ({ offsetHeight, scrollHeight, scrollTop }) => {
      if (scrollTop < 7) {
        setScrollReachedTop(true);
      } else {
        setScrollReachedTop(false);
      }
    },
  );

  // console.log("WeekMode render");

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-7 h-[6.8rem]",
          !scrollReachedTop && "shadow",
        )}
      >
        {days.map((day) => (
          <WeekColumnHead
            key={day.toString()}
            day={day}
            scrollReachedTop={scrollReachedTop}
          />
        ))}
      </div>
      <ScrollArea className="h-[calc(100%-6.8rem)] w-full">
        <ScrollViewport className="w-full h-full" ref={scrollViewportRef}>
          <div className="grid grid-cols-7 ">
            {days.map((day) => {
              return (
                <WeekColumn
                  key={day.toString()}
                  day={day}
                  calendarState={calendarState}
                />
              );
            })}
          </div>
          <ScrollBar
            className="w-3"
            thumbClassName="bg-[#bbb] hover:bg-[#999]"
          />
        </ScrollViewport>
      </ScrollArea>
    </>
  );
}

export default WeekMode;
