import React, { useEffect } from "react";
import { add, eachDayOfInterval, eachWeekOfInterval, endOfMonth, format, getDay, isSameMonth, isToday, parse, startOfToday, startOfWeek } from "date-fns";
import { useDispatch } from "react-redux";
import { setActiveDate } from "@/store/calendarState";
import { getLocalTime } from "@/utils/helpers";

function useSetupCalendarState() {
  let today = getLocalTime(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveDate(today.toISOString()));
  }, [today]);
}

export default useSetupCalendarState;
