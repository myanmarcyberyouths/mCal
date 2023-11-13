import React, { useEffect, useState } from "react";
import { eachMonthOfInterval, endOfYear, startOfYear } from "date-fns";
import YearCell from "./YearCell";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function YearMode() {
  const { activeDate } = useSelector((state: RootState) => state.calendarState);
  let activeDateObj = new Date(activeDate);

  const months = eachMonthOfInterval({
    start: startOfYear(activeDateObj),
    end: endOfYear(activeDateObj),
  });

  return (
    <div className="min-h-full w-full grid lg1:grid-cols-4 md1:grid-cols-3 sm1:grid-cols-2 grid-flow-row-dense gap-2  pb-4">
      {months.map((month) => {
        return <YearCell key={month.toString()} month={month} />;
      })}
    </div>
  );
}

export default YearMode;
