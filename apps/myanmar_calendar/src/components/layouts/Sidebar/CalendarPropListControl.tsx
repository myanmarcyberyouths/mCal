import { CheckList, CheckListItem } from "@/components/ui/lists/CheckList";
import { RootState } from "@/store";
import { updateCalendarPreferanceState } from "@/store/calendarState";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CalendarPropListControl() {
  const dispatch = useDispatch();
  const calendarPreferance = useSelector((state: RootState) => state.calendarState.preferance);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateCalendarPreferanceState({
        cellProp: event.target.name,
        value: event.target.checked,
      })
    );
  };

  return (
    <CheckList title="SHOW">
      {Object.keys(calendarPreferance).map((propKey) => (
        <CheckListItem
          key={propKey}
          name={propKey}
          id={"show_" + propKey}
          checked={calendarPreferance[propKey]}
          onChange={handleCheck}
        />
      ))}
    </CheckList>
  );
}

export default CalendarPropListControl;
