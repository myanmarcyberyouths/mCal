import { CheckList, CheckListItem } from "@/components/ui/lists/CheckList";
import { RootState } from "@/store";
import { updateEventCalendars } from "@/store/calendarState";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function EventCalendarList() {
  const dispatch = useDispatch();
  const eventCalendars = useSelector((state: RootState) => state.calendarState.eventCalendars);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>, keyName: string) => {
    dispatch(
      updateEventCalendars({
        event: keyName,
        value: event.target.checked,
      })
    );
  };

  return (
    <CheckList title="EVENT CALENDARS">
      {Object.keys(eventCalendars).map((propKey) => (
        <CheckListItem
          key={propKey}
          name={eventCalendars[propKey].name}
          id={"show_" + propKey}
          checked={eventCalendars[propKey].checked}
          onChange={(e) => handleCheck(e, propKey)}
          tagColor={eventCalendars[propKey].tagColor}
        />
      ))}
    </CheckList>
  );
}

export default EventCalendarList;
