import React, { useEffect } from "react";
import { add, eachDayOfInterval, eachWeekOfInterval, endOfMonth, format, getDay, isSameMonth, isToday, parse, startOfToday, startOfWeek } from "date-fns";
import { useDispatch } from "react-redux";
import { setActiveDate } from "@/store/calendarState";

function useSetupCalendarState() {
  let todayStart = startOfToday();
  let today = new Date();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveDate(today));
  }, [today]);
}

export default useSetupCalendarState;
