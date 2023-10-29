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
  const calendarPreferance = useSelector((state: RootState) => state.calendarState.show);

  const handleCheck = (checked, name) => {
    dispatch(
      updateCalendarShowState({
        cellProp: name,
        value: checked,
      })
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
            className="flex justify-between items-center h-[2.5rem] sm2:h-[2rem] rounded-[0.25rem] cursor-pointer hover:bg-gray-100 px-2 pl-3">
            <span className="text-[1.1rem] sm2:text-[0.9rem] first-letter:capitalize  font-normal text-gray-700 whitespace-nowrap">{camelToSentenceCase(propKey)}</span>
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
