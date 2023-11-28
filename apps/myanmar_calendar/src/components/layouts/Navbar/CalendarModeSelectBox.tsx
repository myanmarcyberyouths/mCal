import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectBoxes/Select";
import { RootState } from "@/store";
import { setCalendarMode } from "@/store/calendarState";
import { CALENDAR_MODE } from "@/type-models/calendarState.type";
import { MIN_WIDTHS } from "@/utils/constants";
import React, { useCallback, useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function CalendarModeSelectBox() {
  const dispatch = useDispatch();
  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  const calendarMode = useSelector(
    (state: RootState) => state.calendarState.calendarMode,
  );

  const selectHandler = useCallback(
    (value: CALENDAR_MODE) => {
      dispatch(setCalendarMode(value));
    },
    [dispatch],
  );

  useEffect(() => {
    if (enterMobileMode) selectHandler(CALENDAR_MODE.YEAR);
  }, [enterMobileMode, selectHandler]);

  if (enterMobileMode) return <></>;
  return (
    <Select value={calendarMode} onValueChange={selectHandler}>
      <SelectTrigger className="h-input-md w-fit rounded-md px-4">
        <span className="-ml-[0.35rem] -mr-[0.6rem] flex items-center gap-3">
          <FaCalendarAlt className="text-gray-400" />
          <span className="text-[0.95rem] font-medium capitalize  text-gray-600">
            {calendarMode}
          </span>
          <BiCaretDown className="text-gray-500" />
        </span>
      </SelectTrigger>
      <SelectContent
        className="w-[14rem] rounded-sm px-0 py-[0.25rem]"
        align="end"
      >
        {Object.values(CALENDAR_MODE).map((mode) => (
          <SelectItem
            value={mode}
            key={mode}
            className="h-[2.5rem] rounded-none px-3 hover:bg-gray-50 data-[state=checked]:bg-gray-200/50"
          >
            <span className="flex w-[12rem] items-center justify-between">
              <span className="capitalize">{mode}</span>
              <span className="ml-auto text-[0.8rem] capitalize text-gray-500/90">
                {mode.substring(0, 1)}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CalendarModeSelectBox;
