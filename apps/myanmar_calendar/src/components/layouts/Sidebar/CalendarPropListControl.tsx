import { CheckList, CheckListItem } from "@/components/ui/lists/CheckList";
import { RootState } from "@/store";
import { updateMonthCellPropsState } from "@/store/calendarState";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CalendarPropListControl() {
  const dispatch = useDispatch();
  const monthCellProps = useSelector((state: RootState) => state.calendarState.monthCellProps);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateMonthCellPropsState({
        cellProp: event.target.name,
        value: event.target.checked,
      })
    );
  };

  return (
    <CheckList title="SHOW">
      {Object.keys(monthCellProps).map((propKey) => (
        <CheckListItem
          key={propKey}
          name={propKey}
          id={"show_" + propKey}
          checked={monthCellProps[propKey]}
          onChange={handleCheck}
        />
      ))}
    </CheckList>
  );
}

export default CalendarPropListControl;
