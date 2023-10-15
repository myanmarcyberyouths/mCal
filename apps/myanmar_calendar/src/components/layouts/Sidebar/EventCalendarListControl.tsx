import { CheckList, CheckListItem } from "@/components/ui/lists/CheckList";
import { RootState } from "@/store";
import { updateEventCalendars } from "@/store/calendarState";
import { EVENT_CALENDARS } from "@/utils/constants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function EventCalendarListControl() {
  const dispatch = useDispatch();
  const eventCalendars = useSelector((state: RootState) => state.calendarState.eventCalendars);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    dispatch(
      updateEventCalendars({
        event: event.target.name,
        value: event.target.checked,
      })
    );
  };

  return (
    <CheckList title="EVENT CALENDARS">
      {Object.keys(eventCalendars).map((propKey) => (
        <CheckListItem
          key={propKey}
          name={propKey}
          id={"show_" + propKey}
          checked={eventCalendars[propKey]}
          onChange={handleCheck}
          tagColor={EVENT_CALENDARS[propKey].tagColor}
        />
      ))}
    </CheckList>
  );
}

export default EventCalendarListControl;
