import { CheckList, CheckListAddButton, CheckListItem } from "@/components/ui/lists/CheckList";
import { RootState } from "@/store";
import { updateUserCalendars } from "@/store/calendarState";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

function UserCalendarList() {
  const dispatch = useDispatch();
  const userCalendars = useSelector((state: RootState) => state.calendarState.userCalendars);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>, keyName: string) => {
    dispatch(
      updateUserCalendars({
        id: keyName,
        checked: event.target.checked,
      })
    );
  };

  return (
    <CheckList title="MY CALENDARS">
      {Object.keys(userCalendars).map((propKey) => (
        <CheckListItem
          key={propKey}
          name={userCalendars[propKey].name}
          id={"show_" + propKey}
          checked={userCalendars[propKey].checked}
          onChange={(e) => handleCheck(e, propKey)}
          tagColor={userCalendars[propKey].tagColor}
        />
      ))}
      <div className="mt-1">
        <CheckListAddButton className="">
          <HiOutlinePlusSmall size={18} />
          Add
        </CheckListAddButton>
      </div>
    </CheckList>
  );
}

export default UserCalendarList;
