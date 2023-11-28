import { RootState } from "@/store";
import { camelToSentenceCase } from "@/utils/stringHelpers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { HiCheck } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import {
  updateEventCalendars,
  updateCalendarShowState,
} from "@/store/calendarState";

interface CheckboxSectionInterface {
  title: string;
  checkList: Record<string, boolean>;
  handleCheck: ({ checked, name }: { checked: boolean; name: string }) => void;
}

function CheckboxSection({
  title,
  checkList,
  handleCheck,
}: CheckboxSectionInterface) {
  return (
    <div className="">
      <p className="mb-[0.35rem] text-[0.8rem] font-semibold text-red-600">
        {title}
      </p>
      <div>
        {Object.keys(checkList).map((ckListKey, index) => (
          <label
            htmlFor={"preferance_" + ckListKey}
            key={ckListKey}
            className="rounded[0.2rem] flex h-[1.95rem] cursor-pointer items-center gap-3 px-2 hover:bg-gray-100"
          >
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                name={ckListKey}
                checked={checkList[ckListKey]}
                id={"preferance_" + ckListKey}
                onChange={(e) =>
                  handleCheck({
                    checked: e.target.checked,
                    name: e.target.name,
                  })
                }
                className="h-[1.1rem] w-[1.1rem] cursor-pointer appearance-none rounded-[0.15rem] border-[1.8px] border-red-400 outline-none checked:bg-red-400"
              />
              <IoMdCheckmark size={17} className="absolute text-gray-0 " />
            </div>
            <span className="text-[0.925rem] font-normal tracking-[0.03rem] text-gray-600 first-letter:capitalize">
              {camelToSentenceCase(ckListKey)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxSection;

export function PreferanceList() {
  const dispatch = useDispatch();
  const monthCellProps = useSelector(
    (state: RootState) => state.calendarState.show,
  );

  const handleCheck = ({
    checked,
    name,
  }: {
    checked: boolean;
    name: string;
  }) => {
    dispatch(
      updateCalendarShowState({
        cellProp: name,
        value: checked,
      }),
    );
  };

  return (
    <CheckboxSection
      title="SHOW"
      checkList={monthCellProps}
      handleCheck={handleCheck}
    />
  );
}

export function CalendarEventList() {
  const dispatch = useDispatch();
  const calendarEvents = useSelector(
    (state: RootState) => state.calendarState.show,
  );

  const handleCheck = ({
    checked,
    name,
  }: {
    checked: boolean;
    name: string;
  }) => {
    dispatch(
      updateEventCalendars({
        id: name,
        checked: checked,
      }),
    );
  };

  return (
    <CheckboxSection
      title="EVENT CALENDARS"
      checkList={calendarEvents}
      handleCheck={handleCheck}
    />
  );
}
