import { Switch } from "@/components/ui/buttons/SwitchButton";
import { CheckList, CheckListItem } from "@/components/ui/lists/CheckList";
import { RootState } from "@/store";
import { updateCalendarShowState } from "@/store/calendarState";
import { LOCAL_STORAGE_KEYS } from "@/type-models/utils.type";
import { setLocalStorage } from "@/utils/helpers";
import { camelToSentenceCase } from "@/utils/stringHelpers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CalendarPreferanceList() {
  const dispatch = useDispatch();
  const calendarPreferance = useSelector(
    (state: RootState) => state.calendarState.show,
  );

  const handleCheck = (checked, name) => {
    dispatch(
      updateCalendarShowState({
        cellProp: name,
        value: checked,
      }),
    );

    setLocalStorage(LOCAL_STORAGE_KEYS.calendarShow, {
      ...calendarPreferance,
      [name]: checked,
    });
  };

  return (
    <CheckList title="SHOW">
      {Object.keys(calendarPreferance).map((propKey) => (
        <li key={propKey}>
          <label
            htmlFor={"show_" + propKey}
            className="flex h-[2.5rem] cursor-pointer items-center justify-between rounded-[0.25rem] px-2 pl-3 hover:bg-gray-100 sm2:h-[2rem]"
          >
            <span className="whitespace-nowrap text-[1.1rem] font-normal text-gray-700 first-letter:capitalize sm2:text-[0.875rem]">
              {camelToSentenceCase(propKey)}
            </span>
            <Switch
              id={"show_" + propKey}
              checked={calendarPreferance[propKey]}
              onCheckedChange={(checked) => handleCheck(checked, propKey)}
            />
          </label>
        </li>
      ))}
    </CheckList>
  );
}

export default CalendarPreferanceList;
