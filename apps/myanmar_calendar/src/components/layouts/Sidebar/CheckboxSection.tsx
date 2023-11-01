import { RootState } from "@/store";
import { camelToSentenceCase } from "@/utils/stringHelpers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { HiCheck } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { updateEventCalendars, updateCalendarShowState } from "@/store/calendarState";

interface CheckboxSectionInterface {
  title: string;
  checkList: Record<string, boolean>;
  handleCheck: ({ checked, name }: { checked: boolean; name: string }) => void;
}

function CheckboxSection({ title, checkList, handleCheck }: CheckboxSectionInterface) {
  return (
    <div className="">
      <p className="text-[0.8rem] font-semibold text-cgray-600 mb-[0.35rem]">{title}</p>
      <div>
        {Object.keys(checkList).map((ckListKey, index) => (
          <label
            htmlFor={"preferance_" + ckListKey}
            key={ckListKey}
            className="flex items-center gap-3 h-[1.95rem] rounded[0.2rem] cursor-pointer hover:bg-cgray-100 px-2">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                name={ckListKey}
                checked={checkList[ckListKey]}
                id={"preferance_" + ckListKey}
                onChange={(e) => handleCheck({ checked: e.target.checked, name: e.target.name })}
                className="w-[1.1rem] h-[1.1rem] appearance-none checked:bg-red-400 border-[1.8px] border-red-400 rounded-[0.15rem] cursor-pointer outline-none"
              />
              <IoMdCheckmark
                size={17}
                className="absolute text-cgray-0 "
              />
            </div>
            <span className="text-[0.925rem] first-letter:capitalize tracking-[0.03rem] font-normal text-cgray-600">{camelToSentenceCase(ckListKey)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxSection;

export function PreferanceList() {
  const dispatch = useDispatch();
  const monthCellProps = useSelector((state: RootState) => state.calendarState.show);

  const handleCheck = ({ checked, name }: { checked: boolean; name: string }) => {
    dispatch(
      updateCalendarShowState({
        cellProp: name,
        value: checked,
      })
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
  const calendarEvents = useSelector((state: RootState) => state.calendarState.show);

  const handleCheck = ({ checked, name }: { checked: boolean; name: string }) => {
    dispatch(
      updateEventCalendars({
        event: name,
        value: checked,
      })
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
