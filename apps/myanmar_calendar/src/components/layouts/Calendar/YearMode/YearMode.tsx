import React, { useEffect, useState } from "react";
import { eachMonthOfInterval, endOfYear, startOfYear } from "date-fns";
import YearCell from "./YearCell";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function YearMode() {
  const { activeDate, weekStart } = useSelector(
    (state: RootState) => state.calendarState,
  );
  let activeDateObj = new Date(activeDate);

  const months = eachMonthOfInterval({
    start: startOfYear(activeDateObj),
    end: endOfYear(activeDateObj),
  });

  return (
    <div className="grid min-h-full w-full grid-flow-row-dense gap-2 pb-4 sm1:grid-cols-2 md1:grid-cols-3  lg1:grid-cols-4">
      {months.map((month) => {
        return (
          <YearCell
            key={month.toString()}
            month={month}
            weekStart={weekStart}
          />
        );
      })}
    </div>
  );
}

export default YearMode;
